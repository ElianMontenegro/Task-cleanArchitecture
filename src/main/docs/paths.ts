import { loginPath, signupPath, addTaskPath, LoadAllTaskPath, LoadAllTaskByUserPath } from './paths/index'

export default {
    '/api/login' : loginPath,
    '/api/signup' : signupPath,
    '/api/add-task' : addTaskPath,
    '/api/load-all-task' : LoadAllTaskPath,
    '/api/load-all-task-by-user' : LoadAllTaskByUserPath
}