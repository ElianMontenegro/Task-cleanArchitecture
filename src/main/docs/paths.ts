import { loginPath, signupPath, addTaskPath, LoadAllTaskPath, LoadAllTaskByUserPath, DeleteTaskByIdPath, UpdateTaskPath } from './paths/index'

export default {
    '/api/login' : loginPath,
    '/api/signup' : signupPath,
    '/api/add-task' : addTaskPath,
    '/api/all-task' : LoadAllTaskPath,
    '/api/tasks' : LoadAllTaskByUserPath,
    '/api/delete-task/{id}' : DeleteTaskByIdPath,
    '/api/update-task/{id}' : UpdateTaskPath
}