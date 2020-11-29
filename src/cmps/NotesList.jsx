import React from 'react'
import { Loader } from './Loader'
export function NotesList({ notes, onNoteSelect, currNote }) {
    if (!notes) return <Loader />
    return (
        <ul className="notes-list">
            {notes.map(note => (
                <li
                    style={{
                        color: currNote && currNote._id === note._id ? '#f1f1f2eb' : '#f1f1f252',
                        fontWeight: currNote && currNote._id === note._id ? '700' : '400'
                    }}
                    key={note._id}
                    onClick={() => {
                        onNoteSelect(note)
                    }}>
                    {note.title}
                </li>
            )
            )}
        </ul>
    )

}
