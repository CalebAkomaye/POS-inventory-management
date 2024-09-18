import { Transaction } from '@prisma/client';

export interface Customer {
  id: number;
  name: string;
  address: string;
  phoneNumber?: string;
  createdAt: Date;

  // Optional relation
  Transaction?: Transaction[];
}
