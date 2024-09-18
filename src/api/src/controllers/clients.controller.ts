import { Request, Response } from 'express';
import prisma from '../utils/prisma';

//============GET all customers=============//
export const getClients = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: 'Unable to get data', error: error.message });
    }
  }
};

//=================GET a single customer by ID===============//
export const getClient = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid client ID' });
    }

    const customer = await prisma.customer.findUnique({ where: { id } });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(customer);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Server error' });
  }
};

//=================create a customer with detials===============//
export const createClient = async (req: Request, res: Response) => {
  const { name, address, phoneNumber } = req.body;

  try {
    const client = await prisma.customer.create({
      data: {
        name,
        address,
        phoneNumber,
      },
    });

    return res.status(201).json(client);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

//========================DELETE a customer with details=================//
export const deleteClient = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const client = await prisma.customer.delete({
      where: { id },
    });

    return res
      .status(200)
      .json({ message: 'Client deleted successfully', client });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

//=========================UPDATE customers details==============//
export const updateClient = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, address, phoneNumber } = req.body;

  try {
    const existingClient = await prisma.customer.findUnique({
      where: { id },
    });

    if (!existingClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const updatedClient = await prisma.customer.update({
      where: { id },
      data: {
        name: name ?? existingClient.name,
        address: address ?? existingClient.address,
        phoneNumber: phoneNumber ?? existingClient.phoneNumber,
      },
    });
    return res.status(200).json(updatedClient);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
