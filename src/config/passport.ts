import userService from "@controllers/user/user.service";
import env from "./env";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

const jwtOptions = {
  secretOrKey: env.jwtAccessToken,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export default new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await userService.getById(payload.sub);
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});
