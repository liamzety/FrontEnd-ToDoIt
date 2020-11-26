
const initialState = {
    msg: '',
}

export function msgReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_MSG':
            return {
                msg: action.msg
            }
        case 'RESET_MSG':
            return {
                msg: null
            }
        default:
            return state
    }

}