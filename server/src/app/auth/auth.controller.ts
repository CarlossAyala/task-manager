import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { User } from "../user/entities/user.entity";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import { Public } from "./decorators/public.decorator";
import { GetUser } from "./decorators/get-user.decorator";
import { Response } from "express";
import { GetCookies } from "src/common/cookies/get-cookies.decorator";
import { AppCookies } from "src/common/cookies/cookies.interface";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  @Public()
  async signUp(@Body() signUpDto: SignUpDto) {
    await this.authService.signUp(signUpDto);

    return { message: "Account created successfully" };
  }

  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  @Public()
  async signIn(
    @GetCookies("refreshToken") _refreshToken: string | undefined,
    @Res({
      passthrough: true,
    })
    res: Response,
    @Body() signInDto: SignInDto,
  ) {
    if (_refreshToken) {
      const clearCookieOptions = this.authService.getClearRefreshTokenConfig();
      res.clearCookie("refreshToken", clearCookieOptions);
    }

    const { user, refreshToken, accessToken } =
      await this.authService.signIn(signInDto);

    const cookieOptions = this.authService.getRefreshTokenConfig();
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return { user, accessToken };
  }

  @Post("sign-out")
  @HttpCode(HttpStatus.OK)
  @Public()
  signOut(
    @GetCookies("refreshToken") refreshToken: string | undefined,
    @Res({
      passthrough: true,
    })
    response: Response,
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token not found");
    }

    const clearCookieOptions = this.authService.getClearRefreshTokenConfig();
    response.clearCookie("refreshToken", clearCookieOptions);

    return { message: "Signed out successfully" };
  }

  @Post("refresh-token")
  @HttpCode(HttpStatus.OK)
  @Public()
  async refreshToken(
    @GetCookies() cookies: AppCookies,
    @Res({
      passthrough: true,
    })
    response: Response,
  ) {
    if (!cookies["refreshToken"]) {
      throw new UnauthorizedException("Refresh token not found");
    }

    const { accessToken, refreshToken } = await this.authService.refreshToken(
      cookies["refreshToken"],
    );

    const clearCookieOptions = this.authService.getClearRefreshTokenConfig();
    response.clearCookie("refreshToken", clearCookieOptions);

    const cookieOptions = this.authService.getRefreshTokenConfig();
    response.cookie("refreshToken", refreshToken, cookieOptions);

    return { accessToken };
  }

  @Get("profile")
  getProfile(@GetUser() user: User) {
    return user;
  }
}
