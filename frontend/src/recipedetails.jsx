import React,{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import axios from "axios";
import './css/showrecipe.css';
import { useNavigate } from "react-router-dom";
import formatRecipeText from "./formatRecipeText"
import ShareRecipeModal from './modals/ShareRecipeModal';
import Alert from './modals/alert';  // Ensure you have an Alert component

Modal.setAppElement('#root');

function RecipeDetails() {
  const [isShareRecipeModalOpen, setIsShareRecipeModalOpen] = useState(false)
  const [recipe, setRecipe] = useState(null);
  const [recipeFeedback, setRecipeFeedback] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const getRecipeById = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/getRecipes/${id}`)
        const parsedToJson = JSON.parse(response.data)
        /* The backend seems to return a list of json, but there is only one json in there. */
        setRecipe(parsedToJson[0])
        console.log(parsedToJson)
      } catch (error) {
        console.log("Error in getting recipe by id: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    getRecipeById();
  }, [id]);

  useEffect(() => {
    const getFeedbackForRecipe = async () => {
      try {
        const response = await axios.get(`/api/getFeedbackForRecipe/${id}`);
        console.log("Recipe Feedback: ", response.data);
        if (Array.isArray(response.data)) {
          setRecipeFeedback(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
          setRecipeFeedback([]);
        }
      } catch (error) {
        console.log("Error in getting recipe feedback by recipe id: ", error);
        setRecipeFeedback([]);
      }
    };
    getFeedbackForRecipe();
  }, [id]);


  /* data parameter contains a list of userIds to share recipe to, and recipe id */
  const shareRecipe = async (data) => {
    console.log("Share Recipe: ", data)
    try {
      const response = await axios.post("/api/shareRecipe/", data)
      console.log("share recipe: ", response.data)
      setAlertMessage("Recipe shared successfully!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    } catch (error) {
      console.log("Error occured trying to share recipe: ", error)
      setAlertMessage("Failed to share recipe.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  }

  return (
    <>
      <h2>Recipe Details:</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : recipe ? (
        <>
          <h2>{ recipe.fields.recipeName }</h2>
          <div className="recipe-content" dangerouslySetInnerHTML={formatRecipeText(recipe.fields.recipe)}></div>

          <div className="button-container">
              <button onClick={() => navigate('/recipes')}>Back</button>
              <button onClick = {() => navigate('/markAsCreated/'+id)}>Mark as created</button>
              <button onClick={() => setIsShareRecipeModalOpen(true)} style={{ cursor: 'pointer' }}>Share Recipe</button>
          </div>
          {showAlert && <Alert message={alertMessage} onClose={() => setShowAlert(false)} />}
        </>
      ) : (
        <p>No recipe found.</p>
      )
      }
      <div className="recipe-feedback-list">
        <h2>Feedback:</h2>
        {Array.isArray(recipeFeedback) && recipeFeedback.length !== 0 ? (
          recipeFeedback.filter(feedback => feedback.feedback.trim().length > 0).map((feedback, index) => (
            <div key={index} className="feedback-item">
            <div className="profile-picture">
              {
                <img src={"/Storage/" + feedback.profile.picture} alt={`${feedback.userShared.username}'s profile`} />
              }
            </div>
              <div className="feedback-user">
                <strong>{feedback.userShared.username}</strong> says:
              </div>
              <div className="feedback-text">
                {feedback.feedback}
              </div>
            </div>
          ))
        ) : (
          <p>No Feedback :(</p>
        )}
      </div>

    

      <ShareRecipeModal
          isOpen={isShareRecipeModalOpen}
          onClose={() => setIsShareRecipeModalOpen(false)}
          onSubmit={shareRecipe}
        recipe={ recipe }
          contentLabel="Share Recipe Modal"
      />
    </>
  );
}

export default RecipeDetails;
