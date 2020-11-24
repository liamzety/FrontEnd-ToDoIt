import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UserLog } from '../cmps/UserLog'
import { login } from '../store/actions/userActions';

export function UserLogin({ history }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionStorage.user) history.push("/notes")

    window.addEventListener('beforeinstallprompt', ev => {
      console.log('beforeinstallprompt has fired', ev);
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      ev.preventDefault();
      // Stash the event so it can be triggered later.
      window.deferredPrompt = ev;
      console.log('ready to add',)
    });
    // this event fires only when app is installed
    window.addEventListener('appinstalled', evt => {
      console.log('App was successfully installed');
      console.log('installed!',)
    });

  }, [])


  function addToHome() {
    console.log('window:', window)
    // Show the prompt
    let { deferredPrompt } = window;
    if (deferredPrompt) {
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
    }
  }

  function openWindowOrTab(url = window.location.href) {
    window.open(url, '_blank');
  }

  //User

  async function onLogin(userToLog) {
    if (!userToLog) return
    try {
      await dispatch(login(userToLog))
      history.push("/notes")
    } catch (error) {
      console.log('Err:', error)
    }
  }

  return (
    <section className="user-login flex justify-center align-center">
      <button onClick={addToHome}>
        Add to Home Screen
</button>
      <div className="col-left flex justify-center align-center">
        <UserLog onLogin={onLogin} />

      </div>
      <div className="col-right flex justify-center align-center relative">
        <div className="col-right-wrapper absolute"></div>
      </div>
    </section>
  )
}
