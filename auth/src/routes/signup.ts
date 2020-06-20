import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { BadRequestError, validateRequest } from "@mkticket/common";

const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20})
        .withMessage('password must be between 4 and 20')
], validateRequest, async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();

    // store in session
    (<any>req).session.jwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);

    res.status(201).send(user);

});

export { router as signupRouter };
