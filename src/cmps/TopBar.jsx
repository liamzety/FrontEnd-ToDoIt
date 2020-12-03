import React, { useState } from 'react'
//React icons
import { HiDotsHorizontal } from 'react-icons/hi'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { CgLogOut } from 'react-icons/cg'
import { BsListUl } from 'react-icons/bs'
//React animations
import { fadeOut, zoomIn } from 'react-animations';
import { css, StyleSheet } from 'aphrodite';

import ContentEditable from 'react-contenteditable'
import logo_sm from '../assets/img/logo_sm.png'
import logo_sm_on from '../assets/img/logo_sm_on.png'

export function TopBar(props) {
    const { onLogOut,
        currNote,
        onRemoveNote,
        onNoteChange,
        toggleSidebar,
        isSidebar,
        isUnsaved,
        onUpdateNote } = props

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
            {!isSidebar &&
                <div onClick={onUpdateNote} data-title='Save Note' className="logo-container relative">
                    <img style={{ opacity: isUnsaved ? '0' : '1' }} src={logo_sm} alt="logo" />
                    <img className="absolute" style={{ opacity: isUnsaved ? '1' : '0' }} src={logo_sm_on} alt="logo_unsaved" />
                </div>
            }
            {
                currNote &&
                <div className="title-container">
                    <ContentEditable
                        className="title"
                        html={currNote.title}
                        onChange={(ev) => {
                            onNoteChange('title', ev.target.value)
                        }}
                        tagName='h2'
                    />
                </div>
            }
            <div className="actions relative align-center justify-center">
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
                                    className="action flex align-center"
                                    onClick={ev => {
                                        toggleSidebar()
                                        handleModal()
                                    }}>
                                    <BsListUl />Toggle Left Bar
                                 </div>

                                <div className="action flex align-center">
                                    <button className="progressier-install-button">Install The App!</button>
                                </div>
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
