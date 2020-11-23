import React, { useEffect } from 'react'

export function TopBar({ user, onLogOut, currNote, onUpdateNote, isUnsaved, onRemoveNote }) {

    return (
        <div className="topbar flex align-center space-between">

            <p style={{ opacity: isUnsaved ? '1' : '0' }}>save</p>
            {
                currNote &&
                <>
                    <h1> {currNote.title}</h1>
                    <div className="actions">
                        <button onClick={onUpdateNote}>save</button>
                        <button onClick={onRemoveNote}>remove</button>
                        <button onClick={onLogOut}>LOGOUT</button>
                    </div>
                </>
            }
        </div>
    )
}
