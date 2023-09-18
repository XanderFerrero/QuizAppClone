import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();
export const register = asyncHandler(async (req, res) => {
    const saltGen = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, saltGen);
    const { name, email } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
        res.status(400);
        throw new Error("User already registered");
    }
    else {
        const user = new User({
            ...req.body,
            password: hashed
        });
        await user.save();
        res.json({
            name: name,
            email: email,
            token: genToken(user._id),
            _id: user._id
        });
    }
});
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
        res.status(400);
        throw new Error("Email not registered");
    }
    if (!(await bcrypt.compare(password, user.password))) {
        res.status(400);
        throw new Error("Password incorrect");
    }
    res.json({
        name: user.name,
        email: user.email,
        token: genToken(user._id),
        _id: user._id
    });
});
export const changePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req["user"].id);
    if (!(await bcrypt.compare(req.body.current, user.password))) {
        res.status(400);
        throw new Error("Incorrect current password");
    }
    else {
        const saltGen = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.next, saltGen);
        await User.updateOne({ _id: user._id }, { password: hashed });
        res.json(user);
    }
});
const genToken = (id) => {
    let token = jwt.sign({ id }, process.env.JWT_SECRET /* , {expiresIn: "1hr"} */);
    return token;
};
//# sourceMappingURL=UserController.js.map