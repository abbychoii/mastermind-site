# Getting Started with Mastermind

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

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Running Mastermind backend flask server 
Flask backend server for the mastermind game to handle code generation and verify guesses. 

### Create virtual environment
Navigate to the project directory (cd mastermind): 
```console 
## create a virtual environment
python3 -m venv venv

## activate virtual environment
source venv/bin/activate 

## install packages
pip install -r requirements.txt

## when deactivating virtual environment: 
deactivate
```

## Create Databases
PostgreSQL was used for the database in this project. 
```console
createdb mastermind
```
### .env file to connect to database 
Create a .env file in the mastermind folder and enter the following: 
`SQLALCHEMY_DATABASE_URI=postgresql+psycopg2://postgres:postgres@localhost:5432/mastermind`
  * Depending on what port is used, 5432 may be a different number 
  * If you name the database something other than mastermind, then mastermind should be changed to the database name!7

## Run Flask Server 
Apply migrations to database: <br>
`flask db upgrade`    
Navigate to project folder (mastermind) <br>
`flask run`

## Mastermind Site Overview 
The Mastermind site serves as a way to play the Mastermind code-breaking game in a single-player mode. There are 3 pre-set difficulty levels and the option to customize the length of the code (2-10), as well as the number of guesses (2-20). 

Users will be receive feedback upon each guess, and if struggling to decipher the code, hints can be received. These hints will inform users on whether their guess is greater than or less than the code! 

Note: There is logic in the frontend to mitigate bad inputs, as well as logic on the backend to verify inputs and deals with errors. 

### Project Direction 
#### MVP
I originally started with a command line python script that I used to step through what things I needed to consider to implement this game. I focused on how to calculate the number of correct digits and location in the code, as well as input validation (checking for valid guesses). I wanted to make the game a little more user friendly, thus, created this site that can be used to play the game. 

The primary focus was completing the MVP of a relatively simple site that would include a way to generate a random number combination and a way to submit guesses and receive feedback. The game was implemented for a single player. 

#### Additional Features
1. Customizable difficulty levels, including 3 presets
   1. Easy (4 digit code, 10 guesses)
   2. Medium (5 digit code, 10 guesses)
   3. Hard (6 digit code, 10 guesses)
   4. Custom (2-10 digit code, 2-20 guesses)
2. Option to login/create a user profile that can save the games played and allow you to continue unfinished games
3. Providing hints to help users get closer to the code! 