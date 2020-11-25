import React, { useState } from 'react'
import { Loader } from './Loader'
export function NotesList({ notes, onNoteSelect, currNote }) {
    if (!notes) return <Loader />
    return (
        <ul className="notes-list">
            {notes.map(note => {
                return (
                    <li
                        style={{
                            color: currNote && currNote._id === note._id ? '#00adb5' : '#eeeeee',
                            fontWeight: currNote && currNote._id === note._id ? '700' : '400'
                        }}
                        key={note._id}
                        onClick={() => {
                            onNoteSelect(note)
                        }}>
                        {note.title}
                    </li>
                )
            })}
        </ul>
    )

}
