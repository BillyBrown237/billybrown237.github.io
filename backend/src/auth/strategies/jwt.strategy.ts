import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayloadI } from '../token-payload.interface';
import { Request } from 'express';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    // Explicitly define the strategy options with the correct type.
    // This resolves the ESLint errors by ensuring type safety for the 'jwtFromRequest' property.
    const strategyOptions: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.Authentication,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
    };
    super(strategyOptions);
  }

  async validate(payload: TokenPayloadI) {
    console.log('Payload', payload);
    return await this.userService.findOne(payload.uuid);
  }
}
