import env from "./env";
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
} from "passport-jwt";
import { UserRepository } from "@controllers/user/user.repository";
import { pick } from "lodash";

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
      return done(
        null,
        pick(user, ["id", "name", "role", "is_verified", "profile.photo_path"])
      );
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});

export default { jwtStrategy };
