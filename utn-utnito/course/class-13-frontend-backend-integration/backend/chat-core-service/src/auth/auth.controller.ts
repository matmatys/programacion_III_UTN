import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AbstractController } from '../basic/abstract.controller';
import { AuthService } from './auth.service';
import { LoginRequest } from './request/login.request';

@ApiTags('auth')
@Controller('auth')
export class AuthController extends AbstractController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  /** Authenticates a user and returns a mock session. */
  @Post('login')
  @ApiOperation({ summary: 'Login endpoint with service layer' })
  @ApiBody({ type: LoginRequest })
  login(@Body() request: LoginRequest) {
    const session = this.authService.login(request);
    return this.createOkResponseWithMessage(session, 'Login successful');
  }
}
