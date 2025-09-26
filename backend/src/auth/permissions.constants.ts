import { UserRoles } from '../user/enum/user-role.enum';

export const PERMISSIONS_KEY = 'permissions';

export enum AppPermission {
  ProjectsCreate = 'projects:create',
  ProjectsUpdate = 'projects:update',
  ProjectsDelete = 'projects:delete',

  SkillsCreate = 'skills:create',
  SkillsUpdate = 'skills:update',
  SkillsDelete = 'skills:delete',

  ExperienceCreate = 'experience:create',
  ExperienceUpdate = 'experience:update',
  ExperienceDelete = 'experience:delete',

  CertificationsCreate = 'certifications:create',
  CertificationsUpdate = 'certifications:update',
  CertificationsDelete = 'certifications:delete',

  ProfilesCreate = 'profiles:create',
  ProfilesUpdate = 'profiles:update',
  ProfilesDelete = 'profiles:delete',

  MessagesCreate = 'messages:create',
  MessagesUpdate = 'messages:update',
  MessagesDelete = 'messages:delete',

  TestimonialsCreate = 'testimonials:create',
  TestimonialsUpdate = 'testimonials:update',
  TestimonialsDelete = 'testimonials:delete',

  PermissionManage = 'permission:manage',
}

// Minimal role to permissions mapping for this app
export const RolePermissions: Record<UserRoles, readonly string[]> = {
  [UserRoles.ADMIN]: Object.values(AppPermission),
  [UserRoles.OWNER]: Object.values(AppPermission),
  [UserRoles.VIEWER]: [],
  [UserRoles.CLIENT]: [],
};
