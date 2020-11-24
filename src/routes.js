import { UserLogin } from './views/UserLogin'
import { NoteApp } from './views/NoteApp'
import { UserSign } from './views/UserSign'

export default [
    {
        path: '/',
        component: UserLogin
    },
    {
        path: '/sign',
        component: UserSign
    },
    {
        path: '/notes',
        component: NoteApp
    }
]