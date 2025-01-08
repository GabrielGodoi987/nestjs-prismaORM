import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  name: string;
  email: string;
  password: string;
  admin: boolean;
  created_at: Date;
  updated_at: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
