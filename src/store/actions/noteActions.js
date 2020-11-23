import { noteService } from '../../services/noteService'


//ADD
export function addNote(user) {
    return async dispatch => {
        const updatedUser = await noteService.add(user)
        dispatch({ type: 'SAVE_NOTE', updatedUser })
    }
}
//UPDATE
export function updateNote(note, user) {
    return async dispatch => {
        const updatedUser = await noteService.update(note, user)
        dispatch({ type: 'SAVE_NOTE', updatedUser })
    }
}
//REMOVE
export function removeNote(noteId, user) {
    return async dispatch => {
        const updatedUser = await noteService.remove(noteId, user)
        dispatch({ type: 'REMOVE_NOTE', updatedUser })
    }
}

