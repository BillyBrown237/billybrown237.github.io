import { UserRoles } from '../user/enum/user-role.enum';

export interface TokenPayloadI {
  uuid: string;
  username: string;
  role: UserRoles;
}
