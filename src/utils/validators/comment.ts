import { body, param } from "express-validator";

export const getCommentValidator = [
    param('_id')
        .trim()
        .isMongoId()
        .withMessage('Id must be a 24 character hex string, 12 byte Uint8Array, or an integer.'),
]

export const createCommentValidator = [
    body('blog')
        .notEmpty()
        .withMessage('Please provide blog id.')
        .trim()
        .isMongoId()
        .withMessage('Id must be a 24 character hex string, 12 byte Uint8Array, or an integer.'),
    
    body('comment')    
        .notEmpty()
        .withMessage('Please provide comment.')
        .trim()
        .escape()
]

export const updateCommentValidator = [
    param('_id')
        .trim()
        .isMongoId()
        .withMessage('Id must be a 24 character hex string, 12 byte Uint8Array, or an integer.'),
    
    body('comment')    
        .optional()
        .trim()
        .escape()    
]

export const deleteCommentValidator = [
    param('_id')
        .trim()
        .isMongoId()
        .withMessage('Id must be a 24 character hex string, 12 byte Uint8Array, or an integer.')
]