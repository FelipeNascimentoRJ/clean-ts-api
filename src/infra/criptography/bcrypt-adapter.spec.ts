import bcrypt from 'bcrypt'

import { BcryptAdapter } from './bcrypt-adapter'

const hashMock = 'hash'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise<string>((resolve) => resolve(hashMock))
  }
}))

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)

    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const value = 'any_value'

    await sut.encrypt(value)

    expect(hashSpy).toHaveBeenLastCalledWith(value, salt)
  })

  test('Should retrun a hash on success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)

    const value = 'any_value'

    const hash = await sut.encrypt(value)

    expect(hash).toBe(hashMock)
  })
})
