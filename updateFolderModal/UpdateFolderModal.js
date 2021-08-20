import React from 'react'

import './updateFolderModal.scss'

import localStorageAPI from '../../localStorageAPI'

export default function UpdateFolderModal({ folderModalTitleRef }) {
    function editFolder(e) { 

        const folderToSave = { 
            title: folderModalTitleRef.current.value.trim(),
            id: e.target.dataset.selectedFolder
        }

        localStorageAPI.saveFolder(folderToSave)
    }

    return (
        <div className='update-folder-modal__folder-inputs-container'>
            <input ref={ folderModalTitleRef } onBlur={ editFolder } data-selected-folder={ undefined } type='text' className='folder-inputs-container__title-area' placeholder='Untitled note'></input>
        </div>
    )
}
