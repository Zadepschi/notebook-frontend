import axios from 'axios';

const getNotes = (setNote) => {
    axios.get("https://notbook.onrender.com")
    .then(({data}) => {console.log(data)
        setNote(data)
    })
}

const addNote = (title, text, setTitle, setText, setNote, imageUrl, setImageUrl) => {
    axios.post("https://notbook.onrender.com/saveNote", {title, text, imageUrl})
    .then((data) => {
        console.log(data)
        setTitle("")
        setText("")
        setImageUrl("")
        getNotes(setNote)
    })
}

const editNote = (noteId, title, setTitle, text, setText, setNote, setEditing) => {
    axios.post("https://notbook.onrender.com/editNote", {_id: noteId ,title, text})
    .then((data) => {
        console.log(data)
        setTitle("")
        setText("")
        setEditing(false)
        getNotes(setNote)
    })
}


const deleteNote = (_id, setNote) => {
    axios.post("https://notbook.onrender.com/deleteNote", { _id })
    .then((data) => {
        console.log(data)
        getNotes(setNote)
    })
}


export { getNotes, addNote, editNote, deleteNote }