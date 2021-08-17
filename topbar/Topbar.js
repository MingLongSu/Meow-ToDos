// Import react components
import React, { useState, useRef } from 'react'

// Importing styles
import './topbar.scss'

// Importing objects
import OpenMenu from './openMenu/OpenMenu'
import AppTitle from './appTitle/AppTitle' 
import CompanyDisplay from './companyDisplay/CompanyDisplay'
import localStorageAPI from '../localStorageAPI'

export default function Topbar({ openMenu, setOpenMenu, setOpenUpdateNoteModal, setOpenUpdateFolderModal, selectedNote, setSelectedNote, notesModalTitleRef, notesModalContentRef, folderModalTitleRef }) {
    const [openBag, setOpenBag] = useState(false)
    const bag = useRef()

    function updateOpenBag() { 
        setOpenBag(prevState => !prevState)
    }

    function updateBag(e) { 
        window.addEventListener('mousemove', moveBag)
        window.addEventListener('mouseup', endBag)

        let prevX = e.clientX
        let prevY = e.clientY

        function moveBag(e) { 
            let newX = prevX - e.clientX
            let newY = prevY - e.clientY

            const draggableBag = bag.current.getBoundingClientRect()

            bag.current.style.left = `${draggableBag.left - newX}px`
            bag.current.style.top = `${draggableBag.top - newY}px` 

            prevX = e.clientX; 
            prevY = e.clientY;
        }

        function endBag() { 
            window.removeEventListener('mousemove', moveBag)
            window.removeEventListener('mouseup', endBag)
        }
    }

    // updates the value for opening the note's modal
    function updateOpenUpdateNoteModal() { 
        // Opening the modal
        setOpenUpdateNoteModal(true)

        // adding a new note
        onNoteAdd()
    }

    // Creates a new note object to be stored
    function onNoteAdd() { 
        const noteToSave = {
            id: Math.floor(Math.random() * 1000),
            edits: 0
        }

        notesModalTitleRef.current.dataset.selectedNoteId = noteToSave.id
        notesModalContentRef.current.dataset.selectedNoteId = noteToSave.id

        localStorageAPI.saveNote(noteToSave)
    }

    // updates the value for opening the note's modal
    function updateOpenUpdateFolderModal() { 
        setOpenUpdateFolderModal(true)

        onFolderAdd()
    }

    function onFolderAdd() { 
        const folderToSave = { 
            id: Math.floor(Math.random() * 1000),
            notes: []
        }

        folderModalTitleRef.current.dataset.selectedFolder = folderToSave.id

        localStorageAPI.saveFolder(folderToSave)
    }

    return (
        <div className='topbar-region__container'>
            <div ref={ bag } onMouseDown={ updateBag } className={'notes-view__bag-contents' + (openBag === true ? ' active' : '')}>
                <div onDoubleClick={ updateOpenBag } className={'bag-contents__bag-exterior' + (openBag === true ? ' active' : '')}>
                    <div className='bag-exterior__symbol'>
                        <div className='symbol__add'>
                            <div className='add__line-1'></div>
                            <div className='add__line-2-container'>
                                <div className={'line-2-container__line-2' + (openBag === true ? ' active' : '')}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bag-contents__contents-container'>
                    <div onClick={ updateOpenUpdateNoteModal } className='content-container__note-background' id='content-containers__content-backgrounds'>
                        <i className="fas fa-sticky-note note-background__note-svg" id='content-backgrounds__svgs'></i>
                    </div>
                    <div onClick={ updateOpenUpdateFolderModal } className='content-container__folder-background' id='content-containers__content-backgrounds'>
                        <i className="fas fa-folder folder-background__folder-svg" id='content-backgrounds__svgs'></i>
                    </div>
                </div>
            </div>
            <div className='container__open-menu'>
                <OpenMenu openMenu={ openMenu } setOpenMenu={ setOpenMenu }/>
            </div>
            <div className='container__app-title'>
                <AppTitle />
            </div>
            <div className='container__company-display'>
                <CompanyDisplay />
            </div>
        </div>
    )
}
