# QuizGPT CMS Frontend Setup

## Set up Auth0

### Instructions:

Register an application with Auth0 at https://auth0.com/. The CMS frontend and backend will use the same application. In the application settings panel, note down the *domain* and *client id*.

Under *Application URIs*, find the text areas for *Allowed Callback URLs*, *Allowed Logout URLs*, and *Allowed Web Origins*. Add the 

## Set environmental variables

### Set:

<span style="color: gray">\# Must be suffixed with "/api"</span> \
``VITE_APP_API_URL=http://localhost:5001/api`` \
<span style="color: gray">\# Must be the same as that of the CMS backend</span> \
``VITE_AUTH0_DOMAIN=`` \
``VITE_AUTH0_CLIENT_ID=`` \
``VITE_AUTH0_REDIRECT_URI=http://localhost:3000`` \
<span style="color: gray">\# Can be named arbitrarily but must be the same value as that of the CMS backend</span> \
``VITE_AUTH0_AUDIENCE=quiz-app-api``

## Install dependencies

### Run:

``npm install``

## Start the server

### Run:

``npm run dev``