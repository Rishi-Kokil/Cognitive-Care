import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const authenticateJWT = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                // Handle errors, both synchronous and asynchronous
                if (err.name === 'JsonWebTokenError') {
                    reject(new Error('Invalid token')); // Token is invalid
                } else if (err.name === 'TokenExpiredError') {
                    reject(new Error('Token expired')); // Token has expired
                } else {
                    reject(err); // Other errors
                }
            } else {
                resolve(decoded); // Token is valid, resolve with decoded payload
            }
        });
    });
};

const generateToken = (payload, key) => {
    return new Promise((resolve, reject) => {
        try {
            if (!payload || typeof payload !== 'object') {
                throw new Error('Invalid payload');
            }

            if (!key || typeof key !== 'string') {
                throw new Error('Invalid key');
            }

            const token = jwt.sign(payload, key);
            resolve(token);
        } catch (error) {
            console.log('Token generation failed:', error.message);
            reject(error);
        }
    });
};

const hashPassword = (plaintext) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.error('Error while generating salt:', err);
                reject('Error while generating salt');
            } else {
                bcrypt.hash(plaintext, salt, (err, hashedPassword) => {
                    if (err) {
                        console.error('Error while hashing password:', err);
                        reject('Error while hashing password');
                    } else {
                        resolve(hashedPassword);
                    }
                });
            }
        });
    });
};

const comparePassword = (inputText, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(inputText, hash, (err, result) => {
            if (err) {
                console.error('Error while comparing passwords:', err);
                reject('Error while comparing passwords');
            } else {
                resolve(result);
            }
        });
    });
};


export {hashPassword, comparePassword, generateToken, authenticateJWT};