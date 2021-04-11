import { AccountMongoRepository } from './account'

import { MongoHelper } from '../helpers/mongodb-helper'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'

const makeSut = (): AddAccountRepository => {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an account on success', async () => {
    const sut = makeSut()

    const accountData: AddAccountModel = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }

    const account = await sut.add(accountData)

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe(account.name)
    expect(account.email).toBe(account.email)
    expect(account.password).toBe(account.password)
  })
})
