import React from 'react'
import { NotesList } from './NotesList'
import { AiOutlineFolderAdd } from 'react-icons/ai'
import logo_sm from '../assets/img/logo_sm.png'
import logo_sm_on from '../assets/img/logo_sm_on.png'
import { mobileService } from '../services/mobileService'

export function SideBar({ onUpdateNote, onRemoveNote, notes, onNoteSelect, onAddNote, currNote, isUnsaved }) {
    return (
        <div className="sidebar flex align-center col w100">
            <div onClick={onUpdateNote} data-title={mobileService.handleTooltip('Save Note')} className="logo-container relative">
                <img style={{ opacity: isUnsaved ? '0' : '1' }} src={logo_sm} alt="logo" />
                <img className="absolute" style={{ opacity: isUnsaved ? '1' : '0' }} src={logo_sm_on} alt="logo_unsaved" />
            </div>
            <div className="add-note-container flex justify-center align-center" data-title={mobileService.handleTooltip('Add Note')}>
                <AiOutlineFolderAdd onClick={onAddNote} />
            </div>
            <NotesList
                currNote={currNote}
                notes={notes}
                onNoteSelect={onNoteSelect}
                onRemoveNote={onRemoveNote} />
        </div>
    )
}
