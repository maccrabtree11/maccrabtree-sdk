import { Movies } from "./resources/movie";

export class OneRingSdk {
  movies: Movies;
  //characters: Characters;
  //quotes: Quotes;


  constructor(config: { bearerToken: string; baseUrl?: string }) {
    this.movies = new Movies(config);

    //this.characters = new Characters(config), etc
  }
}
