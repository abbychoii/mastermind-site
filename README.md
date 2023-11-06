# Getting Started with Mastermind

## Mastermind Site Overview 
The Mastermind site serves as a way to play the Mastermind code-breaking game in a single-player mode. There are 3 pre-set difficulty levels and the option to customize the length of the code (2-10), as well as the number of guesses (2-20). 

Users will be receive feedback upon each guess, and if struggling to decipher the code, hints can be received. These hints will inform users on whether their guess is greater than or less than the code! 

Note: There is logic in the frontend to mitigate bad inputs, as well as logic on the backend to verify inputs and deals with errors. 

The main branch of this repo is deployed and hosted on heroku at: https://masterminds-9a215e501a94.herokuapp.com/

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