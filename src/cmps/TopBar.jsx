import React, { useState } from 'react'
//React icons
import { BsCircleFill } from 'react-icons/bs'
import { HiDotsHorizontal } from 'react-icons/hi'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { CgLogOut } from 'react-icons/cg'
import { VscSaveAs, VscSave } from 'react-icons/vsc'

import ContentEditable from 'react-contenteditable'

export function TopBar({ onLogOut, currNote, onUpdateNote, isUnsaved, onRemoveNote, onNoteChange }) {

    const [isActionModal, setIsActionModal] = useState(false)

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
            <div className="actions relative">
                <HiDotsHorizontal
                    style={{ transform: isActionModal ? 'rotate(0)' : 'rotate(90deg)' }}
                    onClick={() => { setIsActionModal(prevSt => !prevSt) }} />
                {
                    isActionModal &&
                    <div className="actions-modal absolute flex justify-center col">
                        {currNote &&
                            <>
                                <div style={{ fontWeight: isUnsaved ? '700' : '400' }}
                                    className="action flex align-center"
                                    onClick={onUpdateNote}>
                                    {isUnsaved ? <VscSaveAs /> : <VscSave />}
                                   Save Note
                                   </div>

                                <div className="action flex align-center"
                                    onClick={onRemoveNote}>
                                    <RiDeleteBin2Line />
                                  Delete Note
                                  </div>
                            </>
                        }
                        <div className="action flex align-center" onClick={onLogOut}><CgLogOut /> Logout</div>
                    </div>
                }
            </div>
        </div>
    )
}
