import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel, AddAccountModel } from '../../../../data/usecases/add-account/db-add-account-protocols'
import { MongoHelper } from '../helpers/mongodb-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (account: AddAccountModel): Promise<AccountModel> {
    const collection = MongoHelper.getCollection('accounts')
    const result = await collection.insertOne(account)
    const { _id, ...accountWithoutId } = result.ops[0]

    return { id: _id, ...accountWithoutId }
  }
}
