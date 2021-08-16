import React from 'react'
import { useHistory } from 'react-router-dom'

import './folderView.scss'

import localStorageAPI from '../../localStorageAPI'

export default function FolderView() {
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
    }

    function noteToHTML(note) { 
        return (
            <div className='note-base'>
                <div className='note-base__note-title-container'>
                    <div className='note-title-container__note-svg'>
                        <i class="fas fa-sticky-note"></i>
                    </div>
                    <div className='note-title-container__note-name'>
                        { note.title }
                    </div>
                    <div className='note-title-container__note-timestamp'>
                        { note.timestamp }
                    </div>
                </div>
            </div>
        )
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
