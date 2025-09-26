import { UserRoles } from '../user/enum/user-role.enum';

export interface TokenPayloadI {
  uuid?: string; // present for normal users
  username?: string; // present for normal users
  role?: UserRoles; // present for normal users
  // Temporary principal fields
  temp?: boolean; // true if token is a temporary permission token
  permissions?: string[]; // explicit permissions granted
  tempTokenId?: string; // uuid of the TemporaryToken record for tracing
}
