import { User } from './user/entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { UserRoles } from './user/enum/user-role.enum';

async function seedAdmin(userRepo: Repository<User>) {
  const existing = await userRepo.findOne({ where: { username: 'admin' } });
  if (!existing) {
    const passwordHash = await bcrypt.hash('Str0ngP@ss!', 10);
    const admin = userRepo.create({
      username: 'admin',
      first_name: 'Billy',
      last_name: 'Brown',
      email: 'kano.billybrown@gmail.com',
      passwordHash,
      role: UserRoles.ADMIN,
    });
    await userRepo.save(admin);
    console.log(
      'Admin user created with username "admin" and password "Str0ngP@ss!"',
    );
  } else {
    console.log('Admin user already exists, skipping seeding.');
  }
}
