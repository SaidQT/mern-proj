const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Custom email validation function
function validateEmail(email) {
  // Define a regex pattern for email validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
}

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters long'] 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    validate: {
      validator: validateEmail, 
      message: 'Please enter a valid email address'
    }
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'] 
  },
  role: { 
    type: String, 
    default: 'user' 
  }
}, { timestamps: true }); 

// Password hashing middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
