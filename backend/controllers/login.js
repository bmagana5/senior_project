const config = require('../utils/config');
const bcrypt = require('bcrypt');
const validator = require('express-validator');
const jsonwebtoken = require('jsonwebtoken');

// exports function that returns a Router object
module.exports = (promisePool) => {
    const loginRouter = require('express').Router();

    // loginRouter.post();

    // logging in with username...
    loginRouter.post('/username', 
        validator.body('username').isLength({ min: 4 }).trim()
            .custom((value) => {
                if (!(/^[a-zA-Z]+(_[a-zA-Z0-9]+)*[a-zA-Z0-9]*$/.test(value))) {
                    throw new Error('Username must be at least 4 characters long, contain letters, numbers, and underscores between them only. It must start with a letter.');
                }
                return true;
            }).escape(),
        validator.body('password', 'Password must be at least 6 characters long.').isLength({ min: 6 }).escape(),
        async (request, response, next) => {
            try {
                // check request for validation errors
                const validationErrors = validator.validationResult(request);
                if (!validationErrors.isEmpty()) {
                    let msg = '';
                    for (let error of validationErrors.array()) {
                        msg = msg.concat(`${error.msg} `);
                    }
                    msg = msg.trim();
                    return response.status(400).json({
                        error: msg
                    });
                }
                
                const { username, password } = request.body;

                const [rows, fields] = await promisePool.execute("call getUserPasswordInfo(?)", [username]);

                // first item in rows has list of rows retrieved; then, grab the first item of that list of rows
                const user = rows[0][0];

                const passwordCorrect = !user ? false : await bcrypt.compare(password, user.pwd_hash);
                if (!(user && passwordCorrect)) {
                    return response.status(400).json({
                        error: 'Wrong username or password'
                    });
                }

                const userObj = {
                    username: user.username,
                    id: user.user_id
                }

                const token = jsonwebtoken.sign(userObj, config.SECRET, { expiresIn: 60*60 });

                const userData = {
                    token,
                    username: user.username,
                    email: user.email_address
                }

                return response.status(200).send(userData);
            } catch (error) {
                next(error);
            }
        });

    // logging in with email address...
    loginRouter.post('/email', 
        validator.body('email', 'Invalid email address').isEmail().normalizeEmail(),
        // validator.body('email_address', 'Invalid email').trim().isEmail().normalizeEmail(),
        validator.body('password', 'Password must be at least 6 characters long.').isLength({ min: 6 }).escape(),
        async (request, response, next) => {
            try {
                // check for request for validation errors
                const validationErrors = validator.validationResult(request);
                if (!validationErrors.isEmpty()) {
                    let msg = '';
                    for (let error of validationErrors.array()) {
                        msg = msg.concat(`${error.msg} `);
                    }
                    msg.trim();
                    return response.status(400).json({
                        error: msg
                    });
                }
                
                const { email, password } = request.body;

                const [rows, fields] = await promisePool.execute("call getUserPasswordInfo(?)", [email]);

                // first item in rows has list of rows retrieved; then, grab the first item of that list of rows
                const user = rows[0][0];

                const passwordCorrect = !user ? false : await bcrypt.compare(password, user.pwd_hash);
                if (!(user && passwordCorrect)) {
                    return response.status(400).json({
                        error: 'Wrong username or password'
                    });
                }

                const userObj = {
                    username: user.username,
                    id: user.user_id
                }

                const token = jsonwebtoken.sign(userObj, config.SECRET, { expiresIn: 60*60 });
                console.log('token contains: ', token);
                const userData = {
                    token,
                    username: user.username,
                    email: user.email_address
                }

                return response.status(200).send(userData);
            } catch (error) {
                next(error);
            }
        });
    return loginRouter;
};