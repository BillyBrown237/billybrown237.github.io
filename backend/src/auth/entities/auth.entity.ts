export class Auth {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'viewer';
  createdAt: Date;
}
