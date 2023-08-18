import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Version,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthEmailsService } from '@src/auth/services';
import { GetCurrentUserId } from '@src/auth/common/decorators';

@Controller('auth/email')
@ApiBearerAuth('JWT')
@ApiTags('Authorization Email')
export class AuthEmailsController {
  constructor(private readonly authEmailsService: AuthEmailsService) {}

  @Post('verify')
  @Version('1')
  @ApiOperation({ summary: 'Verify Email' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Verification code and link sent to email',
    type: '',
  })
  @ApiNotFoundResponse({
    description: 'Does not exist.',
  })
  async initiateEmailVerification(@GetCurrentUserId() userId: string) {
    return await this.authEmailsService.initiateEmailVerification(userId);
  }

  @Post('confirm/:email/:verificationCode')
  @Version('1')
  @ApiOperation({ summary: 'Confirm Email Verification' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Email Verification confirmed',
    type: '',
  })
  @ApiParam({
    name: 'email',
    required: true,
    description: 'Should be an id of an user that exists in the database',
    type: String,
  })
  @ApiParam({
    name: 'code',
    required: true,
    description: 'Should be a code',
    type: String,
  })
  async confirmEmailVerification(
    @Param('email') email: string,
    @Param('verificationCode') verificationCode: number,
  ) {
    return await this.authEmailsService.confirmEmailVerification(
      email,
      verificationCode,
    );
  }
}
