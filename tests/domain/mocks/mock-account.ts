import { AddAccount, Authentication } from '@/../../src/domain/usecases'
import faker from "faker";

export const mockAddAccountParams = (): AddAccount.Params => ({
    username : faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
})

export const mockAuthenticationParams = (): Authentication.Params => ({
    email: faker.internet.email(),
    password: faker.internet.password()
})