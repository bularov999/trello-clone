const Note = {
    idCounter : 8,
    dragged : null,
    process(noteElement) {
        noteElement.addEventListener('dblclick' , function() {
            noteElement.setAttribute('contenteditable' , 'true')

            noteElement.removeAttribute('draggable')
            noteElement.closest('.column').removeAttribute('draggable')

             noteElement.focus()
        })
        noteElement.addEventListener('blur' , function(event) {

            if (!noteElement.textContent.trim().length) { 
                noteElement.remove()
            } 
            else if (noteElement.textContent.trim().length) {
                noteElement.closest('.column').setAttribute('draggable' , 'true')
                console.log(noteElement.closest('.column'))
            }
            noteElement.removeAttribute('contenteditable' , 'true')
            noteElement.setAttribute('draggable' , 'true')
            
            // Application.save()

        })
    
        noteElement.addEventListener( 'dragstart', Note.dragstart)
        noteElement.addEventListener( 'dragend', Note.dragend)
        noteElement.addEventListener( 'dragenter', Note.dragenter)
        noteElement.addEventListener( 'dragover', Note.dragover)
        noteElement.addEventListener( 'dragleave', Note.dragleave)
        noteElement.addEventListener( 'drop', Note.drop)
    },
    create () {
            const  noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.setAttribute('draggable' , 'true');
            noteElement.textContent = ''
            // if (id) {
            //     noteElement.setAttribute('data-note-id' , id);
            // }
            // else {
                noteElement.setAttribute('data-note-id' , Note.idCounter);
                Note.idCounter++

            // }
            
            Note.process(noteElement)

          return noteElement
    },
    
    dragstart (event) {
        Note.dragged = this
        this.classList.add('dragged')
        event.stopPropagation()     
    },

    dragend(event){
        event.stopPropagation()

        Note.dragged = null
        this.classList.remove('dragged')
        document.querySelectorAll('.note').forEach(x => x.classList.remove('under'))
            // Application.save()
    },

    dragenter(event) {
        event.stopPropagation()

        if (!Note.dragged || this === Note.dragged){
            return
        }
            this.classList.add('under')
    },

    dragover(event) {
        event.preventDefault() 
        if (!Note.dragged || this === Note.dragged){
            return
        }

    },

    dragleave(event) {
        event.stopPropagation()

        if (!Note.dragged || this === Note.dragged){
            return
        }

        this.classList.remove('under')
    },

    drop(event) {
            event.stopPropagation()
            if (!Note.dragged || this === Note.dragged){
                return
            }
            if (this.parentElement === Note.dragged.parentElement) {
                const note = Array.from(this.parentElement.querySelectorAll('.note'))
                const indexA = note.indexOf(this)
                const indexB = note.indexOf(Note.dragged)

                if (indexA < indexB) {
                    this.parentElement.insertBefore(Note.dragged , this)
                } 
                else { 
                    this.parentElement.insertBefore(Note.dragged , this.nextElementSibling)
                }
            }
            else { 
                this.parentElement.insertBefore(Note.dragged , this)
            }
    }

}