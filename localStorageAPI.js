class localStorageAPI { 

    // Returns an array of note objects
    static getAllNotes() { 
        let allNotes = JSON.parse(localStorage.getItem('notes')) || [];

        allNotes = this.organizeAllNotes(allNotes)

        return allNotes;
    }

    // Saves the new note to the local storage
    static saveNote(noteToSave) { 
        // checking if the noteToSave already exists in the notes
        const allNotes = this.getAllNotes()

        const existingNote = this.searchNote(noteToSave, allNotes)

        if (existingNote) { 
            existingNote.title = noteToSave.title
            existingNote.content = noteToSave.content
            existingNote.timestamp = new Date().toISOString()
            existingNote.edits = existingNote.edits + 1
        }
        else { 
            noteToSave.title = ''
            noteToSave.content = '' 
            noteToSave.timestamp = new Date().toISOString()
            allNotes.push(noteToSave)
        } 

        localStorage.setItem('notes', JSON.stringify(allNotes))
    }

    static deleteNote(noteToDeleteId) { 
        const allNotes = this.getAllNotes()

        allNotes.filter(note => note.id != noteToDeleteId)
    }

    // Orders the notes from newest to oldest
    static organizeAllNotes(allNotes) { 
        allNotes = allNotes.sort((noteA, noteB) => { 
            return noteA.timestamp > noteB.timestamp ? -1 : 1
        })

        return allNotes;
    }

    // Searching for an already existing note in the local storage and returns if it exists
    static searchNote(noteToSave, allNotes) { 
        const foundNote = allNotes.find(note => note.id == noteToSave.id)

        return foundNote
    }

    static getAllFolders() { 
        let allFolders = JSON.parse(localStorage.getItem('folders')) || []

        allFolders = this.organizeAllFolders(allFolders)

        return allFolders
    }

    static saveFolder(folderToSave) { 
        const allFolders = this.getAllFolders()

        const existingFolder = this.searchFolder(folderToSave, allFolders)

        if (existingFolder) { 
            existingFolder.title = folderToSave.title

            if (folderToSave.notes) { 
                existingFolder.notes = folderToSave.notes
            }
        }
        else { 
            folderToSave.title = ''

            allFolders.push(folderToSave)
        }

        localStorage.setItem('folders', JSON.stringify(allFolders))
    }

    static organizeAllFolders(allFolders) { 
        allFolders = allFolders.sort((folderA, folderB) => { 
            if (folderA.title[0] == undefined) {
                return 1
            }
            else if (folderB.title[0] == undefined) { 
                return -1
            } 
            else {
                return folderA.title[0] <= folderB.title[0] ? -1 : 1
            }
        })

        return allFolders
    }

    static searchFolder(folderToSave, allFolders) {
        const existingFolder = allFolders.find(folder => folder.id == folderToSave.id) 

        return existingFolder
    }
}

export default localStorageAPI