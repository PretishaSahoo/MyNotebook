import React, {useContext, useState} from "react";
import NoteContext from "../Context/notes/NoteContext"

export default function AddNote(props) {

    const context=useContext(NoteContext);
    const {addNote}=context;

    const [note, setNote] = useState({title:"", description:"",tag:""})

    const handleClick =(e)=>{
      e.preventDefault();
      addNote(note.title, note.description ,note.tag);
      setNote({title:"", description:"",tag:""});
      props.showAlert("Note added Succesfully","success")
    }

    const onChange =(e)=>{
      setNote({...note,[e.target.name]:e.target.value})
    }

    const buttonStyle = {
      background: '#FF6F61',
      color: 'white', // Text color
      padding: '10px 20px', // Adjust padding as needed
      borderRadius: '8px', // Rounded border radius
      cursor: 'pointer', // Cursor pointer on hover
      transition: 'background-color 0.3s ease', // Smooth transition on hover
      border: 'none', // Remove border
      outline: 'none', // Remove outline on focus
    };

  return (
    <div className="container">
  <div className="container  p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '10px', border: '1px solid #ccc' }}>
    <form>
    <h3 className="my-3">Add a Note</h3>
      <div className="mb-3">
        <label className="form-label">Add Notes Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          id="title"
          value={note.title}
          onChange={onChange}
          style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #555', color: '#555', fontFamily: 'Your Font Here' }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Add Notes Description</label>
        <input
          type="textarea"
          className="form-control"
          name="description"
          id="description"
          value={note.description}
          onChange={onChange}
          style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #555', color: '#555', fontFamily: 'Your Font Here' }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Add Tag</label>
        <input
          type="text"
          className="form-control"
          name="tag"
          id="tag"
          value={note.tag}
          onChange={onChange}
          style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #555', color: '#555', fontFamily: 'Your Font Here' }}
        />
      </div>
      {/* <div class="mb-3">
        <label for="formFile" class="form-label">Add image</label>
        <input class="form-control" type="file" id="formFile"/>
      </div> */}
      <button disabled={note.title.length < 3} type="submit" onClick={handleClick} className="btn btn-dark" style = {buttonStyle}>
        Add note
      </button>
    </form>
  </div>
</div>

  );
}
