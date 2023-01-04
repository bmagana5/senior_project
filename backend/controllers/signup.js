const bcrypt = require('bcrypt');
const validator = require('express-validator');

module.exports = (promisePool) => {
    const signupRouter = require('express').Router();

    signupRouter.post('/', 
        validator.body('username', 'Username must be at least 4 characters long, contain letters, numbers, and a maximum of one underscore between them. It must start with a letter.').isLength({ min: 4 }).trim()
            .custom((value) => {
                if (!(/^[a-zA-Z]+(_[a-zA-Z0-9]+)*[a-zA-Z0-9]*$/.test(value))) {
                    throw new Error('Username must be at least 4 characters long, contain letters, numbers, and a maximum of one underscore between them. It must start with a letter.');
                }
                return true;
            }).escape(),
        validator.body('email', 'Invalid email').trim().isEmail().normalizeEmail(),
        validator.body('name').isLength({ min: 1 }).trim()
            .custom((value) => {
                if (!(/^[a-zA-Z]+(( [a-zA-Z]+)|(. [a-zA-Z]+)|(.))*$/.test(value))) {
                    throw new Error('Name must adhere to the following convention: "J", "J.", "J D", "J Doe", "J. Doe", "John Doe"');
                }
                return true;
            }).escape(),
        validator.body('password', 'Password must be at least 6 characters long.').isLength({ min: 6 }).escape(),
        validator.body('confirmPassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match');
                }
                return true
            }).escape(),
        async (request, response, next) => {
            try {
                // check for request for validation errors
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
                const { username, name, email, password } = request.body;

                const [results, fields] = await promisePool.execute("select * from `user` where `username` = ?", [username]);
                const existingUser = results[0];

                if (existingUser) {
                    return response.status(400).json({
                        error: 'Username is already in use'
                    })
                }

                const saltRounds = 10;
                const passwordHash = await bcrypt.hash(password, saltRounds);

                // insert into 'password' table, get primary key, insert data into 'user' table
                const [passwordResults, passwordFields] = await promisePool.execute("insert into `password` (`pwd_hash`) values (?)", [passwordHash]);
                const passwordEntryId = passwordResults.insertId;
                

                const [userResults, userFields] = await promisePool.execute('insert into `user` (`username`, `full_name`, `user_passwd_id`, `email_address`, `date_joined`, `pfp_id`, `profile_bio`) values (?, ?, ?, ?, ?, ?, ?)', [username, name, passwordEntryId, email, new Date(), null, '']);

                const user = {
                    username, name, email, password
                }

                return response.status(201).send(user);

            } catch (error) {
                next(error);
            }
        });

    return signupRouter;
};