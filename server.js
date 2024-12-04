const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const User = require('./models/User'); // User model
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jewelryDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true
}));

// Sign In
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.userId = user._id;
        res.send("Logged in successfully");
    } else {
        res.send("Invalid credentials");
    }
});

// Checkout
app.post('/checkout', (req, res) => {
    if (req.session.userId) {
        // Proceed with checkout
        res.send("Order placed successfully");
    } else {
        res.send("Please log in first");
    }
});

// Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});