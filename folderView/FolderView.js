import React from 'react'
import { useHistory } from 'react-router-dom'

import './folderView.scss'

import localStorageAPI from '../../localStorageAPI'

export default function FolderView({ setOpenUpdateNoteModal, notesModalTitleRef, notesModalContentRef }) {
    const viewHistory = useHistory()

    const folder = getFolder()

    const folderNotesHTML = getFolderNotesHTML(folder)

    function getFolder() { 
        const folderId = getFolderId()

        const allFolders = localStorageAPI.getAllFolders()

        const folder = allFolders.find(folder => folder.id == folderId)

        return folder
    }

    function getFolderId() { 
       return viewHistory.location.pathname.split('/')[3]
    }

    function getFolderNotesHTML(folder) { 
        const folderNotesHTML = []

        folder.notes.forEach(note => { 
            folderNotesHTML.push(noteToHTML(note))
        })  

        return folderNotesHTML
    }

    function noteToHTML(note) { 
        const folderViewNoteTitleLength = 100 

        return (
            <div onClick={ onNoteSelect } key={ note.id } data-note-id={ note.id } className='open-folder-note-base'>
                <div className='open-folder-note-base__note-title-container'>
                    <div className='note-title-container__note-svg'>
                        <i class="fas fa-sticky-note"></i>
                    </div>
                    <div className='note-title-container__note-name'>
                        { note.title.length > folderViewNoteTitleLength ? note.title.substring(0, folderViewNoteTitleLength) + '...' : note.title }
                    </div>  
                    <div className='note-title-container__note-timestamp'>
                        { new Date(note.timestamp).toLocaleDateString('en-CA', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }) }
                    </div>
                </div>
            </div>
        )
    }

    function onNoteSelect(e) { 
        let noteId = ''
        if (e.target.className == 'open-folder-note-base') { 
            noteId = e.target.dataset.noteId
        } 
        else if (e.target.parentElement.className == 'open-folder-note-base') { 
            noteId = e.target.parentElement.dataset.noteId
        }
        else if (e.target.parentElement.parentElement.className == 'open-folder-note-base') { 
            noteId = e.target.parentElement.parentElement.dataset.noteId
        }
        else { 
            noteId = e.target.parentElement.parentElement.parentElement.dataset.noteId
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

    return (
        <div className='main-view__folder-view'>
            <div className='folder-view__divider'></div>
            <div className='folder-view__folder-container'>
                <div className='folder-container__folder-header-container'>
                    <div className='folder-header-container__folder-name-container'>
                        <div className='folder-name-container__folder-name'> { folder.title } </div>
                    </div>
                    <div className='folder-header-container__note-info-tab'>
                        <div className='note-info-tab__note-name-container'>
                            <div className='note-name-container__note-name'> Name </div>
                        </div>
                        <div className='note-info-tab__note-timestamp-container'>
                            <div className='note-timestamp-container__note-timestamp'> Last modified </div>  
                        </div>
                    </div>
                </div>
                <div className='folder-container__folder-notes-root'>
                    { folderNotesHTML }
                </div>
            </div>
            <div className='folder-view__divider'></div>
        </div>
    )
}
