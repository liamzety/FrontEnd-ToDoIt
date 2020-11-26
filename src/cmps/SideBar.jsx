import React from 'react'
import { NotesList } from './NotesList'
import { AiOutlineFolderAdd } from 'react-icons/ai'

export function SideBar({ onRemoveNote, notes, onNoteSelect, onAddNote, currNote }) {
    return (
        <div className="sidebar flex align-center col w100">
            <div className="placeholder">

            </div>
            <AiOutlineFolderAdd onClick={onAddNote} />
            <NotesList
                currNote={currNote}
                notes={notes}
                onNoteSelect={onNoteSelect}
                onRemoveNote={onRemoveNote} />
        </div>
    )
}
