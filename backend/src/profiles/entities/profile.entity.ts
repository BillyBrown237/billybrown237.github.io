export class Profile {
  id: string;
  bio: string;
  profileImageUrl?: string;
  resumeUrl?: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}
