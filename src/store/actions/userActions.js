import { userService } from '../../services/userService'

export function loadUser(userId) {

    return async dispatch => {
        const user = await userService.query(userId)
        dispatch({ type: 'LOG_USER', user })
    }
}

export function login(user) {
    return dispatch => {
        return userService.login(user)
            .then(signedUser => {
                dispatch({ type: 'LOG_USER', user: signedUser })
                return user
            })
            .catch(({ msg }) => {
                dispatch({ type: 'SET_MSG', msg: msg || 'Unexpected error, try again later.' })
                setTimeout(() => {
                    dispatch({ type: 'RESET_MSG' })
                }, 3000);
                throw new Error(msg)
            })

    }
}
export function signup(user) {
    return dispatch => {
        return userService.signup(user)
            .then(signedUser => {
                dispatch({ type: 'LOG_USER', user: signedUser })
                return user
            })
            .catch(({ msg }) => {
                dispatch({ type: 'SET_MSG', msg })
                setTimeout(() => {
                    dispatch({ type: 'RESET_MSG' })
                }, 3000);
                throw new Error(msg)
            })
    }
}

export function logout() {
    return dispatch => {
        return userService.logout()
            .then(() => {
                dispatch({ type: 'LOGOUT' })
            })
    }
}

export function updatePrefs(prefs, user) {
    return dispatch => {
        return userService.updatePrefs(prefs, user)
            .then((updatedUser) => {
                dispatch({ type: 'UPDATE_USER', updatedUser })
            })
    }
}

