import React from 'react'
import { ImWarning } from 'react-icons/im';

export function MsgModal({ msg }) {
    return (
        <div className={`${msg ? 'show-msg' : 'hide-msg'} msg-modal`}>
            <div className="icon-container flex align-center justify-center">
                <ImWarning />
            </div>
            <div className="msg-container flex align-center justify-center">
                <p>{msg}</p>
            </div>
        </div>
    )
}
