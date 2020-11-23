import React, { useEffect, useState } from 'react'

export function NotePreview({ note, onRemoveNote, onUpdateNote }) {
    const [noteToUpdate, setNoteToUpdate] = useState(note)
    useEffect(() => {

    }, [note])

    function onUpdateInp(ev) {
        setNoteToUpdate({
            ...noteToUpdate,
            [ev.target.name]: ev.target.value
        })
    }
    return (
        <div className="note-preview">
            <p>{note.title}</p>
            <button onClick={() => onRemoveNote(note._id)}>Remove</button>
            <form onSubmit={ev => {
                ev.preventDefault()
                onUpdateNote(noteToUpdate)
            }}>
                <input value={noteToUpdate.title} name="title" onChange={onUpdateInp} type="text" />
                <input value={noteToUpdate.body} name="body" onChange={onUpdateInp} type="text" />
                <button>Save</button>
            </form>
        </div>
    )
}
