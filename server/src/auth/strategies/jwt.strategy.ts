import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserData } from 'src/types/types';
import { errorMessages } from 'src/types/types';
import { envVariables } from 'src/types/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const jwtSecret = configService.get<string>(envVariables.jwtSecret);

    if (!jwtSecret) {
      throw new Error(errorMessages.jwtSecretNotDefined);
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
