import { body } from "express-validator";

export const registerValidation = [
    body('username')
        .notEmpty()
        .withMessage('Username is requierd.')
        .trim()
        .escape()   // Sanitizing input by removing HTML attributes
        .matches(/^[a-zA-Z ]{2,30}$/)
        .withMessage('Username can only contains alphabets upto 30 characters'),

    body('email')    
        .notEmpty()
        .withMessage('Email is required')
        .trim()
        .normalizeEmail() // Sanitizing email by changing it into standarized format 
        .isEmail()
        .withMessage('Email is not valid.'),
    
    body('password')    
        .notEmpty()
        .withMessage('Password is required.')
        .isStrongPassword()
        .withMessage('Password should be atleast 8 characters long and should contain atleast 1 uppercase, lowercase, number and special symbol.')
];

export const loginValidation = [
    body('email')    
        .notEmpty()
        .withMessage('Email is required')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Email is not valid.'),
    
    body('password')    
        .notEmpty()
        .withMessage('Password is required.')
];