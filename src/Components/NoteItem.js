import React, { useState, useContext } from 'react';
import NoteContext from "../Context/notes/NoteContext";

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote, editNote, getNotes } = context;
  const { note } = props;

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: note.title,
    description: note.description,
    tag: note.tag
  });

  const handleDelete=() => {
     deleteNote(note._id)
     props.showAlert("Note deleted successfully","success")
  }

  const handleEdit = () => {
    // Reset formData when opening the modal
    setFormData({
      title: note.title,
      description: note.description,
      tag: note.tag
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (note._id) {
      await editNote(note._id, formData.title, formData.description, formData.tag);
      handleCloseModal();
      getNotes(); // Fetch notes after updating
      props.showAlert("Your Note Updated Successfully!","success")
    } else {
      console.error("Note _id is undefined");
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const noteStyle = {
    background: 'rgba(255, 255, 255, 0.8)', // Adjust the alpha value (last parameter) as needed
  };
  

  return (
    <div className="col-md-3 my-2">
      <div className="card"  style={noteStyle}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-trash-can mx-2" onClick={handleDelete}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={handleEdit}></i>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit your note</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Add Notes Title</label>
                    <input type="text" className="form-control" name="title" value={formData.title} onChange={handleInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Add Notes Description</label>
                    <textarea className="form-control" name="description" value={formData.description} onChange={handleInputChange}></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Add Tag</label>
                    <input type="text" className="form-control" name="tag" value={formData.tag} onChange={handleInputChange} />
                  </div>
                  <button disabled={note.title.length<3 } type="button" onClick={handleClick} className="btn btn-dark" >
                    Update note
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteItem;
