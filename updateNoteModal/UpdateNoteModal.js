import React from 'react'
import localStorageAPI from '../../localStorageAPI'

import './updateNoteModal.scss'

export default function UpdateNoteModal({ notesModalTitleRef, notesModalContentRef, handleNotesHTML }) {
    function editNote(e) { 
        // build a temp note object
        const noteToSave = { 
            title: notesModalTitleRef.current.value.trim(), 
            content: notesModalContentRef.current.value.trim(),
            id: e.target.dataset.selectedNoteId
        }

        localStorageAPI.saveNote(noteToSave)

        // update folders that contain the note
        let allFolders = localStorageAPI.getAllFolders()

        if (allFolders.length > 0) { 
            allFolders.map(folder => { 
                folder.notes.map(note => { 
                    if (note.id == noteToSave.id) { 
                        note.title = noteToSave.title
                        note.content = noteToSave.content
                        note.timestamp = new Date().toISOString()
                    }
                })
            })

            allFolders.map(folder => { 
                folder.notes.sort((noteA, noteB) => {
                    return (noteA.title[0].toLowerCase() < noteB.title[0].toLowerCase() ? -1 : 1)
                })
            })

            allFolders.forEach(folder => {                
                localStorageAPI.saveFolder(folder)
            })
        } 
    }

    return (
        <div className='update-note-modal__background-container'>
            <div className='background-container__notes-inputs-container'>
                <input ref={ notesModalTitleRef } onBlur={ editNote } type='text' className='notes-inputs-container__title-area' id='inputs-container__input-areas' data-selected-note-id={ undefined } placeholder='Untitled note'></input>
                <textarea ref={ notesModalContentRef } onBlur={ editNote } className='notes-inputs-container__content-area' id='inputs-container__input-areas' data-selected-note-id={ undefined } placeholder='No content... yet'></textarea>
            </div>
        </div>
    )
}
