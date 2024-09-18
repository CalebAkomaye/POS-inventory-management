import { Book, Customer } from '@prisma/client';

export interface Transaction {
  id: number;
  bookId: number;
  customerId: number;
  quantity: number;
  totalPrice: number;
  date: Date;

  // Relations
  Book?: Book;
  Customer?: Customer;
}
