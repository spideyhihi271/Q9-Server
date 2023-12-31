const { User, validate } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);
const tranform = require('../../utils/tranformMongoes');

class AuthController {
    async signUp(req, res) {
        // Validator
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        // Check email
        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(403).send({ message: 'Your email was exists' });

        // Create new user
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = await new User({
            ...req.body,
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
            password: hashPassword,
        }).save();

        return res.status(200).send({ data: 'Your account was created!' });
    }
    async signIn(req, res) {
        let user = await User.findOne({ email: req.body.email });

        // Check have account
        if (!user)
            return res.status(400).send({
                message: 'Wrong email or password, please check again',
            });

        const isValidPassword = await bcrypt.compare(
            req.body.password,
            user.password,
        );

        // Check pass
        if (!isValidPassword)
            return res.status(400).send({
                message: 'Wrong email or password, please check again',
            });

        // Successful
        const token = user.generateAuthToken();

        // Return data
        user = tranform.forObject(user);
        user = {
            ...user,
            password: undefined,
            token: token,
        };

        return res.status(200).send({
            data: user,
            message: 'Sign in successful',
        });
    }
}

module.exports = new AuthController();
