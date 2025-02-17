const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layouts/admin.ejs';

const jwtSecret = process.env.JWT_SECRET;

// ADMIN LOGIN PAGE
// GET
router.get('/admin', async (req, res) => {

    try {
        const data = await Post.find();
        res.render('admin/index', { title: 'Admin', layout: adminLayout });
    } catch(error) {
        console.log(error);
    }

})

// ADMIN LOGIN PAGE
// Post
router.post('/admin', async (req, res) => {

    try {

        const { username, password } = req.body;
       
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        const token = jwt.sign({ userID: user._id, jwtSecret });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');

    } catch(error) {
        console.log(error);
    }

})

// ADMIN DASHBOARD PAGE
// GET
router.get('/dashboard', async (req, res) => {

    try {
        res.render('admin/dashboard', { title: 'Dashboard' });
    } catch(error) {
        console.log(error);
    }

})

// ADMIN REGISTER PAGE
// Post
router.post('/register', async (req, res) => {

    try {
        const { username, password } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({ username, password:hashedPassword });
            res.status(201).json({ message: 'User created', user });
        } catch (error) {
            if (error.code === 11000) {
                res.status(409).json({ message: 'User already in use: ' + username });
            }
            res.status(500).json({ message: 'Internal server error' });
        }

    } catch(error) {
        console.log(error);
    }

})


module.exports = router;