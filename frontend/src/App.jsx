import React from 'react';
import Login from './login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cookies from "universal-cookie";
import PantryGrid from './pantry';
import CreateAccount from './createaccount';
import logo from "./images/pantrypal-logo.png";
import CreateRecipe from "./createrecipe"
import ShowRecipe from "./showrecipe"
import RecipesGrid from "./recipes";
import RecipeDetails from "./recipedetails"
import SharedRecipesGrid from "./sharedrecipes"
import MarkAsCreated from "./markascreated"
import EditProfileGrid from "./editprofile"
import GiveFeedback from "./feedback"
import axios from "axios";
import './App.css';


const cookies = new Cookies();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: "",
      isAuthenticated: false,
      menuVisible: false,
      currentUser: null,
    };
  }

  componentDidMount = () => {
    this.getSession();
    this.getCurrentUser();
  }


// Get Session Method
  getSession = () => {
    //// Make a GET request to the "/api/session/" URL with "same-origin" credentials
    fetch("/api/session/", {
      credentials: "same-origin",
    })
    .then((res) => res.json()) //// Parse the response as JSON
    .then((data) => {
      //console.log(data); // Log the response data to the console
      //// If the response indicates the user is authenticated
      if (data.isAuthenticated) {
        this.setState({isAuthenticated: true, username: "", password: "", error: ""},
          () => {
            this.getCurrentUser();
          }); // Update the component's state
      } else {  // If the response indicates the user is not authenticated
        this.setState({isAuthenticated: false, username: "", password: "", error: ""}); // Update the component's state
      }
    })
      //// Handle any errors that occurred during the fetch
    .catch((err) => {
      console.log(err);
    });
  }

//Who Am I method
  whoami = () => {
    fetch("/api/whoami/", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("You are logged in as: " + data.username);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //Logout Method
  logout = () => {
    fetch("/api/logout", {
      credentials: "same-origin",
    })
    .then(this.isResponseOk)
    .then((data) => {
      console.log(data);
      this.setState({isAuthenticated: false});
      window.location.href = "/"
    })
    .catch((err) => {
      console.log(err);
    });
  };

  //Delete Account Method
  deleteAccount = () => {
    if(window.confirm("Are you sure you want to delete your account?")) {
      fetch("/api/deleteAccount", {
        credentials: "same-origin",
      })

    .then(this.isResponseOk)
    .then((data) => {
      console.log(data);
      this.setState({isAuthenticated: false});
      window.location.href = "/"
    })
    .catch((err) => {
      console.log(err);
    });
    }
  };

  toggleMenu = () => {
    this.setState({menuVisible: !this.state.menuVisible});
    document.body.classList.toggle('side-nav-open', this.state.menuVisible);
  };

   closeMenu = () => {
      this.setState({menuVisible:false});  // Set menu to not visible
   };

  getCurrentUser = async () => {
    try {
      const response = await axios.get("/api/getCurrentUser/")
      this.setState({currentUser:response.data})
    } catch (error){
      console.log("Error in display session and pfp in navbar: ", error)
    }
  }

  // This should call getCurrentUser for the session navbar display to show.
  handleSuccessfulLogin = () => {
    this.setState({isAuthenticated: true}, () => {
      this.getCurrentUser();
    });
  }


  // UI Rendering using bootstrap
    render() {
        if (!this.state.isAuthenticated) {
            return(
                <Router>
                    <Routes>
                        <Route path="/" element={<Login app={this} cookies={cookies} onLoginSuccess={ this.handleSuccessfulLogin} /> } />
                        <Route path="/createAccount" element={<CreateAccount cookies={cookies}/>} />
                        <Route path ="*" element={<span onClick={() => window.location.href = '/'}>404 Go back</span>} />
                    </Routes>
                </Router>
            )
          }
          return(
            <>
            <header>
              <nav className="navbar">
                        <div className="menu-button" onClick={this.toggleMenu}>☰</div>
                        <div className="logo-container">
                            <a href="/"><img src={logo} alt="PantryPal Logo" className="logo" /></a>
                        </div>
                        <div className="session-container">
                          {this.state.currentUser && (
                            <>
                              {this.state.currentUser.profile.picture && (
                                <img
                                  src={this.state.currentUser.profile.picture}
                                  alt="Profile"
                                  className="profile-pic"

                                />
                              )}
                              <span>Hi, {this.state.currentUser.user.username}</span>
                            </>
                          )}
                        </div>
              </nav>

            </header>


                <div id="side-menu" className="side-nav" style={{ width: this.state.menuVisible ? '250px' : '0' }}>
                    <a href="javascript:void(0)" className="closebtn" onClick={this.closeMenu}>&times;</a>
                    <a href="/" className="active">My Pantry</a>
                    <a href="/createRecipe">Create Recipe</a>
                    <a href="/recipes">My Recipes</a>
                    <a href="/sharedRecipes">Shared Recipes</a>
                    <a href="/editProfile">Edit Profile</a>
                    <div className="nav-bottom">
                        <a onClick={this.logout}>Log Out</a>
                        {/* <a onClick={this.deleteAccount}>Delete Account</a> */}
                    </div>
                </div>

                <div className="main-content">
                  <Router>
                      <Routes>
                            <Route path="/" element={ <PantryGrid />} />
                            <Route path="/createRecipe" element={ <CreateRecipe />} />
                            <Route path="/ShowRecipe" element={ <ShowRecipe />} />
                            <Route path="/recipes" element={ <RecipesGrid />} />
                            <Route path="/recipes/:id" element={ <RecipeDetails />} />
                            <Route path="/markAsCreated/:id" element={ <MarkAsCreated />} />
                            <Route path="/sharedRecipes" element={ <SharedRecipesGrid /> } />
                            <Route path="/editProfile" element={ <EditProfileGrid /> } />
                            <Route path="/feedback/:id" element={ <GiveFeedback /> } />
                            <Route path="/sharedRecipe/:id" element={ <GiveFeedback /> } />
                            <Route path ="*" element={<span onClick={() => window.location.href = '/'}>404 Go back</span>} />
                      </Routes>
                  </Router>
                </div>

            </>
        );
    }
}

export default App;
