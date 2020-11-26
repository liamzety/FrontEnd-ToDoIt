import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addNote, updateNote, removeNote } from "../store/actions/noteActions";
import { loadUser, logout } from '../store/actions/userActions';
import { SideBar } from '../cmps/SideBar';
import { TopBar } from '../cmps/TopBar';
import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
        [type]: content
      }
    })
  }
  function _setNotes(note) {
    setDefaultNote(note)
    setCurrNote(note)
  }



  if (!loggedUser) {
    return <h1>Loading...</h1>
  }
  return (
    <section className="note-app flex">
      <div className="col-left flex">
        <SideBar
          notes={loggedUser.notes}
          onNoteSelect={onNoteSelect}
          onAddNote={onAddNote}
          currNote={currNote}
        />
      </div>

      <div className="col-right col flex ">
        <TopBar
          onNoteChange={onNoteChange}
          isUnsaved={isUnsaved}
          currNote={currNote}
          user={loggedUser}
          onUpdateNote={onUpdateNote}
          onRemoveNote={onRemoveNote}
          onLogOut={onLogOut} />

        {currNote && loggedUser.notes.length !== 0 ?
          <CKEditor
            editor={ClassicEditor}
            data={currNote.body}
            config={{
              removePlugins: ['MediaEmbed', 'ImageUpload'],
              placeholder: 'Write your ideas here!',
              uiColor: '#66AB16'
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



