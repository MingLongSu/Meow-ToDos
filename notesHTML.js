
import localStorageAPI from "./localStorageAPI"

class notesHTML { 
    constructor() {
        this.activeNote = ''
    }

    getAllNotesHTML() { 
        const allNotesHTML = []

        const allNotes = localStorageAPI.getAllNotes()

        allNotes.forEach(note => { 
            allNotesHTML.push(this.toHTML(note))
        })

        return allNotesHTML
    }

    toHTML(note) { 
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

            setActiveNote()
        }

        function setActiveNote() { 
            console.log(this.getActiveNote())
        }
    
        return ( 
            <div onClick={ onNoteSelect } key={ note.id } data-note-id={ note.id } className='note-base'>
                <div className='note-base__content'> { note.content } </div>
                <div className='note-base__header'>
                    <div className='header__title'> { note.title } </div>
                    <div className='header__timestamp'> { note.timestamp } </div>
                </div>
            </div>
        )
    }

    setActiveNote() { 
        console.log(this.activeNote)
    }
}


export default notesHTML