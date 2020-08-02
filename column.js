const Column = {
    idCounter : 4,
    dropped:null,
    dragged: null,

    process(columnElement) {
        const spanAction_addNote = columnElement.querySelector('[data-action-addNote]');
        
        spanAction_addNote.addEventListener('click' , function(event){
            const noteElement = Note.create()

            columnElement.querySelector('[data-notes]').append(noteElement)

            noteElement.setAttribute('contenteditable' , 'true')
            noteElement.focus()

        })

       const headerElement = columnElement.querySelector('.column-header')
       headerElement.addEventListener('dblclick' , function (event){
           headerElement.setAttribute('contenteditable' , 'true')
           headerElement.focus()
       })

        headerElement.addEventListener('blur' , function (event){
            if (!this.textContent.trim()) {
                this.textContent = 'В плане'
            }
        headerElement.removeAttribute('contenteditable' , 'true')
        headerElement.focus()
        })
        
        
        const deleteColumn = columnElement.querySelector('.delete-column')
        deleteColumn.addEventListener('click' , function (event) { 
            this.parentNode.remove()
        })

        columnElement.addEventListener('dragstart', Column.dragstart) 
        columnElement.addEventListener('dragend', Column.dragend) 

        columnElement.addEventListener('dragover' , Column.dragover)

        columnElement.addEventListener('drop' , Column.drop)

    }, 
    create() {
        const columnElement = document.createElement('div')
        columnElement.classList.add('column')
        columnElement.setAttribute('draggable' , 'true')

        // if (id) {
        //     columnElement.setAttribute('data-column-id' , id)
        // }
        // else {
            columnElement.setAttribute('data-column-id' , Column.idCounter)
            Column.idCounter++
        // }
        columnElement.innerHTML = `
        <p class="column-header">В плане</p><span  class="delete-column">&#10008;</span>
        <div data-notes></div>
        <p class="column-footer">
            <span data-action-addNote class="action">+ Добавить карточку</span>
        </p>`
        Column.process(columnElement)
        return columnElement
    },
    dragstart(event) {
        Column.dragged = this
        Column.dragged.classList.add('dragged')

        event.stopPropagation()  
        document.querySelectorAll('.note').forEach(noteElement => noteElement.removeAttribute('draggable'))
    },

    dragend(event) {
        Column.dragged.classList.remove('dragged')
        Column.dragged = null
        Column.dropped = null   
        document
            .querySelectorAll('.note')
            .forEach(noteElement => noteElement.setAttribute('draggable' , 'true'))

            // Application.save()
        
    },
    
    dragover(event ) {
        event.preventDefault()
        event.stopPropagation() 
        if (Column.dragged === this) {
            if (Column.dropped) {
                Column.dropped.classList.remove('under')
            }
            Column.dropped = null
        }
        if (!Column.dragged ||  Column.dragged === this) {
            return
        }

        Column.dropped = this

        document
            .querySelectorAll('.column')
            .forEach(columnElement => columnElement.classList.remove('under'))
        this.classList.add('under')
    },
  
    drop() {
        if (Note.dragged) {
            return this.querySelector('[data-notes]').append(Note.dragged)
        }
        else if (Column.dragged) {
            const children = Array.from(document.querySelector('.columns').children)
            const indexA = children.indexOf(this)
            const indexB = children.indexOf(Column.dragged)
            
            if (indexA < indexB) {
                document.querySelector('.columns').insertBefore(Column.dragged, this)
            }
            else {
                document.querySelector('.columns').insertBefore(Column.dragged, this.nextElementSibling)
            }

            document
                .querySelectorAll('.column')
                .forEach(columnElement => columnElement.classList.remove('under'))

        }
    }
}