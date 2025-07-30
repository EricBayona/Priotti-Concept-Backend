import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import { userService } from "../../../services/userService.js";
import { comparePassword, hasPassword } from "../../../utils/hasPassword.js";
import { cartService } from "../../../services/cart.service.js";


const registerStrategy = new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            const existingUser = await userService.getUserByEmail(email);

            if (existingUser) return done(null, false, { message: "The user already exists" });

            const newCart = await cartService.createCart();

            const newUser = {
                ...req.body,
                password: hasPassword(password),
                cart: newCart._id
            };

            const createUser = await userService.create(newUser);

            return done(null, createUser, { message: "registration completed" });

        } catch (error) {
            return done(error);
        }
    }
);
passport.use("register", registerStrategy);


const loginStrategy = new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
        try {
            const user = await userService.getUserByEmail(email);

            if (!user) {
                return done(null, false, { message: "User not found" })
            };
            const isValid = comparePassword(user.password, password);

            if (!isValid) {
                return done(null, false, { message: "Email or password is incorrect" })
            };

            return done(null, user, { message: "Login successful" });
        } catch (error) {
            return done(error);
        }
    }
);

passport.use("login", loginStrategy);