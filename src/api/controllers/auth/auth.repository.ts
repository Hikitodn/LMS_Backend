import { Profile, User } from "@entities/index";
import { PostgresDataSource } from "src/config/db_connect";
import bcrypt from "bcryptjs";
import env from "src/config/env";
import Jwt from "jsonwebtoken";

export const AuthRepository = PostgresDataSource.getRepository(User).extend({
  async insertUser(req: User) {
    const existedUser = await AuthRepository.findOne({
      where: {
        email: req.email,
      },
    });
    if (existedUser) throw new Error("Existed user");

    const profile = new Profile();
    profile.date_of_birth = req.profile.date_of_birth;
    profile.gender = req.profile.gender;

    const user = new User();
    user.email = req.email;
    user.password = req.password;
    user.name = req.name;
    user.profile = profile;
    const result = await AuthRepository.save(user);
    return {
      id: result.id,
    };
  },

  async verifyUser(req: User) {
    const user = await AuthRepository.findOneOrFail({
      where: {
        email: req.email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
      },
    });

    if (user.password) {
      // return user and jwt
      if (user && (await bcrypt.compare(req.password, user.password))) {
        return { id: user.id };
      }
    }
  },

  async generateToken(payload: string | object | Buffer) {
    const token = Jwt.sign(payload, env.jwtAccessToken as string);
    return { token: "Bearer " + token };
  },
});
