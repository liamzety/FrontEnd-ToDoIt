import React, { useState } from 'react'
//React icons
import { HiDotsHorizontal } from 'react-icons/hi'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { CgLogOut } from 'react-icons/cg'
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
    function handleModal(ev) {
        if (ev) ev.persist()

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
                //onLogOut() is placed here to avoid memory leak
                //(ending the cmp life b4 settimeout is over)
                if (ev && ev.target.dataset.action === 'logout') onLogOut()

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
                <div className="title-container">
                    <ContentEditable
                        className="title"
                        html={currNote.title}
                        onChange={(ev) => { onNoteChange('title', ev.target.value) }}
                        tagName='h2'
                    />
                </div>
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
                                    data-action='logout'
                                    className="action flex align-center"
                                    onClick={ev => {
                                        handleModal(ev)
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
