import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserLog } from '../cmps/UserLog'
import { login } from '../store/actions/userActions';
import loader from '../assets/img/loader.gif';
import { ImWarning } from 'react-icons/im';

export function UserLogin({ history }) {
  const dispatch = useDispatch();
  const [isLoadingModal, setIsLoadingModal] = useState(false)
  const { msg } = useSelector(state => state.msgReducer)

  useEffect(() => {
    if (sessionStorage.user) history.push("/notes")
    window.addEventListener("keydown", onWindowKey);
    return () => window.removeEventListener("keydown", onWindowKey);
  }, [])

  //My super doper secret shortcut
  function onWindowKey(ev) {
    if (ev.ctrlKey && (ev.key === '1')) {
      ev.preventDefault()
      onLogin({ username: 'liam', password: '1' })
    }
  }


  async function onLogin(userToLog) {
    setIsLoadingModal(true)
    if (!userToLog) return
    try {
      await dispatch(login(userToLog))
      history.push("/notes")
    } catch (error) {
      setIsLoadingModal(false)
      console.log('Err:', error)
    }
  }

  return (
    <section className="user-login flex justify-center align-center">
      <div className="col-left flex justify-center align-center">
        <UserLog isLoadingModal={isLoadingModal} onLogin={onLogin} />

      </div>
      <div className="col-right flex justify-center align-center relative">
        {
          isLoadingModal &&
          <div className="loading-modal flex align-center justify-center fixed">
            <img src={loader} alt="" />
          </div>
        }
        <div className="col-right-wrapper absolute"></div>
      </div>
      <div className={`${msg ? 'show-msg' : 'hide-msg'} msg-modal`}>
        <div className="icon-container flex align-center justify-center">
          <ImWarning />
        </div>
        <div className="msg-container flex align-center justify-center">
          <p>{msg}</p>
        </div>
      </div>
    </section>
  )
}
