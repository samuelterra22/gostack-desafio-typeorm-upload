import { isUuid } from 'uuidv4';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    if (!isUuid(id)) {
      throw new AppError('Invalid ID', 401);
    }
    const transaction = await transactionsRepository.findOne(id);

    if (!transaction) {
      throw new AppError('Invalid ID', 401);
    }

    await transactionsRepository.delete(id);
  }
}

export default DeleteTransactionService;
