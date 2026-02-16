export type Link = {
  id: string;
  name: string;
  url: string;
  description: string;
  tag?: string;
  createdAt: number;
  updatedAt: number;
  order: number;
};

export type CreateLinkDto = Omit<Link, "id" | "createdAt" | "updatedAt">;

export type UpdateLinkDto = Partial<CreateLinkDto> & { id: string };
