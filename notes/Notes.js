import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import localStorageAPI from '../../localStorageAPI'

import './notes.scss'

export default function Notes({ setOpenUpdateNoteModal, notesModalTitleRef, notesModalContentRef, handleNotesHTML, folderModalTitleRef, setOpenUpdateFolderModal }) {
    // Getting all the notes objects in an HTML format

    const viewHistory = useHistory()

    const allNotesHTML = getAllNotesHTML()

    const suggestedNotesHTML = getSuggestedNotesHTML()

    const allFoldersHTML = getAllFoldersHTML()

    const folderOptionRef = useRef()
    const allFolderOptionsHTML = getAllFolderOptionsHTML()

    function getAllFoldersHTML() { 
        const allFoldersHTML = []

        const allFolders = localStorageAPI.getAllFolders()

        const iterations = (allFolders.length > 6 ? 6 : allFolders.length)

        for (let i = 0; i < iterations; i++) { 
            allFoldersHTML.push(foldersToHTML(allFolders[i]))
        }

        return allFoldersHTML
    }

    function foldersToHTML(folder) { 
        const titleLength = 12;

        return (
            <div onClick={ onFolderOpen } onContextMenu={ onContextMenuOpen } key={ folder.id } data-folder-id={ folder.id } className='folder-base'> 
                <div className='folder-base__folder-title-container'>
                    <i class="fas fa-folder folder-title-container__folder-svg"></i>
                    <div className='folder-title-container__folder-name'>
                        { folder.title.length > titleLength ? folder.title.substring(0, titleLength) + '...' : folder.title }
                    </div>
                </div>
            </div>
        )
    }

    function getAllNotesHTML() { 
        const allNotesHTML = []

        const allNotes = localStorageAPI.getAllNotes()
 
        allNotes.forEach(note => { 
            allNotesHTML.push(notesToHTML(note))
        })

        return allNotesHTML
    }

    function getSuggestedNotesHTML() { 
        const suggestedNotesHTML = []

        let allNotes = localStorageAPI.getAllNotes()

        allNotes = allNotes.sort((noteA, noteB) => { 
            return noteA.edits >= noteB.edits ? -1 : 1
        })

        const iterations = (allNotes.length > 6 ? 6 : allNotes.length)

        for (let i = 0; i < iterations; i++) { 
            suggestedNotesHTML.push(notesToHTML(allNotes[i]))
        }

        return suggestedNotesHTML
    }

    function notesToHTML(note) { 
        const contentLength = 107;
        const titleLength = 28;

        return ( 
            <div onContextMenu={ onNoteContextMenuOpen } onClick={ onNoteSelect } key={ note.id } data-note-id={ note.id } className='note-base'>
                <div className='note-base__content'> { note.content.length > contentLength ? note.content.substring(0, contentLength) + '...' : note.content } </div>
                <div className='note-base__header'>
                    <div className='header__title'> { note.title.length > titleLength ? note.title.substring(0, titleLength) + '...' : note.title } </div>
                    <div className='header__timestamp'> { new Date(note.timestamp).toLocaleDateString('en-CA', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }) } </div>
                </div>
            </div>
        )
    }

    const noteContextMenuRef = useRef()
    const [openNoteContextMenu, setOpenNoteContextMenu] = useState(false)

    function onNoteContextMenuOpen(e) { 
        e.preventDefault()

        let noteId = ''
        if (e.target.className == 'note-base') { 
            noteId = e.target.dataset.noteId
        }
        else if (e.target.parentElement.className == 'note-base') { 
            noteId = e.target.parentElement.dataset.noteId
        }
        else { 
            noteId = e.target.parentElement.parentElement.dataset.noteId
        }

        setOpenNoteContextMenu(true)
        noteContextMenuRef.current.style.top = `${e.clientY}px`
        noteContextMenuRef.current.style.left = `${e.clientX}px`
        noteContextMenuRef.current.noteCurrent = noteId

        const allFolders = localStorageAPI.getAllFolders()

        if (allFolders.length > 0) { 
            folderOptionRef.current.dataset.noteCurrentId = noteId
            moveToFolderMenuRef.current.style.top = `${parseInt(noteContextMenuRef.current.style.top)}px`
            moveToFolderMenuRef.current.style.left = `${parseInt(noteContextMenuRef.current.style.left) + 165}px`
        }
    }

    function onNoteDelete(e) { 
        if (e.button == 1) { 
            let noteId = ''
            if (e.target.className === 'note-base') { 
                noteId = e.target.dataset.noteId
            }
            else if (e.target.parentElement.className === 'note-base') { 
                noteId = e.target.parentElement.dataset.noteId
            }
            else { 
                noteId = e.target.parentElement.parentElement.dataset.noteId
            }
    
            localStorageAPI.deleteNote(noteId)
        }
    }

    const folderEditRef = useRef()
    const [folderEditIsActive, setFolderEditIsActive] = useState(false)

    window.addEventListener('click', (e) => { 
        if (e.target.className != 'folder-base' || e.target.parentElement.className != 'folder-base' || e.target.parentElement.parentElement.className != 'folder-base') {
            setFolderEditIsActive(false)
        }
        
        if (e.target.className != 'notes-view__notes-options-container active' || e.target.parentElement.className != 'notes-view__notes-options-container active'  || e.target.parentElement.parentElement.className !=  'notes-view__notes-options-container active') { 
            setOpenNoteContextMenu(false) // notes-options-container__move-to-folder-option

            if (openNoteContextMenu == false) { 
                // FINISH LATER 
            }
        }
    })  

    function onContextMenuOpen(e) { 
        e.preventDefault()

        if (e.target.className == 'folder-base') {
            folderEditRef.current.dataset.folderCurrent = e.target.dataset.folderId
        }
        else if (e.target.parentElement.className == 'folder-base') { 
            folderEditRef.current.dataset.folderCurrent = e.target.parentElement.dataset.folderId
        }
        else { 
            folderEditRef.current.dataset.folderCurrent = e.target.parentElement.parentElement.dataset.folderId
        }
        
        setFolderEditIsActive(true)
        folderEditRef.current.style.top = `${ e.clientY }px`
        folderEditRef.current.style.left = `${ e.clientX }px`
    }

    function onFolderEdit() { 
        const folderId = folderEditRef.current.dataset.folderCurrent

        const allFolders = localStorageAPI.getAllFolders()

        const folderToEdit = allFolders.find(folder => folder.id == folderId)

        folderModalTitleRef.current.dataset.selectedFolder = folderToEdit.id
        folderModalTitleRef.current.value = folderToEdit.title
        setOpenUpdateFolderModal(true)
    }

    function onNoteSelect(e) { 

        let noteId = ''
        if (e.target.className === 'note-base') { 
            noteId = e.target.dataset.noteId
        }
        else if (e.target.parentElement.className === 'note-base') { 
            noteId = e.target.parentElement.dataset.noteId
        }
        else { 
            noteId = e.target.parentElement.parentElement.dataset.noteId
        }

        const allNotes = localStorageAPI.getAllNotes()

        const selectedNote = allNotes.find(note => note.id == noteId)

        onNoteEdit(selectedNote)
    }

    function onNoteEdit(selectedNote) { 
        notesModalTitleRef.current.dataset.selectedNoteId = selectedNote.id
        notesModalContentRef.current.dataset.selectedNoteId = selectedNote.id
        notesModalTitleRef.current.value = selectedNote.title
        notesModalContentRef.current.value = selectedNote.content
        setOpenUpdateNoteModal(true)
    }

    const moveToFolderMenuRef = useRef()
    const [openMoveToFolderMenu, setOpenMoveToFolderMenu] = useState(false)

    function getAllFolderOptionsHTML() { 
        const allFolderOptionsHTML = []

        const allFolderOptions = localStorageAPI.getAllFolders()

        allFolderOptions.forEach(folderOption => { 
            allFolderOptionsHTML.push(folderOptionToHTML(folderOption))
        })

        return allFolderOptionsHTML
    }

    function folderOptionToHTML(folderOption) { 
        const titleLength = 14;

        return (
            <div ref={ folderOptionRef } onClick={ onMoveToFolder } key={ folderOption.id } data-folder-option-id={ folderOption.id } data-note-current-id={ undefined } className='folder-option-base' id='options-container__option'>
                <i class="fas fa-folder folder-option-base__svg" id='option__svg'></i>
                <div className='folder-option-base__name' id='option__name'> { folderOption.title.length > titleLength ? folderOption.title.substring(0, titleLength) + '...' : folderOption.title } </div>
            </div>
        )
    }

    function onMoveToFolder(e) {
        const allFolders = localStorageAPI.getAllFolders()
        const allNotes = localStorageAPI.getAllNotes()

        let folderId = ''
        let noteId = ''
        if (e.target.className == 'folder-option-base') { 
            folderId = e.target.dataset.folderOptionId
            noteId = folderOptionRef.current.dataset.noteCurrentId    //  data-note-current-id
        }    
        else { 
            folderId = e.target.parentElement.dataset.folderOptionId
            noteId = folderOptionRef.current.dataset.noteCurrentId
        }

        const folderToSave = allFolders.find(folder => folder.id == folderId)
        const noteToAdd = allNotes.find(note => note.id == noteId)

        
        const existing = folderToSave.notes.find(note => note.id == noteToAdd.id)

        if (existing) { 
            alert(`${ noteToAdd.title } is already in ${ folderToSave.title }!`)
        }
        else { 
            folderToSave.notes.push(noteToAdd)

            console.log(folderToSave)

            localStorageAPI.saveFolder(folderToSave)    
        }
        
    }

    function onMoveToFolderOption() { 
        setOpenMoveToFolderMenu(true)
    }

    function onFolderOpen(e) {  //data-folder-id
        let folderId = ''
        if (e.target.className == 'folder-base') { 
            folderId = e.target.dataset.folderId
        }
        else if (e.target.parentElement.className == 'folder-base') { 
            folderId = e.target.parentElement.dataset.folderId
        }
        else { 
            folderId = e.target.parentElement.parentElement.dataset.folderId
        }

        viewHistory.push(`/notes/folder/${ folderId }`) 
    }

    return (
        <div className='main-view__notes-view'>
            <div className='notes-view__divider'></div>
            <div className='notes-view__notes-view'>
                <div className='notes-view__recent-notes-container' id= 'notes-view__main-containers'>
                    <div className='recent-notes-container__notes-header-container' id='main-containers__header-containers'>
                        <div className='notes-header-container__pseudo-component-left-container' id='header-containers__pseudo-components-left-container'>
                            <div className='pseudo-component-left-container__pseudo-component-left' id='pseudo-components-left-container__pseudo-component-left'></div>
                        </div>
                        <span className='notes-header-container__name' id='header-containers__names'>Suggested</span>
                        <div className='notes-header-container__pseudo-component-right-container' id='header-containers__pseudo-components-right-container'>
                            <div className='pseudo-component-right-container__pseudo-component-right' id='pseudo-components-right-container__pseudo-component-right'></div>
                        </div>
                    </div>
                    <div className='recent-notes-container__notes-root-container' id='main-containers__root-containers'>
                        <div className='notes-root-container__notes-root' id='root-containers__roots'>
                            { suggestedNotesHTML }
                        </div>
                    </div>
                </div>
                <div className='notes-view__folders-container' id='notes-view__main-containers'>
                    <div className='folders-container__folders-header-container' id='main-containers__header-containers'>
                        <div className='folders-container__pseudo-component-left-container' id='header-containers__pseudo-components-left-container'>
                            <div className='pseudo-component-left-container__pseudo-component-left' id='pseudo-components-left-container__pseudo-component-left'></div>
                        </div>
                        <span className='folders-header-container__name' id='header-containers__names'>Folders</span>
                        <div className='notes-header-container__pseudo-component-right-container' id='header-containers__pseudo-components-right-container'>
                            <div className='pseudo-component-right-container__pseudo-component-right' id='pseudo-components-right-container__pseudo-component-right'></div>
                        </div>
                    </div>
                    <div className='folders-container__folders-root-container' id='main-containers__root-containers'>
                        <div className='folders-root-container__folders-root' id='root-containers__roots'>
                            { allFoldersHTML }
                        </div>
                    </div>
                </div>
                <div className='notes-view__all-notes-container' id='notes-view__main-containers'>
                    <div className='all-notes-container__all-notes-header-container' id='main-containers__header-containers'>
                        <div className='all-notes-header-container__pseudo-component-left-container' id='header-containers__pseudo-components-left-container'>
                            <div className='pseudo-component-left-container__pseudo-component-left' id='pseudo-components-left-container__pseudo-component-left'></div>
                        </div>
                        <span className='all-notes-header-container__name' id='header-containers__names'>Notes</span>
                        <div className='all-notes-header-container__pseudo-component-right-container' id='header-containers__pseudo-components-right-container'>
                            <div className='pseudo-component-right-container__pseudo-component-right' id='pseudo-components-right-container__pseudo-component-right'></div>
                        </div>
                    </div>
                    <div className='all-notes-container__all-notes-root-container' id='main-containers__root-containers'>
                        <div className='all-notes-root-container__all-notes-root-pseudo' id='root-containers__roots'>
                            <div className='all-notes-root-pseudo__real-root' id='roots__real-roots'>
                                { allNotesHTML }
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            <div className='notes-view__divider'></div>
            <div ref={ folderEditRef } data-folder-current={ undefined } className={'notes-view__folder-options-container' + (folderEditIsActive ? ' active' : '')} id='options-container'>
                <div onClick={ onFolderEdit } className='folder-options-container__rename-folder-option-container' id='options-container__option'>
                    <div className='rename-folder-option-container__name' id='option__name'>
                        Rename folder
                    </div>
                </div>
            </div>
            <div ref={ noteContextMenuRef } data-note-current = { undefined } className={'notes-view__notes-options-container' + (openNoteContextMenu ? ' active' : '')} id='options-container'>
                <div onClick={ onMoveToFolderOption } className='notes-options-container__move-to-folder-option' id='options-container__option'>
                    <div className='move-to-folder-option__name' id='option__name'>
                        Move to folder
                    </div>
                </div>
            </div>
            <div ref={ moveToFolderMenuRef } className={'notes-view__move-to-folder-options-root' + (openMoveToFolderMenu ? ' active' : '')} id='options-container'>
                { allFolderOptionsHTML }
            </div>
        </div>
    )
}
