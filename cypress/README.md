## Cypress Definition: 

Cypress is an end-to-end testing framework for web applications.

## Cypress Installation: 

   To install Cypress, follow the steps below:
   
     Make sure you have Node.js installed on your machine.
     Install Cypress by running the following command:
          - npm install cypress --save-dev
          

##  Cypress Execution:

  To execute Cypress tests, follow the steps below:

    Make sure you are in your test project directory in a terminal window.
    Run the following command to open the Cypress graphical interface:
         - npx cypress open
    Once the Cypress graphical interface is open, click on the test file you want to execute ("login.cy.jsx" or "signup.cy.jsx").
    

##Login Test Scenario :

    - The user navigates to the login page.
    - The user enters an invalid username "Mays" and an invalid password "Mays".
    - The user clicks on the submit button.
    - The system verifies the login information and displays an error message.
    - The system displays a visible error message with the CSS class `.chakra-alert-error`.


##Signup Test Scenario :

    - The user navigates to the signup page.
    - The user enters a username "existing_username", an email address "existing_email@example.com", and a password "password123".
    - The user clicks on the submit button.
    - The system verifies the registration information and displays an error message if the username or email address already exists.
    - The system displays a visible error message with the CSS class `.chakra-alert-error`.

   
