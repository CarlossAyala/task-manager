import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { UsersService } from "src/app/user/users.service";
import { User } from "../user/entities/user.entity";
import { IJWTPayload } from "./interfaces/auth.interface";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import { CookieOptions } from "express";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp({
    firstName,
    lastName,
    email,
    password,
  }: SignUpDto): Promise<void> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      throw new BadRequestException("Email already exists");
    }

    const hash = await this.generateHash(password);

    await this.userService.create({
      firstName,
      lastName,
      email,
      password: hash,
    });

    // TODO: send welcome email
  }

  async signIn({ email, password }: SignInDto): Promise<{
    user: User;
    refreshToken: string;
    accessToken: string;
  }> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException("Invalid email or password");
    }

    const isValid = await this.compareHash(password, user.password);
    if (!isValid) {
      throw new BadRequestException("Invalid email or password");
    }

    const payload = { sub: user.id };
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return {
      user,
      refreshToken,
      accessToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const { sub } = await this.decodeRefreshToken(refreshToken);

    const accessToken = await this.generateAccessToken({ sub });
    const newRefreshToken = await this.generateRefreshToken({ sub });

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async generateHash(plainText: string): Promise<string> {
    const salt = +this.configService.get<string>("HASH_SALT");
    return bcrypt.hash(plainText, salt);
  }

  async compareHash(plainText: string, hashedText: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashedText);
  }

  async generateAccessToken(payload: IJWTPayload): Promise<string> {
    try {
      return this.jwtService.signAsync(payload);
    } catch (_) {
      throw new BadRequestException("Invalid access token");
    }
  }

  // TODO: implement refresh token
  async generateRefreshToken(payload: IJWTPayload): Promise<string> {
    try {
      return this.jwtService.signAsync(payload);
    } catch (_) {
      throw new BadRequestException("Invalid refresh token");
    }
  }

  async decodeAccessToken(accessToken: string): Promise<IJWTPayload> {
    try {
      return this.jwtService.verify(accessToken);
    } catch (_) {
      throw new BadRequestException("Invalid access token");
    }
  }

  async decodeRefreshToken(refreshToken: string): Promise<IJWTPayload> {
    try {
      return this.jwtService.verify(refreshToken);
    } catch (_) {
      throw new BadRequestException("Invalid refresh token");
    }
  }

  getRefreshTokenConfig(): CookieOptions {
    const THIRTY_DAYS_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 30;

    return {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: THIRTY_DAYS_IN_MILLISECONDS,
    };
  }

  getClearRefreshTokenConfig(): CookieOptions {
    const base = this.getRefreshTokenConfig();

    return {
      ...base,
      maxAge: 0,
    };
  }
}
