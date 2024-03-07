const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Projects = require('../models/projects');
const jwt = require('jsonwebtoken');
const home = async (req, res) => {
  try {
    res.status(200).send('Hello World!..5678 using controllers');
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const data = req.body;
    const { firstname, lastname, college,email, password } = data;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json('Email already exists');
    }

    const userCreated = await User.create({
      firstname,
      lastname,
      college,
      email,
      password,
    });

    res.status(200).json({
      data: userCreated,
      msg: 'Registration successful',
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (isPasswordValid) {
      res.status(200).json({
        message: 'Login Successful',
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
     
    } else {
     
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createprojects = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - User not logged in' });
    }

    const secret_key = process.env.JWT_SECRET_KEY;
      const decoded = jwt.verify(token, secret_key);
      const userId = decoded.userId;
      const userExist = await User.findById(userId);

      if (!userExist) {
        return res.status(404).json({ message: 'User not found' });
      }

      const data = req.body;
      const { projectname, skills, details,media, links } = data;

      const projectsaved = await Projects.create({
        projectname,
        skills,
        details,
        media,
        links,
        user: userId,
      });

      res.status(200).json({
        data: projectsaved.projectname,
        msg: 'Your project has been saved',
      });
    } catch (jwtError) {
      console.error('JWT Verification Error:', jwtError);
      res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
  };


  const viewprojects = async (req, res) => {
    try {
      const data = await Projects.find({email : req.body.email});
  
      if (data.length === 0) {
        return res.status(404).json({ message: 'No projects found' });
      }
  
      res.json(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = { home, register, login,createprojects,viewprojects };