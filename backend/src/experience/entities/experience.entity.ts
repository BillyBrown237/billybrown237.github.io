export class Experience {
     id: string;
  title: string;        // e.g. "Frontend Developer"
  company: string;      // e.g. "Freelance"
  startDate: Date;
  endDate?: Date;       // null if ongoing
  description: string;
}
