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
            .catch(err => { throw err })

    }
}
export function signup(user) {
    console.log('signing up:', user)
    return dispatch => {
        return userService.signup(user)
            .then(signedUser => {
                dispatch({ type: 'LOG_USER', user: signedUser })
                return user
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

