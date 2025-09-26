import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ExperienceModule } from './experience/experience.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { MessagesModule } from './messages/messages.module';
import { CertificationsModule } from './certifications/certifications.module';
import { AuthModule } from './auth/auth.module';
import { SkillsModule } from './skills/skills.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envValidationSchema } from './common/schema/config.schema';
import { UserModule } from './user/user.module';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { TemporaryTokensModule } from './temporary-tokens/temporary-tokens.module';
import { PermissionModule } from './permission/permission.module';
import { TemporaryToken } from './temporary-tokens/entities/temporary-token.entity';
import { Permission } from './permission/entities/permission.entity';
import { Certification } from './certifications/entities/certification.entity';

const dataBaseProvider: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    entities: [User, TemporaryToken, Permission, Certification],
    synchronize: true,
  }),
};

@Module({
  imports: [
    HealthModule,
    ProfilesModule,
    ExperienceModule,
    TestimonialsModule,
    MessagesModule,
    CertificationsModule,
    AuthModule,
    UserModule,
    SkillsModule,
    TemporaryTokensModule,
    PermissionModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: envValidationSchema,
      validationOptions: { allowUnknown: true, abortEarly: true },
    }),
    TypeOrmModule.forRootAsync(dataBaseProvider),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
