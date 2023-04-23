import "jasmine";
import { OneRingSdk } from "../src/index";
import { GetOptions } from "../src/resources/base";
import * as dotenv from "dotenv";
dotenv.config();

describe("Movies Endpoint", () => {
  let client: OneRingSdk;
  beforeEach(() => {
    const bearerTokenFromEnv = process.env.BEARER_TOKEN;

    expect(bearerTokenFromEnv).withContext("Requires BearerToken").toBeTruthy();

    client = new OneRingSdk({
      bearerToken: bearerTokenFromEnv!
    });
  });

  describe("Get movies api", () => {
    it("should return the big list of movies", async () => {
      const response = await client.movies.getMovies();
      expect(response.total).toEqual(8);
    });


    it("should return paginated results from a list", async () => {
        let options: GetOptions = {};
        options.limit = 2;
        options.pageNumber = 2;
        const response = await client.movies.getMovies(options);
        expect(response.limit).toEqual(2);
        expect(response.page).toEqual(2);
    })

});

  describe("Get one movie with options / by name", () => {
    it("should return only one movie when a name option is supplied via options", async () => {
        const response = await client.movies.getMovies({ filters: [{ prop: "name", value: "The Unexpected Journey" }] });
        expect(response.docs).toHaveSize(1);
        expect(response.docs[0].name).toEqual("The Unexpected Journey");
    });

    it("should return only one movie when a name is supplied via direct API", async () => {
        const response = await client.movies.getMovieByName("The Unexpected Journey");
        expect(response.docs).toHaveSize(1);
        expect(response.docs[0].name).toEqual("The Unexpected Journey");
    });

  });

  describe("Get movie by ID", () => {
    it("should return one movie's details when an ID is supplied", async () => {
        const response = await client.movies.getMovieById("5cd95395de30eff6ebccde59");
        expect(response.docs).toHaveSize(1);
        expect(response.docs[0].name).toEqual("The Desolation of Smaug");
    });
  });

  describe("Get quotes for a movie by ID", () => {
    it("Should return all quotes for one movie", async () => {
        const response = await client.movies.getMovieQuotesById("5cd95395de30eff6ebccde5b");
        expect(response.docs.length).toBeGreaterThan(1);
    });
  })


});
