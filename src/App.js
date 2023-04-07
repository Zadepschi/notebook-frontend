
import './App.css';
import { addNote, getNotes, editNote, deleteNote } from './FetchNote';
import { MyNote } from './MyNote';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {FaSearch } from 'react-icons/fa';


function App() {
  const [myNote, setNote] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [editing, setEditing] = useState(false);
  const [noteId, setNoteId] = useState("");
 const inputFileRef = useRef(null);
 const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    getNotes(setNote)
  }, [])

  const [value, setValue] = useState("");
  const filteredNotes = myNote.filter(note => {
    return note.title.toLowerCase().includes(value.toLowerCase())
  })

const updatingInInput = (_id, title, text) => {
setEditing(true);
setTitle(title);
setText(text);
setNoteId(_id);
}


const handleChangeFile = async(event) => {
  try {
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append('image', file);
    const { data } = await axios.post('https://notbook.onrender.com/upload', formData);
    setImageUrl(data.url);
  }
  catch (err) {
    console.warn(err);
    alert(`Error!`)
  }
};

const onClickRemoveImage = () => {
  setImageUrl("");
};

  return (
    <div className="App">
   <div>
     <span> <FaSearch className='icon'></FaSearch></span>
      <input className='searchInput' placeholder='Search by title...' onChange={(event) => setValue(event.target.value)} 
      type='text'/>
    </div>
     <div className='inputBlock'>
     <h1>NoteBook</h1>

      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />

      {imageUrl && (
        <>
     
       <div>
        <img  src={`https://notbook.onrender.com${imageUrl}`} alt="Uploaded"  width="300"/>
       </div>

   <div>
        <button className='deleteImage' onClick={onClickRemoveImage}>
         Delete
        </button>
       </div>
       </>
      )}
          <button className='upload' onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
           Upload image
         </button>

     <div>
      <div>
     <input className='titleInput' type="text" placeholder="Type title..." value={title} onChange={(e) => setTitle(e.target.value) }/>
     </div>
     <div>
     <textarea type="text" placeholder="Type text..."  value={text} onChange={(e) => setText(e.target.value) }/>
     </div>

     <div>
     <button className='addButton' disabled={!text}  onClick =
     {editing ? () => editNote(noteId, title, setTitle, text, setText, setNote, setEditing)
      : () => addNote(title, text, setTitle, setText, setNote, imageUrl, setImageUrl)}>
       {editing ? "Edit" : "Add"}
    </button> 
     </div>
     </div>
     </div>




    <div className='block'>
    <div className='overFlow'>
     { filteredNotes.map((note) => <MyNote imageUrl={note.imageUrl} title={note.title} text={note.text} createdAt={note.createdAt}
           key={note._id}
     updatingInInput = {() => updatingInInput(note._id, note.title, note.text)}
     deleteNote={() => deleteNote(note._id, setNote)}/>) }
    </div>
    </div>
    </div>
  );
}

export default App;





