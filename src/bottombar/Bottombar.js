import React, { useState, useRef } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './bottombar.scss'

// later get the react router

import Sidebar from './sidebar/Sidebar'
import SettingsModal from './settingsModal/SettingsModal'
import Home from './home/Home'
import Today from './today/Today'
import ThisWeek from './thisWeek/ThisWeek'
import ThisMonth from './thisMonth/ThisMonth'
import ThisYear from './thisYear/ThisYear'
import Notes from './notes/Notes'
import FolderView from './folderView/FolderView'
import UpdateNoteModal from './updateNoteModal/UpdateNoteModal'
import UpdateFolderModal from './updateFolderModal/UpdateFolderModal'

export default function Bottombar({ openMenu, openUpdateNoteModal, setOpenUpdateNoteModal, openUpdateFolderModal, setOpenUpdateFolderModal, notesModalTitleRef, notesModalContentRef, handleNotesHTML, folderModalTitleRef}) {
    // handles the display of the settings modal
    const [displaySettingsModal, setDisplaySettingsModal] = useState(false)

    // references the background of the div for the notes update
    const exitUpdateNoteModal = useRef() 

    // reference the background of the div for the folder update
    const exitUpdateFolderModal = useRef()

    // checks if the update note modal should be closed
    function updateOpenUpdateNoteModal(e) { 
        const targetClassName = e.target.className;

        if (targetClassName === exitUpdateNoteModal.current.className) { 
            setOpenUpdateNoteModal(false)
        }
    }

    // checks if the update folder moal should be closed
    function updateOpenUpdateFolderModal(e) { 
        const targetClassName = e.target.className;

        if (targetClassName === exitUpdateFolderModal.current.className) { 
            setOpenUpdateFolderModal(false)
        }
    }

    return ( 
        <Router>
            <div className='bottombar-region__container'>
                <div className={'container__sidebar' + (openMenu ? ' active' : '')}>
                    <Sidebar setDisplaySettingsModal={ setDisplaySettingsModal }/>
                </div>
                <div className='container__main-view'>
                    <Switch>
                        <Route exact path='/' component={ Home }/>
                        <Route exact path='/today' component={ Today }/>
                        <Route exact path='/this-week' component={ ThisWeek }/>
                        <Route exact path='/this-month' component={ ThisMonth }/>
                        <Route exact path='/this-year' component={ ThisYear }/>
                        <Route exact path='/notes'> <Notes setOpenUpdateNoteModal={ setOpenUpdateNoteModal } notesModalTitleRef={ notesModalTitleRef } notesModalContentRef={ notesModalContentRef } handleNotesHTML={ handleNotesHTML } folderModalTitleRef={ folderModalTitleRef } setOpenUpdateFolderModal={ setOpenUpdateFolderModal }/> </Route>
                        <Route path='/notes/folder'> <FolderView /> </Route>
                    </Switch>
                </div>
                <div className={'container__settings-modal-container' + (displaySettingsModal ? ' active' : '')}>
                    <div className='settings-modal-container__settings-modal'>
                        <SettingsModal setDisplaySettingsModal={ setDisplaySettingsModal }/>
                    </div>
                </div>  
                <div ref={ exitUpdateNoteModal } onClick={ updateOpenUpdateNoteModal } className={'container__update-note-modal-container' + (openUpdateNoteModal ? ' active' : '')}>
                    <div className='update-note-modal-container__update-note-modal'>
                        <UpdateNoteModal notesModalTitleRef={ notesModalTitleRef } notesModalContentRef={ notesModalContentRef } handleNotesHTML={ handleNotesHTML }/>
                    </div>
                </div>
                <div ref={ exitUpdateFolderModal } onClick={ updateOpenUpdateFolderModal } className={'container__update-folder-modal-container' + (openUpdateFolderModal ? ' active' : '')}>
                    <div className='update-folder-modal-container__update-folder-modal'>
                        <UpdateFolderModal folderModalTitleRef={ folderModalTitleRef }/>
                    </div>
                </div>
            </div>
        </Router>
    )
}
