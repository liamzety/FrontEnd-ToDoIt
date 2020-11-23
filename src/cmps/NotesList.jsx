import React from 'react'
import { useEffect } from 'react'
import { Loader } from './Loader'
import { NotePreview } from './NotePreview'
export function NotesList({ notes, onUpdateNote, onRemoveNote }) {
    if (!notes || notes.length === 0) return <Loader />
    return (
        <section className="notes-list">
            {notes.map(note => {
                return (
                    <NotePreview
                        key={note._id}
                        note={note}
                        onUpdateNote={onUpdateNote}
                        onRemoveNote={onRemoveNote}
                    />
                )
            })}
        </section>
    )

}
