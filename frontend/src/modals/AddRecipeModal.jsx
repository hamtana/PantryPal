import React from 'react';
import './modal.css';

const AddRecipeModal = ({isOpen, onClose, onSubmit}) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSubmit(formData);
    onClose();
  }

  return (
      <div className="overlay">
        <div className="modal">
          <h2>Add Recipe</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="recipeName">Name:</label>
            <input type="text" id="recipeName" name="recipeName" required/>

            <label htmlFor="picture">Picture:</label>
            <input type="file" id="picture" name="picture" accept="image/*" required/>

            <label htmlFor="recipe">Recipe:</label>
            <input type="text" id="recipe" name="recipe" required/>

            <button type="submit">Add Recipe</button>
            <button type="button" onClick={onClose}>Close</button>
          </form>
        </div>
      </div>
  );
}

export default AddRecipeModal;