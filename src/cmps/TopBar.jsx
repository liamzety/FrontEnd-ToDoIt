import React from 'react'
import { BsCircleFill } from 'react-icons/bs'
import ContentEditable from 'react-contenteditable'

export function TopBar({ onLogOut, currNote, onUpdateNote, isUnsaved, onRemoveNote, onNoteChange }) {

    return (
        <div className="topbar flex align-center space-between">
            {
                currNote &&
                <>
                    <div className="title flex align-center">
                        <BsCircleFill style={{ opacity: isUnsaved ? '1' : '0' }} />
                        <div className="header-container">
                            <ContentEditable
                                className="header"
                                html={currNote.title}
                                onChange={(ev) => { onNoteChange('title', ev.target.value) }}
                                tagName='h2'
                            />
                        </div>

                    </div>
                </>
            }
            <div className="actions">
                {currNote && <>
                    <button onClick={onUpdateNote}>save</button>
                    <button onClick={onRemoveNote}>remove</button>
                </>}
                <button onClick={onLogOut}>LOGOUT</button>
            </div>
        </div>
    )
}
