import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { FacebookAuthResult } from '../types/facebook.types';

@Injectable()
export class FacebookAuthStrategy extends PassportStrategy(
  Strategy,
  'facebook',
) {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('FACEBOOK_CLIENT_ID'),
      clientSecret: configService.get<string>('FACEBOOK_CLIENT_SECRET'),
      callbackURL: configService.get<string>('FACEBOOK_CALLBACK_URL'),
      scope: ['public_profile'],
    });
  }

  async validate(
    originalRequest: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
  ) {
    return {
      originalRequest,
      accessToken,
      refreshToken,
      profile,
    } as FacebookAuthResult;
  }
}
