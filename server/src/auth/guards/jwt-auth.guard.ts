import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from 'src/user/entities/user.entity';

export interface AuthenticatedRequest extends Request {
  user: User;
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
