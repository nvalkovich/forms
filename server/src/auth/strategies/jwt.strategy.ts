import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserData } from 'src/types/types';
import { ErrorMessageKeys } from 'src/types/types';
import { EnvVariables } from 'src/types/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const jwtSecret = configService.get<string>(EnvVariables.jwtSecret);

    if (!jwtSecret) {
      throw new Error(ErrorMessageKeys.jwtSecretNotDefined);
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  validate(user: UserData) {
    return { id: user.id, email: user.email };
  }
}
