import { Book } from '@prisma/client';

export interface Inventory {
  id: number;
  bookId: number;
  quantity: number;
  createdAt: Date;

  Book?: Book; // relation
}
