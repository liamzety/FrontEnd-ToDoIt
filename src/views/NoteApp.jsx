import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addNote, updateNote, removeNote } from "../store/actions/noteActions";
import { loadUser, logout, updatePrefs } from '../store/actions/userActions';
import { SideBar } from '../cmps/SideBar';
import { TopBar } from '../cmps/TopBar';
import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import * as Editor from 'ckeditor5-custom-build/build/ckeditor';
import ResizePanel from "react-resize-panel";

// 
export function NoteApp({ history }) {
  const dispatch = useDispatch();
  //GLOBAL STATE
  const { loggedUser } = useSelector((state) => state.userReducer);
  //LOCAL STATE
  const [defaultNote, setDefaultNote] = useState(null)
  const [currNote, setCurrNote] = useState(null)
  const [isUnsaved, setisUnsaved] = useState(false)

  //If user is not logged then move to home
  useEffect(() => {
    if (!loggedUser) history.push("/")
    else {
      dispatch(loadUser(loggedUser._id))
      _setNotes(loggedUser.notes[loggedUser.notes.length - 1])
    }
  }, [])

  //Detect changes, if changes were made show unsaved icon
  useEffect(() => {
    if (defaultNote && (defaultNote.body !== currNote.body || defaultNote.title !== currNote.title)) {
      setisUnsaved(true)
    } else setisUnsaved(false)
  }, [currNote, defaultNote])

  //Listen to window key presses
  useEffect(() => {
    window.addEventListener("keydown", onWindowKey);
    return () => window.removeEventListener("keydown", onWindowKey);
  });

  //On logged user note length change AKA remove,add - reload and set notes.
  useEffect(() => {
    if (!loggedUser) return
    _setNotes(loggedUser.notes[loggedUser.notes.length - 1] || null)
  }, [loggedUser && loggedUser.notes.length])

  //if window key Ctrl+S then save curr note
  function onWindowKey(ev) {
    if (ev.ctrlKey && (ev.key.toLowerCase() === 's' || ev.key === 'ד')) {
      ev.preventDefault()
      onUpdateNote(currNote)
    }
  }

  //---------------CRUD-----------------
  function onAddNote() {
    dispatch(addNote(loggedUser))
  }
  function onRemoveNote() {
    dispatch(removeNote(currNote._id, loggedUser))
    _setNotes(loggedUser.notes[loggedUser.notes.length - 1] || null)
  }
  function onUpdateNote() {
    dispatch(updateNote(currNote, loggedUser))
    setDefaultNote(currNote)
  }

  //--------------------------------
  async function onLogOut() {
    await dispatch(logout())
    history.push("/")
  }
  function onNoteSelect(note) {
    _setNotes(note)
  }
  function onNoteChange(type, content) {
    setCurrNote(prevState => {
      return {
        ...prevState,
        //Regex to avoid line breaks and tags showing in NotesList
        [type]: type === 'title' ? content.replace(/<div>|<br>/g, '') : content
      }
    })
  }
  function _setNotes(note) {
    setDefaultNote(note)
    setCurrNote(note)
  }

  function toggleSidebar() {
    dispatch(updatePrefs({ isSidebar: !loggedUser.prefs.isSidebar }, loggedUser))
  }



  if (!loggedUser) {
    return <h1>Loading...</h1>
  }

  return (
    <section className="note-app flex">
      <div style={{ display: loggedUser.prefs.isSidebar ? 'flex' : 'none' }}>
        {/* That wrapper is for the custom handle, needs a relative */}
        <div className="col-left-wrapper relative">
          <ResizePanel
            direction="e"
            handleClass="customHandle"
            borderClass="customResizeBorder"
          >
            <div className='col-left flex'>
              <SideBar
                notes={loggedUser.notes}
                onNoteSelect={onNoteSelect}
                onAddNote={onAddNote}
                currNote={currNote}
                isUnsaved={isUnsaved}
                onUpdateNote={onUpdateNote}
              />
            </div>
          </ResizePanel>
        </div>
      </div>
      <div className="col-right col flex ">
        <TopBar
          onNoteChange={onNoteChange}
          currNote={currNote}
          onRemoveNote={onRemoveNote}
          onLogOut={onLogOut}
          isSidebar={loggedUser.prefs.isSidebar}
          toggleSidebar={toggleSidebar}
          isUnsaved={isUnsaved}
          onUpdateNote={onUpdateNote} />

        {currNote && loggedUser.notes.length !== 0 ?
          <CKEditor
            editor={Editor}
            data={currNote.body}
            config={{

              toolbar: [
                'heading',
                '|',
                'bold',
                'underline',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                'todoList',
                'alignment',
                '|',
                'fontColor',
                'fontSize',
                'highlight',
                '|',
                'blockQuote',
                'codeBlock',
                '|',
                'undo',
                'redo',
                '|'
              ],
              placeholder: 'Write your ideas here!',
            }}

            onChange={(event, editor) => {
              const content = editor.getData();
              onNoteChange('body', content)
            }}
          />
          :
          <div className="no-notes flex align-center justify-center">
            <h1>No notes found!</h1>
          </div>
        }

      </div>
    </section>
  );
}



