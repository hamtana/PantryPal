import Modal from 'react-modal';
import React, { useState } from 'react';
import axios from "axios";
import './css/showrecipe.css';
import AddRecipeModal from "./modals/AddRecipeModal";
import formatRecipeText from "./formatRecipeText";
import Alert from './modals/alert';

Modal.setAppElement('#root');

function ShowRecipe() {
    const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
    const query = sessionStorage.getItem('currentQuery');
    const [showAlert, setShowAlert] = useState(false); // State for alert visibility
    const [alertMessage, setAlertMessage] = useState(''); // State for alert message


    const saveRecipe = async (data) => {
        try{
            console.log(data);
            await axios.post("/api/createRecipe/", data);
            
            setAlertMessage("Recipe saved successfully!");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000); // Hide alert after 5 seconds
           

        } catch (error) {
            console.error("Error creating recipe:", error);
        }
    };

    const handleSave = async () => {
        setIsRecipeModalOpen(true)
    };




    // Enhanced function to format text with numbered and bullet list items and headers
    // const formatRecipeText = (text) => {
    //     if (text == null)
    //         return null;
    //     // Apply strong formatting for bold text
    //     text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    //     // Format markdown-style headers
    //     text = text.replace(/^##\s+(.*)$/gm, '<h3>$1</h3>');

    //     // Separate the text into lines for individual processing
    //     const lines = text.split('\n');
    //     const formattedLines = lines.map(line => {
    //         if (/^\d+\.\s/.test(line)) { // Matches numbered lines
    //             return `<li>${line.substring(line.indexOf('.') + 1).trim()}</li>`; // Formats as ordered list items
    //         } else if (line.trim().startsWith('*')) { // Matches bullet list items
    //             return `<li>${line.substring(1).trim()}</li>`; // Formats as unordered list items
    //         }
    //         return line;
    //     }).join('\n');

    //     // Encapsulate list items within <ul> or <ol> tags
    //     return { __html: formattedLines
    //         .replace(/<li>(\d+\..*?)<\/li>/gs, '<ol>$&</ol>') // Wrap numbered items in ordered list
    //         .replace(/<li>(?!<ol>.*<\/ol>).*?<\/li>/gs, '<ul>$&</ul>') // Wrap other list items in unordered list
    //     };
    // };


    return (
        <>
            <h2>Recipe Details</h2>
            <div className="recipe-content" dangerouslySetInnerHTML={formatRecipeText(query)}></div>
            <div className="but-con">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => window.location.href = '/createRecipe'}>Back</button>
            </div>

            {showAlert && (
                <Alert message={alertMessage} onClose={() => setShowAlert(false)} />
            )}

            <AddRecipeModal
                isOpen={isRecipeModalOpen}
                onClose={() => setIsRecipeModalOpen(false)}
                onSubmit={saveRecipe}
                contentLabel="Add Recipe Modal"
                defaultRecipe={query}
            />
        </>
    );
}

export default ShowRecipe;
