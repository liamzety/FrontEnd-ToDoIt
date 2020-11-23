import { Home } from './views/Home'
import { Notes } from './views/Notes'
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
        component: Notes
    }
]