# TODO App.

This app is a SPA developed with Javascript that allows you to create to-do items and folders to
group them.

The Backend was developed with NodeJs using Express.
The Database was created using Prisma ORM and Sequelize.
The Frontend was created with ReactJs and Redux for the state management.

## Requirements
To run this app you need to execute the bash script "apprun" , this will install all dependencies you need and start the app. 

Server on port 3001.
Client on port 3000.

The app is connected to a postgres heroku database.

You **need** NPM 8.1.2

The scripts will install different dependencies for api and client:

API:

    "@prisma/client": "^3.12.0",
    "axios": "^0.26.1",
    "bcrypt": "^5.0.1",
    "express": "^4.17.3",
    "nodemon": "^2.0.15"
    
CLIENT:

    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^12.1.4",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^0.26.1",
    "bootstrap": "^5.1.3",
    "react": "^18.0.0",
    "react-bootstrap": "^2.2.3",
    "react-dom": "^18.0.0",
    "react-icons": "^4.3.1",
    "react-redux": "^7.2.8",
    "react-router-dom": "^5.3.0",
    "react-scripts": "5.0.0",
    "redux": "^4.1.2",
    "redux-devtools-extension": "^2.13.9",
    "redux-thunk": "^2.4.1",
    "web-vitals": "^2.1.4"
    
## App 
The landing page its a login system, you can create a new user (password will be encrypted in the database) or try it with this user:

Email: **usertest@user.com**

Password: **user1234**

## Deploy

You can simply use the app deployed, the user and database are the same. 

https://todo-manager-app.vercel.app/
