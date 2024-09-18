import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const createTransaction = async (req: Request, res: Response) => {
  const { bookId, customerId, quantity, totalPrice } = req.body;
  const id = parseInt(bookId);

  try {
    const transaction = await prisma.transaction.create({
      data: {
        bookId,
        customerId,
        quantity,
        totalPrice,
      },
    });

    await prisma.inventory.update({
      where: { id },
      data: {
        quantity: {
          decrement: quantity, // Reduce the quantity in stock by the number sold
        },
      },
    });

    res.status(201).json({
      message: 'Transaction recorded successfully',
      transaction,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    // Retrieve all transactions
    const transactions = await prisma.transaction.findMany({
      include: {
        Book: true, // Include the related book details
        Customer: true, // Include the related customer details
      },
    });

    if (transactions.length < 1) {
      return res.status(200).json({ message: 'No sales record' });
    }
    res.status(200).json(transactions);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const getCustomerTransactions = async (req: Request, res: Response) => {
  try {
    const customerId = Number(req.query.customerId); //localhost:3001/sales/filter?{customerId}

    if (customerId) {
      // Fetch transactions for a specific customer
      const transactions = await prisma.transaction.findMany({
        where: { customerId },
        include: {
          Book: true, // Include book details
        },
      });

      if (!transactions.length) {
        res
          .status(404)
          .json({ message: 'No transactions found for this customer' });
        return;
      }

      res.status(200).json(transactions);
    } else {
      return res.status(404).json({ message: 'invalid customer id' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
