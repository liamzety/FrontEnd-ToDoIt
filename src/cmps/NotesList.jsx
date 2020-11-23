import React from 'react'
import { Loader } from './Loader'
export function NotesList({ notes, onNoteSelect }) {
    if (!notes) return <Loader />
    return (
        <ul className="notes-list">
            {notes.map(note => {
                return (
                    <li key={note._id}
                        onClick={() => { onNoteSelect(note) }}>
                        {note.title}
                    </li>
                )
            })}
        </ul>
    )

}
