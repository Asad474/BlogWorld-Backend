import { body, param } from "express-validator";

export const getBlogByIdValidator = [
    param('_id')
        .trim()
        .isMongoId()
        .withMessage('Id must be a 24 character hex string, 12 byte Uint8Array, or an integer.')
]

export const createBlogValidator = [
    body('title')
        .notEmpty()
        .withMessage('Title is required.')
        .trim()
        .escape()
        .isLength({ max: 30 })
        .withMessage('Keep the title short.'),

    body('category')
        .optional()
        .trim()
        .escape()
        .isLength({ max: 20 })
        .withMessage('Category length is too long.'),
    
    body('content')    
        .notEmpty()
        .withMessage('Content is required.')
        .trim()
]

export const updateBlogValidator = [
    param('_id')
        .trim()
        .isMongoId()
        .withMessage('Id must be a 24 character hex string, 12 byte Uint8Array, or an integer.'),
    
    body('title')    
        .optional()
        .trim()
        .escape()
        .isLength({ max: 30 })
        .withMessage('Keep the title short.'),
    
    body('category')
        .optional()
        .trim()
        .escape()
        .isLength({ max: 20 })
        .withMessage('Category length is too long.'),  
    
    body('content')    
        .optional()
        .trim()    
]