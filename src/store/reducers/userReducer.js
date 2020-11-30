let localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

const initialState = {
    loggedUser: localLoggedinUser,
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOG_USER':
            sessionStorage.setItem('user', JSON.stringify(action.user))
            return {
                ...state,
                loggedUser: action.user
            }
        case 'LOGOUT':
            return {
                ...state,
                loggedUser: null
            }

        case 'UPDATE_USER':
            sessionStorage.setItem('user', JSON.stringify(action.updatedUser))
            return ({
                ...state,
                loggedUser: action.updatedUser
            })

        default:
            return state
    }

}