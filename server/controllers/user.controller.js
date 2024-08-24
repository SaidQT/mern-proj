
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
 
module.exports.findAllUsers = (req, res) => {
    User.find()
        .then((allDaUsers) => {
            res.json({ users: allDaUsers })
        })
        .catch((err) => {
            res.json(err)
        });
}
 
module.exports.findOneSingleUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(oneSingleUser => {
            res.json({ user: oneSingleUser })
        })
        .catch((err) => {
            res.json(err)
        });}
 
module.exports.createNewUser = (req, res) => {
    User.create(req.body)
        .then(newlyCreatedUser => {
            res.json({ user: newlyCreatedUser })
        })
        .catch(err => res.status(400).json(err));}
 
module.exports.updateExistingUser = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedUser => {
            res.json({ user: updatedUser })
        })
        .catch(err => res.status(400).json(err));}
 
module.exports.deleteAnExistingUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json(err)
        });}



        module.exports.login = async (req, res) => {
            try {
                const { email, password } = req.body;
        
                // Find the user by email
                const user = await User.findOne({ email });
                if (!user) {
                    return res.status(400).json({ message: 'Invalid email or password' });
                }
        
                // Check if the password is correct
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(400).json({ message: 'Invalid email or password' });
                }
        
                // Generate a JWT token
                const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret_key', { expiresIn: '10h' });
        console.log("khalid" ,user.role)
                // Send back the token and role in the response
                res.json({
                    message: 'Login successful',
                    token: token,
                    role: user.role
                });
            } catch (error) {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        };