let localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

const initialState = {
    loggedUser: localLoggedinUser,
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        //USER
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
        //NOTE 
        case 'SAVE_NOTE':
            sessionStorage.setItem('user', JSON.stringify(action.updatedUser))
            return ({
                ...state,
                loggedUser: action.updatedUser
            })

        case 'REMOVE_NOTE':
            sessionStorage.setItem('user', JSON.stringify(action.updatedUser))
            return ({
                ...state,
                loggedUser: action.updatedUser,
            })

        default:
            return state
    }

}