import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import envsConfig from "../../envs.config.js";
import { userService } from "../../../services/userService.js";


const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies.token;
    }
    return token;
};

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        cookieExtractor,
        ExtractJwt.fromAuthHeaderAsBearerToken()
    ]),
    secretOrKey: envsConfig.JWT_SECRET,
};

const currentStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        if (payload && payload.email) {
            const user = await userService.getUserByEmail(payload.email);

            if (!user) {
                return done(null, false, { message: "User not found" });
            }

            return done(null, user, { message: "Valid token" });
        }

        return done(null, false, { message: "Invalid token" });
    } catch (error) {
        return done(error);
    }
});

passport.use("jwt", currentStrategy);
