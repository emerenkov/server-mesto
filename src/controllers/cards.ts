import { Request, Response } from 'express';
import Cards from '../models/cards';
import {RequestCustom} from "../middleware/type";

export const getCards = (req: Request, res: Response) => {
  return Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

export const createCard = (req: Request, res: Response) => {
  console.log((req as RequestCustom).user!._id); // _id станет доступен
  const { name, link } = req.body;
  const id = (req as RequestCustom).user!._id;

  Cards.create({name, link, owner: id})
    .then((card)=> res.status(201).send({data: card}))
    .catch((err)=> {

    })
};
