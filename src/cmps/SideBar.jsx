import React from 'react'
import { NotesList } from './NotesList'

export function SideBar({ onRemoveNote, notes, onNoteSelect, onAddNote }) {
    return (
        <div className="sidebar flex align-center col w100">
            <div className="placeholder">

            </div>
            <button onClick={onAddNote}>add</button>
            <NotesList
                notes={notes}
                onNoteSelect={onNoteSelect}
                onRemoveNote={onRemoveNote} />
        </div>
    )
}
