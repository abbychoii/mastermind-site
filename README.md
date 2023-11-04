# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running Mastermind Site
Navigate to project directory (`cd mastermind-site`):
```console 
## Depending on package manager used
yarn install 
npm install

## Run Development Server
yarn start
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Mastermind Site Overview 
The Mastermind site serves as a way to play the Mastermind code-breaking game in a single-player mode. There are 3 pre-set difficulty levels and the option to customize the length of the code (2-10), as well as the number of guesses (2-20). 

Users will be receive feedback upon each guess, and if struggling to decipher the code, a total of 3 hints can be received.

Note: There is logic in the frontend to mitigate bad inputs, as well as logic on the backend to verify inputs and deals with errors. 
