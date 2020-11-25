import React from 'react'
import { BsCircleFill } from 'react-icons/bs'
import ContentEditable from 'react-contenteditable'

export function TopBar({ user, onLogOut, currNote, onUpdateNote, isUnsaved, onRemoveNote, onNoteChange }) {

    return (
        <div className="topbar flex align-center space-between">
            {
                currNote &&
                <>
                    <div className="title flex align-center">
                        <BsCircleFill style={{ opacity: isUnsaved ? '1' : '0' }} />
                        {/* <h1> {currNote.title}</h1> */}

                        <ContentEditable
                            html={currNote.title} // innerHTML of the editable div
                            disabled={false}       // use true to disable editing
                            // innerRef={this.contentEditable}
                            onChange={(ev) => { onNoteChange('title', ev.target.value) }} // handle innerHTML change
                            tagName='h2' // Use a custom HTML tag (uses a div by default)
                        />

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
