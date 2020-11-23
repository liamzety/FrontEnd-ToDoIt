import { Home } from './views/Home'
import { NoteApp } from './views/NoteApp'
import { UserSign } from './views/UserSign'

export default [
    {
        path: '/',
        component: Home
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