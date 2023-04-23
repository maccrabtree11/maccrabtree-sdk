# maccrabtree-sdk
Welcome! 


This was a fun project. Currently, there are 4 APIs to hit the movie endpoint - one of them syntactic sugar around the other for convenience, and to show how easy it is to extend these things!

## Setup using this repo

For "npm run test" to work, you will need to set up your .env with BEARER_TOKEN. I'm not giving you mine! 

npm install -> for dependencies


npm run build -> to build everything correctly


npm run test -> to run the jasmine integration tests. MAKE SURE YOU HAVE BEARER_TOKEN SET IN YOUR .env


npm clean -> when you're done!





## Setup using npm and not from this repo
npm install maccrabtree-sdk

### Include the SDK in your index.ts
import { OneRingSdk } from 'maccrabtree-sdk';

### Initialize the client with your bearer token

const client = new OneRingSdk( {
    bearerToken: "Your bearer token here"
 });
 
 
 
 ### Make some calls!
 client.movies.getMovies();
 
 client.movies.getMoviesByName("The Unexpected Journey");
 
 client.movies.getMovies({limit: 2, page: 2});
 
 client.movies.getMovieQuotesById("5cd95395de30eff6ebccde5b");
 
 
 
 
 
