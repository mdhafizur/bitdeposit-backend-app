import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {
  AccessTokenStrategy,
  RefreshTokenStrategy,
} from '@src/auth/strategies';
import {
  AuthEmailsController,
  AuthPasswordsController,
  AuthPhonesController,
  AuthSessionsController,
  AuthSocialsController,
  AuthTwoFactorAuthenticationsController,
  AuthenticationsController,
} from '@src/auth/controllers';
import {
  AuthEmailsService,
  AuthPasswordsService,
  AuthPhonesService,
  AuthSessionsService,
  AuthSocialsService,
  AuthTwoFactorAuthenticationService,
  AuthenticationsService,
} from '@src/auth/services';
import { FacebookAuthStrategy } from './strategies/facebook.strategy';
import { GoogleAuthStrategy } from './strategies/google.strategy';
import { CaslAbilityFactory } from './common/casl-ability.factory';

@Global()
@Module({
  imports: [PassportModule, JwtModule.register({})],
  controllers: [
    AuthenticationsController,
    AuthEmailsController,
    AuthPhonesController,
    AuthPasswordsController,
    AuthSocialsController,
    AuthTwoFactorAuthenticationsController,
    AuthSessionsController,
  ],
  providers: [
    CaslAbilityFactory,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    FacebookAuthStrategy,
    GoogleAuthStrategy,
    AuthenticationsService,
    AuthEmailsService,
    AuthPhonesService,
    AuthPasswordsService,
    AuthSocialsService,
    AuthTwoFactorAuthenticationService,
    AuthSessionsService,
  ],
  exports: [JwtModule, AuthenticationsService, CaslAbilityFactory],
})
export class AuthModule {}
