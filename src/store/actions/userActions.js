import { userService } from '../../services/userService'

export function loadUser(userId) {
    return async dispatch => {
        const user = await userService.query(userId)
        dispatch({ type: 'LOG_USER', user })
    }
}

export function login(user) {
    return async dispatch => {
        try {
            const signedUser = await userService.login(user)
            dispatch({ type: 'LOG_USER', user: signedUser })
            return user

        } catch ({ msg }) {
            dispatch({ type: 'SET_MSG', msg: msg || 'Unexpected error, try again later.' })
            setTimeout(() => {
                dispatch({ type: 'RESET_MSG' })
            }, 3000);
            throw new Error(msg)
        }
    }
}
export function signup(user) {
    return async dispatch => {
        try {
            const signedUser = await userService.signup(user)
            dispatch({ type: 'LOG_USER', user: signedUser })
            return user

        } catch ({ msg }) {
            dispatch({ type: 'SET_MSG', msg })
            setTimeout(() => {
                dispatch({ type: 'RESET_MSG' })
            }, 3000);
            throw new Error(msg)
        }
    }
}

export function logout() {
    return async dispatch => {
        await userService.logout()
        dispatch({ type: 'LOGOUT' })
        return
    }
}

export function updatePrefs(prefs, user) {
    return async dispatch => {
        const updatedUser = await userService.updatePrefs(prefs, user)
        dispatch({ type: 'UPDATE_USER', updatedUser })
    }
}

