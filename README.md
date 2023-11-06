# Game Template

Template for creating a project with authentication (Node.js/Express.js). 

Specifications:
* Node.js/Express.js Server for backend
* MySql database (can easely be changed to postgreSQL)
* Node Libraries ([check package.json](package.json))

This template includes:
* The script to create the database with user table ([diagram](db_scripts/diagram.png))
* The backend that allows user management. It has authentication using cookie sessions. Existing user endpoints ([API REST documentation](https://docs.google.com/document/d/1StXNSbunIKE6AYA7794nI-ZqJnB4UpnsMSx0l90xTF8/edit?usp=sharing))
    - Register, Login, Logout, Get Profile
    
* A simplified frontend with pages for login in, register and profile page (still with very few information, is just an example)

# Tipical cenarios for this template (very simplified):

---
 ## Cenario 1: Unregistered user wants to create and see his profile
1. The user enters the initial page (login page) that shows the username and password text inputs, a button to login, and a link to the register page.
2. The user presses the link to register. The register page also shows the username and password inputs, a button to register and a link to the login page. 
3. The user fills the name and password and presses the button to register
4. The user then presses the link to go back to login page, fills the username and password and presses the login button. The user will go to his profile page
6. The profile page shows at the top the name of the user and a button to logoff, bellow it currently only show some static text.

## Alternative cenario: The user logs off 
After step 6:

7. The user presses the logout button and returns to the login page
## Alternative cenario: The user is already registered
Skips steps 2 and 3, step 4 becomes:

4. The user fills the username and password and presses the login button

---

