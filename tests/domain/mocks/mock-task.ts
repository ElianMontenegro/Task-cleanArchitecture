import { AddTask } from '../../../src/domain/usecases'
import faker from 'faker'

export const mockAddTaskParams = (): AddTask.Params => ({
    title : faker.name.title(),
    content : faker.lorem.word(),
    accountId : faker.datatype.uuid()
}) 