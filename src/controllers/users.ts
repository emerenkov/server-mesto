import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = (req: Request, res: Response) => {
  return User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

export const getUserById = (req: Request, res: Response) => {
  User.findById(req.params.userId)
    .then((user) => {
      if(!user) {
        return res.status(401).send('Пользователь по указанному _id не найден');
      }
      return res.status(200).send({data: user})
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(402).send('Переданы некорректные данные при создании пользователя');
      }
      return res.status(500).send({message: 'Произошла ошибка'})
    });
}

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(401).send('Переданы некорректные данные при создании пользователя');
      }
      res.status(500).send({message: 'Произошла ошибка'})
    });
}