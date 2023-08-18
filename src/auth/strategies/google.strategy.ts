import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { GoogleAuthResult } from '../types/google.types';

// https://developers.google.com/identity/protocols/oauth2/scopes#google-sign-in
const scopes: string[] = [
  'email', //	See your primary Google Account email address
  'openid', //	Associate you with your personal info on Google
  'profile', //	See your personal info, including any personal info you've made publicly available
];

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      /** Pass in the scopes array defined above.
       * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
      scope: ['openid', 'profile', 'email'],
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
    } as GoogleAuthResult;
  }
}
