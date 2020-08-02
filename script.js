// Application.load()
const columnEl = document.querySelector('.column')
const NoteEl = document.querySelectorAll('.note').forEach(x => Note.process(x))
Column.process(columnEl)


document                           
    .querySelector('[data-action-addColumn]')
    .addEventListener('click' , function (event) {
        const columnElement = Column.create()
        document.querySelector('.columns').append(columnElement)
        // Application.save()
    })



  

  