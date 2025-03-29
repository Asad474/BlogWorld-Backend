import { body, query } from "express-validator";

export const getDetailsValidation = [
    query('_id')
        .notEmpty()
        .withMessage('Please provide user id.')
        .bail()
        .trim()
        .isMongoId()
        .withMessage('Id must be a 24 character hex string, 12 byte Uint8Array, or an integer.')
];

export const updateDetailsValidation = [
    body('username')
        .optional()
        .trim()
        .escape()
        .matches(/^[a-zA-Z ]{2,30}$/)
        .withMessage('Username can only contains alphabets upto 30 characters'),
    
    body('email')  
        .optional()  
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Email is not valid.'),
];