import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AbstractController } from '../basic/abstract.controller';
import { AuthService } from './auth.service';
import { JwtPayloadModel } from './model/jwt-payload.model';
import { LoginRequest } from './request/login.request';
import { JwtAuthGuard } from './strategy/jwt-auth.guard';

// Swagger decorator: groups auth endpoints inside one section in Swagger UI.
@ApiTags('auth')
@Controller('auth')
export class AuthController extends AbstractController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  /** Authenticates a user and returns JWT tokens. */
  @Post('login')
  // Swagger decorator: describes endpoint behavior in Swagger docs.
  @ApiOperation({ summary: 'Authenticate user and return access + refresh tokens' })
  // Swagger decorator: documents expected JSON body shape.
  @ApiBody({ type: LoginRequest })
  login(@Body() request: LoginRequest) {
    const tokens = this.authService.login(request);
    return this.createOkResponseWithMessage(tokens, 'Login successful');
  }

  /** Returns current authenticated user from access token. */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  // Swagger decorator: tells Swagger this endpoint requires Bearer auth.
  @ApiBearerAuth('jwtAuth')
  // Swagger decorator: describes endpoint behavior in Swagger docs.
  @ApiOperation({ summary: 'Get current authenticated user' })
  getMe(@Req() request: Request & { user: JwtPayloadModel }) {
    const user = this.authService.getCurrentUser(request.user);
    return this.createOkResponseWithMessage(user, 'Current user loaded');
  }
}
