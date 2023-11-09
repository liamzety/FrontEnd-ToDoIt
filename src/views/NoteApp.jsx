import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, updateNote, removeNote } from "../store/actions/noteActions";
import { loadUser, logout, updatePrefs } from "../store/actions/userActions";
import { SideBar } from "../cmps/SideBar";
import { TopBar } from "../cmps/TopBar";
import { useState } from "react";
import ResizePanel from "react-resize-panel";
import loader from "../assets/img/loader.gif";
import { Editor } from "@tinymce/tinymce-react";

//
export function NoteApp({ history }) {
  const dispatch = useDispatch();
  //GLOBAL STATE
  const { loggedUser } = useSelector((state) => state.userReducer);
  //LOCAL STATE
  const [defaultNote, setDefaultNote] = useState(null);
  const [currNote, setCurrNote] = useState(null);
  const [isUnsaved, setisUnsaved] = useState(false);

  const handleUserReturn = useCallback(() => {
    dispatch(loadUser(_getCookie("userId")));
  }, [dispatch]);

  //If user is not logged then move to home
  useEffect(() => {
    if (_getCookie("userId")) {
      handleUserReturn();
    } else history.push("/");
  }, [handleUserReturn, history]);

  //Detect changes, if changes were made show unsaved icon
  useEffect(() => {
    if (
      defaultNote &&
      (defaultNote.body !== currNote.body ||
        defaultNote.title !== currNote.title)
    ) {
      setisUnsaved(true);
    } else setisUnsaved(false);
  }, [currNote, defaultNote]);

  //Listen to window key presses
  useEffect(() => {
    window.addEventListener("keydown", onWindowKey);
    return () => window.removeEventListener("keydown", onWindowKey);
  });

  const loggedUserNotesLength = loggedUser?.notes.length;
  //On logged user note length change AKA remove,add - reload and set notes.
  useEffect(() => {
    if (!loggedUser) return;
    _setNotes(loggedUser.notes[0] || null);
  }, [loggedUserNotesLength]);

  //if window key Ctrl+S then save curr note
  function onWindowKey(ev) {
    if (ev.ctrlKey && ev.keyCode === 83) {
      ev.preventDefault();
      onUpdateNote(currNote);
    }
  }

  //---------------CRUD-----------------
  function onAddNote() {
    dispatch(addNote(loggedUser));
  }
  function onRemoveNote() {
    dispatch(removeNote(currNote._id, loggedUser));
  }
  function onUpdateNote() {
    dispatch(updateNote(currNote, loggedUser));
    setDefaultNote(currNote);
  }

  //--------------------------------
  async function onLogOut() {
    await dispatch(logout());
    history.push("/");
  }
  function onNoteSelect(note) {
    _setNotes(note);
  }
  function onNoteChange(type, content) {
    setCurrNote((prevState) => {
      return {
        ...prevState,
        //Regex to avoid line breaks and tags showing in NotesList
        [type]: type === "title" ? content.replace(/<div>|<br>/g, "") : content,
      };
    });
  }
  function _setNotes(note) {
    setDefaultNote(note);
    setCurrNote(note);
  }

  function toggleSidebar() {
    dispatch(
      updatePrefs({ isSidebar: !loggedUser.prefs.isSidebar }, loggedUser)
    );
  }

  function _getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  if (!loggedUser) {
    return (
      <div className="note-app loading-modal flex align-center justify-center fixed">
        <img src={loader} alt="" />
      </div>
    );
  }

  return (
    <section className="note-app flex">
      <div style={{ display: loggedUser.prefs.isSidebar ? "flex" : "none" }}>
        {/* That wrapper is for the custom handle, needs a relative */}
        <div className="col-left-wrapper relative">
          <ResizePanel
            direction="e"
            handleClass="customHandle"
            borderClass="customResizeBorder"
          >
            <div className="col-left flex">
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
          onUpdateNote={onUpdateNote}
        />

        {currNote && loggedUser.notes.length !== 0 ? (
          <Editor
            apiKey="ojr8kyrdao1epgru7tx9sbn269gfzulz7kq5qzh5vteebcnt"
            init={{
              plugins:
                "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
              ai_request: (request, respondWith) =>
                respondWith.string(() =>
                  Promise.reject("See docs to implement AI Assistant")
                ),
            }}
            value={currNote.body}
            onEditorChange={(val) => {
              onNoteChange("body", val);
            }}
          />
        ) : (
          <div className="no-notes flex align-center justify-center">
            <h1>No notes found!</h1>
          </div>
        )}
      </div>
    </section>
  );
}
