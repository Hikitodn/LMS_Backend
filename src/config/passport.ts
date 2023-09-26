import env from "./env";
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
} from "passport-jwt";
import { UserRepository } from "@controllers/user/user.repository";

const jwtOptions: StrategyOptions = {
  secretOrKey: env.jwtAccessToken,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await UserRepository.findOne({
      relations: ["profile"],
      where: { id: payload.sub },
    });

    if (user)
      return done(null, {
        name: user?.name,
        isVerified: user?.is_verified,
        role: user?.role,
        photo: user?.profile.photo_path,
      });
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});

export const test = () => {};

export default { jwtStrategy, test };
