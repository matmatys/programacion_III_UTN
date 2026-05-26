import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthTokensModel } from './model/auth-tokens.model';
import { AuthUserModel } from './model/auth-user.model';
import { JwtPayloadModel } from './model/jwt-payload.model';
import { LoginRequest } from './request/login.request';
import { RefreshTokenRequest } from './request/refresh-token.request';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  /** Validates credentials and returns signed access/refresh tokens. */
  login(request: LoginRequest): AuthTokensModel {
    const validUser = this.getDemoUser();
    const validPassword = this.getDemoPassword();
    const username = request.username?.trim().toLowerCase();
    const password = request.password?.trim();

    if (username !== validUser.username || password !== validPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return new AuthTokensModel(
      this.signAccessToken(validUser),
      this.signRefreshToken(validUser),
      this.getAccessTokenExpirationSeconds(),
    );
  }

  /** Validates refresh token and returns a new access token. */
  refreshToken(request: RefreshTokenRequest): { accessToken: string; expiresIn: number } {
    const validUser = this.getDemoUser();

    if (!request.refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    try {
      const payload = this.jwtService.verify<JwtPayloadModel>(request.refreshToken, {
        secret: this.getJwtSecret(),
      });

      if (payload.tokenType !== 'refresh' || payload.sub !== validUser.userId) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return {
        accessToken: this.signAccessToken(validUser),
        expiresIn: this.getAccessTokenExpirationSeconds(),
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  /** Returns current user profile from a validated JWT payload. */
  getCurrentUser(payload: JwtPayloadModel): { userId: string; username: string; displayName: string; role: string } {
    const validUser = this.getDemoUser();

    if (payload.sub !== validUser.userId || payload.username !== validUser.username) {
      throw new UnauthorizedException('Invalid user');
    }

    return {
      userId: validUser.userId,
      username: validUser.username,
      displayName: validUser.displayName,
      role: validUser.role,
    };
  }

  /** Ensures payload belongs to current user and is an access token. */
  validateJwtPayload(payload: JwtPayloadModel): JwtPayloadModel {
    const validUser = this.getDemoUser();

    if (
      payload.tokenType !== 'access' ||
      payload.sub !== validUser.userId ||
      payload.username !== validUser.username
    ) {
      throw new UnauthorizedException('Invalid token payload');
    }

    return payload;
  }

  /** Signs a short-lived access token. */
  private signAccessToken(user: AuthUserModel): string {
    const payload: JwtPayloadModel = {
      sub: user.userId,
      username: user.username,
      displayName: user.displayName,
      role: user.role,
      tokenType: 'access',
    };

    return this.jwtService.sign(payload, {
      secret: this.getJwtSecret(),
      expiresIn: this.getAccessTokenExpirationRaw(),
    });
  }

  /** Signs a longer-lived refresh token. */
  private signRefreshToken(user: AuthUserModel): string {
    const payload: JwtPayloadModel = {
      sub: user.userId,
      username: user.username,
      displayName: user.displayName,
      role: user.role,
      tokenType: 'refresh',
    };

    return this.jwtService.sign(payload, {
      secret: this.getJwtSecret(),
      expiresIn: this.getRefreshTokenExpirationRaw(),
    });
  }

  /** Reads JWT secret from environment configuration. */
  private getJwtSecret(): string {
    const secret = this.configService.get<string>('AUTH_JWT_SECRET');

    if (!secret) {
      throw new UnauthorizedException('AUTH_JWT_SECRET is not configured');
    }

    return secret;
  }

  /** Reads access token expiration from environment configuration. */
  private getAccessTokenExpirationRaw(): string {
    return this.configService.get<string>('AUTH_ACCESS_TOKEN_EXPIRES_IN', '15m');
  }

  /** Reads refresh token expiration from environment configuration. */
  private getRefreshTokenExpirationRaw(): string {
    return this.configService.get<string>('AUTH_REFRESH_TOKEN_EXPIRES_IN', '7d');
  }

  /** Reads demo user from environment variables to keep class config-driven. */
  private getDemoUser(): AuthUserModel {
    return new AuthUserModel(
      this.getRequiredEnv('AUTH_DEMO_USER_ID'),
      this.getRequiredEnv('AUTH_DEMO_USERNAME').trim().toLowerCase(),
      this.getRequiredEnv('AUTH_DEMO_DISPLAY_NAME'),
      this.getRequiredEnv('AUTH_DEMO_ROLE'),
    );
  }

  /** Reads demo password from environment variables. */
  private getDemoPassword(): string {
    return this.getRequiredEnv('AUTH_DEMO_PASSWORD').trim();
  }

  /** Reads required env value and throws if missing. */
  private getRequiredEnv(key: string): string {
    const value = this.configService.get<string>(key);

    if (!value) {
      throw new UnauthorizedException(`${key} is not configured`);
    }

    return value;
  }

  /** Converts access token expiration to seconds for frontend display. */
  private getAccessTokenExpirationSeconds(): number {
    return this.durationToSeconds(this.getAccessTokenExpirationRaw());
  }

  /** Converts values like 15m / 7d into seconds. */
  private durationToSeconds(duration: string): number {
    const match = duration.trim().match(/^(\d+)([smhd])$/i);

    if (!match) {
      return 900;
    }

    const amount = Number(match[1]);
    const unit = match[2].toLowerCase();

    if (unit === 's') return amount;
    if (unit === 'm') return amount * 60;
    if (unit === 'h') return amount * 3600;
    return amount * 86400;
  }
}
