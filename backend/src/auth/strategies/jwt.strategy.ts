import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // Explicitly define the strategy options with the correct type.
    // This resolves the ESLint errors by ensuring type safety for the 'jwtFromRequest' property.
    const strategyOptions: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    };
    super(strategyOptions);
  }

  validate(payload: Partial<User> & { sub: string }) {
    return {
      uuid: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
