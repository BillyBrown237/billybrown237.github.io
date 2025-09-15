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

@Module({
  imports: [
    HealthModule,
    ProfilesModule,
    ExperienceModule,
    TestimonialsModule,
    MessagesModule,
    CertificationsModule,
    AuthModule,
    SkillsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
