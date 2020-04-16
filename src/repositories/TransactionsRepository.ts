import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const incomeValue = transactions
      .filter(transaction => {
        return transaction.type === 'income' ? transaction.value : 0;
      })
      .reduce((sum, b): number => sum + b.value, 0);

    const outcomeValue = transactions
      .filter(transaction => {
        return transaction.type === 'outcome' ? transaction.value : 0;
      })
      .reduce((sum, b): number => sum + b.value, 0);

    return {
      income: incomeValue,
      outcome: outcomeValue,
      total: incomeValue - outcomeValue,
    };
  }
}

export default TransactionsRepository;
