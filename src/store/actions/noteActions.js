import { noteService } from '../../services/noteService'


//ADD
export function addNote(user) {
    return async dispatch => {
        const updatedUser = await noteService.add(user)
        dispatch({ type: 'UPDATE_USER', updatedUser })
    }
}
//UPDATE
export function updateNote(note, user) {
    return async dispatch => {
        const updatedUser = await noteService.update(note, user)
        dispatch({ type: 'UPDATE_USER', updatedUser })
    }
}
//REMOVE
export function removeNote(noteId, user) {
    return async dispatch => {
        const updatedUser = await noteService.remove(noteId, user)
        dispatch({ type: 'UPDATE_USER', updatedUser })
    }
}

