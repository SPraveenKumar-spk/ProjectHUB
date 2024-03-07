const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectname: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    media :{
      type : Buffer
    },
    links: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  });

  
const projects = new mongoose.model('Projects',projectSchema);

module.exports = projects;