import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// controller for updating inventory

export const updateRecord = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const record = await prisma.inventory.findUnique({ where: { id } });

    if (!record) {
      return res.status(404).json({ message: 'Product record not found' });
    }

    const updatedRecord = await prisma.inventory.update({
      where: { id },
      data: {
        bookId: record.bookId,
        quantity: req.body.quantity ?? record.quantity,
      },
    });

    return res.status(200).json(updatedRecord);
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ error: 'Unable to update record at this time' });
    }
  }
};
