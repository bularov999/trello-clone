const Application = {
    save () {
        const object = {
            columns: {
                idCounter: Column.idCounter,
                items: []
            },
            notes: {
                idCounter: Note.idCounter,
                items: [] 
            }
        }
        document
            .querySelectorAll('.column')
            .forEach(columnElement => {
                const column = {
                    id: parseInt(columnElement.getAttribute('data-column-id')),
                    notesIds: []
                }

                columnElement
                    .querySelectorAll('.note')
                    .forEach(noteElement => {
                        column.notesIds.push(parseInt(noteElement.getAttribute('data-note-id')))
                    })
                object.columns.items.push(column)
               

            })
            console.log(object.columns)
            document
                .querySelectorAll('.note')
                .forEach(noteElement => {
                    const note = {
                        id: parseInt(noteElement.getAttribute('data-note-id')),
                        content: noteElement.textContent
                    }
                    object.notes.items.push(note)
                })
        
        const json = JSON.stringify(object)
        localStorage.setItem('trello' , json)
        return object
    },
    load () {
        if (!localStorage.getItem('trello')) {
                return
        }
        
        const mountePoint = document.querySelector('.columns')
        mountePoint.innerHTML = ''
        const object = JSON.parse(localStorage.getItem('trello'))
        const getNoteById = id => object.notes.items.find(note => note.id === id)
        for (const column of object.columns.items ) {
            const columnElement = Column.create(column.id , column.title)
            mountePoint.append(columnElement)
            for (const noteId of column.notesIds) {
                const note = getNoteById(noteId)
                const noteElement = Note.create(note.id , note.content)
                columnElement.querySelector('[data-notes]').append(noteElement)
            } 
        }
    }
}