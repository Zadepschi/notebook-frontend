import moment from 'moment';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

export const MyNote = ({imageUrl, title, text, createdAt, updatingInInput, deleteNote }) => {



    return(
<div className='noteBlockFlex'>       
<div className='noteBlock'>
    
  <div className='imageTitleText'>
    <div className='divImage'>
        {imageUrl ? <img className='noteImage' src={ `https://notbook.onrender.com${imageUrl}`}  alt='pic'/> : ""}
   </div>
   <div className='divTextBlock'>
     <div className='textBlock'>
        <h3 className='title'>{title}</h3>
         <hr/>
        <div className='divText'>
          <p className='text'>{text}</p>
        </div>
     </div>
   </div>
   </div>

    <div className='createdEditDelete'>
     <p className='cratedAt'> Created at {moment(createdAt).format('DD/MM/YYYY')} </p>
    <AiFillEdit className='edit' onClick={updatingInInput}></AiFillEdit>
    <AiFillDelete className='delete' onClick={deleteNote}></AiFillDelete>
    </div>
   </div>
</div> 
    )
}

