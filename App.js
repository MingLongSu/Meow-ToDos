// React hooks and etc...
import React, { useState, useRef } from 'react'

// Styles
import './app.scss'

// Importing objects
import Topbar from './topbar/Topbar'
import Bottombar from './bottombar/Bottombar';
import notesHTML from './notesHTML'

function App() {
  // Handles instance actions on a note
  const handleNotesHTML = new notesHTML()

  // Requirements TOPBAR //
  // handles opening the side bar menu 
  const [openMenu, setOpenMenu] = useState(true)

  // handles opening the note update/edit/create modal
  const [openUpdateNoteModal, setOpenUpdateNoteModal] = useState(false)

  // handles opening the folder upate/edit/create modal
  const [openUpdateFolderModal, setOpenUpdateFolderModal] = useState(false)

  // handles opening the event update/edit modal
  const [openUpdateEventModal, setOpenUpdateEventModal] = useState(false)

  // handles the currently selected note
  const [selectedNote, setSelectedNote] = useState()//localStorageAPI.getAllNotes()[0] || undefined)

  // references to the title and content areas of the notes modal
  const notesModalTitleRef = useRef() 
  const notesModalContentRef = useRef() 

  // references the title area of the folders modal
  const folderModalTitleRef = useRef()

  // Requirements BOTTOMBAR //
  // SIDE BAR MUST HAVE COMPONENTS FOR WHICH WILL REACT TO ONCLICK EVENTS TO LOAD APPROPRIATE DISPLAY (TODAY, THIS WEEK, THIS MONTH, THIS YEAR, ETC...)
  
  // SIDE BAR COMPONENTS WILL REACT TO ONCLICK EVENTS BY CHANGEING THE CURRENT STATE OF THE VIEW (IN MAIN VIEW)
  // EACH LIST-ITEM MUST REACT TO ONCLICK

  // EACH LIST-ITEM MUST REACT TO BEING THE ACTIVE TAB (USESTATE)
  
  handleNotesHTML.setActiveNote()

  return (
    <div id="app">
      <div className='topbar-region'>
        <Topbar openMenu={ openMenu } setOpenMenu={ setOpenMenu } setOpenUpdateNoteModal={ setOpenUpdateNoteModal } setOpenUpdateFolderModal={ setOpenUpdateFolderModal } selectedNote={ selectedNote } setSelectedNote={ setSelectedNote } notesModalTitleRef={ notesModalTitleRef } notesModalContentRef={ notesModalContentRef } folderModalTitleRef={ folderModalTitleRef }/>
      </div>
      <div className='bottombar-region'>
        <Bottombar openMenu={ openMenu } openUpdateNoteModal={ openUpdateNoteModal } setOpenUpdateNoteModal={ setOpenUpdateNoteModal } openUpdateFolderModal={ openUpdateFolderModal } setOpenUpdateFolderModal={ setOpenUpdateFolderModal } notesModalTitleRef={ notesModalTitleRef } notesModalContentRef={ notesModalContentRef } handleNotesHTML={ handleNotesHTML } folderModalTitleRef={ folderModalTitleRef } openUpdateEventModal={ openUpdateEventModal } setOpenUpdateEventModal={ setOpenUpdateEventModal }/>
      </div>
    </div>
  );
}

export default App;
