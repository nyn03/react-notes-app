const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fetchuser = require('../middlewares/fetchuser')

const JWT_SECRET = 'SECRET_KEY_JWT';

// Create a user: POST "/api/auth/createuser" Doesn't require auth
router.post('/createuser',
    [
        body('email', 'Enter a valid email').isEmail(),
        body('name', 'Enter name more than 3 characters').isLength({ min: 3 }),
        body('password', 'Enter password more than 5 characters').isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {

            const existingUser = await User.findOne({ email: req.body.email });

            if (existingUser) {
                return res.status(400).json({ success: false, error: 'User with this email already exists' })
            }

            // encrypt password
            const salt = await bcrypt.genSaltSync(10);
            securedPassword = await bcrypt.hash(req.body.password, salt)


            let user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securedPassword,
            })

            res.json({ success: true, message: 'User created successfully.', name: user.name });
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Something went wrong!')
        }
    })

// Create a user: POST "/api/auth/login" Doesn't require auth
router.post('/login',
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password cannot be empty').exists()
    ],
    async (req, res) => {

        // Returns error when wrong input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {

            let user = await User.findOne({ email })

            if (!user) {
                return res.status(401).json({ success: false, error: "Please try to login with correct credentials." })
            }

            const passwordCompare = await bcrypt.compare(password, user.password);

            if (!passwordCompare) {
                return res.status(401).json({ success: false, error: "Please try to login with correct credentials." })
            }

            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ success: true, message: 'Login successful', authToken: authToken });


        } catch (error) {
            console.log(error.message);
            res.status(500).send('Something went wrong!')
        }
    }
)


// Get user details: GET "/api/auth/user-details" require auth
router.get('/user-details',
    fetchuser,
    async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);
        } catch (error) {
            console.log(err.message);
            res.status(401).send('Invalid user details!')
        }
    }
)



module.exports = router