import React, { useState } from 'react'
//React icons
import { BsCircleFill } from 'react-icons/bs'
import { HiDotsHorizontal } from 'react-icons/hi'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { CgLogOut } from 'react-icons/cg'
import { VscSaveAs, VscSave } from 'react-icons/vsc'
//React animations
import { fadeOut, zoomIn } from 'react-animations';
import { css, StyleSheet } from 'aphrodite';

import ContentEditable from 'react-contenteditable'

export function TopBar({ onLogOut, currNote, onUpdateNote, isUnsaved, onRemoveNote, onNoteChange }) {

    const [actionModal, setActionModal] = useState({ isOn: false, isWaitingAnimation: false })
    const styles = StyleSheet.create({
        zoomIn: {
            animationName: zoomIn,
            animationDuration: '.3s'
        },
        fadeOut: {
            animationName: fadeOut,
            animationDuration: '.3s'
        },
    })
    function handleModal() {
        setActionModal(prevSt => {
            return {
                ...prevSt,
                isWaitingAnimation: !prevSt.isWaitingAnimation
            }
        })
        if (actionModal.isOn) {
            setTimeout(() => {
                setActionModal(prevSt => {
                    return {
                        ...prevSt,
                        isOn: !prevSt.isOn
                    }
                })
                //100 ms less to avoid popping
            }, 200)
        } else {
            setActionModal(prevSt => {
                return {
                    ...prevSt,
                    isOn: !prevSt.isOn
                }
            })
        }
    }
    return (
        <div className="topbar flex align-center space-between">
            {
                currNote &&
                <>
                    <div className="title flex align-center">
                        <BsCircleFill style={{
                            opacity: isUnsaved ? '1' : '0'
                            , cursor: 'default'
                        }} />
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
                    style={{ transform: actionModal.isWaitingAnimation ? 'rotate(0)' : 'rotate(90deg)' }}
                    onClick={handleModal} />
                {
                    actionModal.isOn &&
                    <>
                        <div className={`${actionModal.isWaitingAnimation ? css(styles.zoomIn) : css(styles.fadeOut)} actions-modal absolute`}>
                            <div className="action-modal-container flex justify-center col">
                                {currNote &&
                                    <>
                                        <div style={{ fontWeight: isUnsaved ? '700' : '400', color: isUnsaved ? '#079688' : '#f1f1f2eb' }}
                                            className="action flex align-center"
                                            onClick={() => {
                                                onUpdateNote()
                                                handleModal()
                                            }}>
                                            {isUnsaved ? <VscSaveAs style={{ color: '#079688' }} /> : <VscSave />}
                                   Save Note
                                   </div>

                                        <div className="action flex align-center"
                                            onClick={() => {
                                                onRemoveNote()
                                                handleModal()
                                            }}>
                                            <RiDeleteBin2Line />
                                  Delete Note
                                  </div>
                                    </>
                                }
                                <div
                                    className="action flex align-center"
                                    onClick={() => {
                                        onLogOut()
                                        handleModal()
                                    }}>
                                    <CgLogOut />Logout
                                 </div>
                            </div>
                        </div>
                        <div onClick={handleModal} className="screen-modal"></div>
                    </>
                }
            </div>
        </div>
    )
}
