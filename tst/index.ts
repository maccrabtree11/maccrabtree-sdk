import { OneRingSdk } from "../src/index";
import { GetOptions } from "../src/resources/base";
import * as dotenv from "dotenv";
dotenv.config();

function runIntegTests() {
  const bearerTokenFromEnv = process?.env.BEARER_TOKEN;
  if (bearerTokenFromEnv == "undefined" || bearerTokenFromEnv == "") {
    console.error(
      "Please set your bearer token in the process env as BearerToken"
    );
    return;
  } else {
    const client = new OneRingSdk({
      bearerToken: bearerTokenFromEnv || ""
    });

    let options: GetOptions;

    client.movies
      .getMovies()
      .then((movies) => {
        console.log(movies);
      })
      .catch();

    client.movies
      .getMovieById("5cd95395de30eff6ebccde5c")
      .then((movie) => {
        console.log(movie);
      })
      .catch();

    client.movies
      .getMovieQuotesById("5cd95395de30eff6ebccde5c")
      .then((movie) => {
        console.log(movie);
      })
      .catch();

    client.movies.getMovieByName("The Unexpected Journey").then((movie) => {
      console.log(movie);
    });
  }
}

runIntegTests();
