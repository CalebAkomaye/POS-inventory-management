import {
  createTransaction,
  getAllTransactions,
  getCustomerTransactions,
} from '../controllers/transaction.controller';
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from '../controllers/book.controller';
import {
  createClient,
  getClient,
  getClients,
  updateClient,
} from '../controllers/clients.controller';

import express from 'express';

const router = express.Router();

router.get('/dashboard', getBooks);

///=============Book routes==================//
// Route for fetching all books
router.get('/books', getBooks);

// Route for fetching a specific book
router.get('/books/:id', getBook);

// Route for adding a new book
router.post('/books', createBook);

// Route to update book and book details
router.patch('/books/:id', updateBook);

router.delete('/books/:id', deleteBook);

///==============================//

//============Customers routes===============//

// Route for fetching all clients
router.get('/clients', getClients);

router.get('/clients/:id', getClient);

// Route to update customer and customer's details
router.patch('/clients/:id', updateClient);

// Route for adding a new client
router.post('/clients', createClient);
//================================//

///=============Transaction routes=================//

router.get('/sales', getAllTransactions);

router.get('/sales/filter', getCustomerTransactions); //E.g, localhost:3001/sales/filter?{customerId}

router.post('/sales', createTransaction);

//=====================================//

export default router;
