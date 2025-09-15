export class Project {
  uuid: string;
  title: string;
  description: string;
  techStack: string[]; // e.g. ["React", "NestJS", "Postgres"]
  githubUrl?: string;
  liveUrl?: string;

  // Images
  mainImageUrl: string; // required
  additionalImages?: string[]; // optional, max 3

  createdAt: Date;
  updatedAt: Date;
}
