import paths from './paths'
import components from './components'
import schemas from './schemas'
export default {
    openapi : '3.0.0',
    info : {
        title : 'Task CleanApi',
        version : '1.0.0',
        description : 'API designed by Elian Montenegro used Typescript, TDD, Clean Architecture, SOLID principles and Desing Patterns.',
        contact : {
            name : 'Elian Montenegro',
            email : 'elianmontenegro@gmail.com',
            url : 'https://www.linkedin.com/in/elian-montenegro/'
        }
    },
    servers : [{
        url : "http://localhost:4000/",
        description : 'local'
    }],
    tags : [{
        name : 'Login',
        description : 'login related APIs'
    }],
    paths,
    schemas,
    components
}