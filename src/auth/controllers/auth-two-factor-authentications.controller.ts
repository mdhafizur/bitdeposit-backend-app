import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  AuthTwoFactorAuthenticationService,
  AuthenticationsService,
} from '@src/auth/services';
import { PrismaService } from '@src/core/services';
import { Response } from 'express';
import { GetCurrentUserId } from '../common/decorators';

@Controller('auth/2fa')
@ApiTags('Two Factor Authentication Service')
export class AuthTwoFactorAuthenticationsController {
  constructor(
    private readonly authTwoFactorAuthenticationService: AuthTwoFactorAuthenticationService,
    private readonly authenticationsService: AuthenticationsService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post('generate')
  @Version('1')
  @ApiBearerAuth('JWT')
  async register(
    @Res() response: Response,
    @GetCurrentUserId() userId: string,
  ) {
    const userData = await this.prismaService.usersUser.findUnique({
      where: {
        id: userId,
      },
    });
    const { otpauthUrl } =
      await this.authTwoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(
        userData,
      );
    response.setHeader('content-type', 'image/png');
    return this.authTwoFactorAuthenticationService.pipeQrCodeStream(
      response,
      otpauthUrl,
    );
  }

  @Post('turn-on')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  async turnOnTwoFactorAuthentication(
    @GetCurrentUserId() userId: string,
    @Body() { twoFactorAuthenticationCode }: any,
  ) {
    const userData = await this.prismaService.usersUser.findUnique({
      where: {
        id: userId,
      },
      include: {
        verificationTokens: {
          where: {
            type: 'twoFactorAuthenticationSecret',
          },
        },
      },
    });
    const isCodeValid =
      this.authTwoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode,
        userData.verificationTokens[0].twoFactorAuthenticationSecret,
      );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.authTwoFactorAuthenticationService.turnOnTwoFactorAuthentication(
      userId,
    );
  }

  @Post('authenticate')
  @Version('1')
  @HttpCode(200)
  async authenticate(
    @GetCurrentUserId() userId: string,
    @Body() { twoFactorAuthenticationCode }: any,
  ) {
    const userData = await this.prismaService.usersUser.findUnique({
      where: {
        id: userId,
      },
      include: {
        verificationTokens: {
          where: {
            type: 'twoFactorAuthenticationSecret',
          },
        },
      },
    });

    const isCodeValid =
      this.authTwoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode,
        userData.verificationTokens[0].twoFactorAuthenticationSecret,
      );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }

    const tokens = await this.authenticationsService.getTokens(userData);

    await this.authenticationsService.updateRefreshTokenHash(
      tokens.refreshToken,
    );

    return tokens;
  }
}
