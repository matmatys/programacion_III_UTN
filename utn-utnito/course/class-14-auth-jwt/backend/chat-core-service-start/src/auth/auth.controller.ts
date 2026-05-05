import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AbstractController } from '../basic/abstract.controller';
import { AuthService } from './auth.service';
import { LoginRequest } from './request/login.request';

// Swagger decorator: groups auth endpoints inside one section in Swagger UI.
@ApiTags('auth')
@Controller('auth')
export class AuthController extends AbstractController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  /** Authenticates a user and returns a mock session. */
  @Post('login')
  // Swagger decorator: describes endpoint behavior in Swagger docs.
  @ApiOperation({ summary: 'Login endpoint with service layer' })
  // Swagger decorator: documents expected JSON body shape.
  @ApiBody({ type: LoginRequest })
  login(@Body() request: LoginRequest) {
    const session = this.authService.login(request);
    return this.createOkResponseWithMessage(session, 'Login successful');
  }
}
