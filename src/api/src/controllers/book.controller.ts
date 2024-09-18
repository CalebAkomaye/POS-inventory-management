import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { Book } from 'models/bookModel';

//===================GET all books=======================//
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany();
    if (books.length! > 0) {
      return res.status(200).json({ message: 'Nothing in library' });
    }
    return res.status(200).json(books);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

//=====================GET Book with ID=========================//
export const getBook = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }

    const book = await prisma.book.findUnique({ where: { id } });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json({ book });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Server error' });
  }
};

//===================Create book with details===================//
export const createBook = async (req: Request, res: Response) => {
  const { title, description, price, publishedDate, quantity } = req.body;

  try {
    const book = await prisma.book.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        publishedDate: new Date(),
        Inventory: {
          create: {
            quantity: quantity || 0,
          },
        },
      },
    });

    return res.status(201).json(book);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: 'An unknown error occurred' });
  }
};

//========================update book details===============//
export const updateBook = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const toUpdate = await prisma.book.findUnique({ where: { id } });

    if (!toUpdate) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const patch = {
      title: req.body.title ?? toUpdate.title,
      description: req.body.description ?? toUpdate.description,
      price: parseFloat(req.body.price) ?? toUpdate.price,
      publishedDate: req.body.publishedDate ?? toUpdate.publishedDate,
    };

    const updatedBook = await prisma.book.update({
      where: { id },
      data: patch,
    });

    return res.status(200).json(updatedBook);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

//====================delete book========================//
export const deleteBook = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const deletedBook = await prisma.book.delete({
      where: { id },
    });

    return res.status(200).json({
      message: 'Book and related inventory deleted successfully',
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
