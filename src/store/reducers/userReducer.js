let localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

const initialState = {
    loggedUser: localLoggedinUser,
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        //USER
        case 'LOG_USER':
            console.log('logging user',)
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
            const noteIdx = state.loggedUser.notes.findIndex(note => note._id === action.note._id)
            //NEW NOTE
            if (noteIdx === -1) return ({
                ...state,
                loggedUser: {
                    ...state.loggedUser,
                    notes: [
                        action.note, ...state.loggedUser.notes
                    ]
                }
            })
            //UPDATE NOTE
            else {
                const notes = [...state.loggedUser.notes]
                notes.splice(noteIdx, 1, action.note)
                return ({
                    ...state,
                    loggedUser: {
                        ...state.loggedUser,
                        notes
                    }
                })
            }
        case 'REMOVE_NOTE':
            return ({
                ...state,
                loggedUser: action.updatedUser,
            })

        default:
            return state
    }

}