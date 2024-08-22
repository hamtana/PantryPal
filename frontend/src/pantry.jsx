import React, { useState } from 'react';
import './css/pantrypage.css';  // Assuming your CSS is adapted for React

function PantryGrid() {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);  // Toggle visibility state
    };

    const closeMenu = () => {
        setMenuVisible(false);  // Set menu to not visible
    };

    return (
        <>
            <header>
                <nav className="navbar">
                    <div className="menu-button" onClick={toggleMenu}>☰</div>
                    <div className="logo-container">
                        <a href="/"><img src="/images/pantrypal-logo.png" alt="PantryPal Logo" className="logo" /></a>
                    </div>
                </nav>
            </header>
            <main>
                <h2>What's in your pantry?</h2>
                <div className="pantry-grid">
                    {/* You can map through an array of items instead of hardcoding them */}
                    {/* Example of one item */}
                    <div className="item">
                        <img src="images/milk.jpg" alt="Milk" />
                        <span>Milk</span>
                        <span>500ml</span>
                        <div className="item-buttons">
                            <button onClick={() => window.location.href = 'editIngredient.html'}>Edit</button>
                            <button onClick={() => window.location.href = 'deleteIngredient.html'}>Delete</button>
                        </div>
                    </div>
                    {/* Repeat for other items */}
                    <div className="item" onClick={() => window.location.href = 'addingredients.html'} style={{ cursor: 'pointer' }}>
                        <h4>Add Ingredient</h4>
                    </div>
                </div>
                <div className="button-container">
                    <button onClick={() => window.location.href = 'newrecipe.html'}>Let's Get Baking!</button>
                </div>
            </main>
            <div id="side-menu" className="side-nav" style={{ width: menuVisible ? '250px' : '0' }}>
                <a href="javascript:void(0)" className="closebtn" onClick={closeMenu}>&times;</a>
                <a href="/pantrypage" className="active">Pantry</a>
                <a href="/newrecipe">New Recipes</a>
                <a href="/myrecipes">My Recipes</a>
                <div className="nav-bottom">
                    <a href="/login">Log Out</a>
                    <a href="/login">Delete Account</a>
                </div>
            </div>
        </>
    );
}

export default PantryGrid;