import { Base, Response, GetOptions } from "../base";
import { Movie, MovieResourceName } from "./types";
import { Quote, QuoteResourceName } from "../quote/types";

/**
 * For all your LOTR movie needs!
 * This includes an example helper/combo/sugar call to show that we can get creative if it helps the user out!
 * This can support getting all movies, getting one particular movie, finding a movie by name, getting movie quotes,
 * pagination/limits/offsets, and filtering on specific traits as you see fit!
 */
export class Movies extends Base {
  /** Given a particular movie ID string, return the rich Movie object associated (with standard response metadata)
   *
   * @param id - String ID of the movie in the database
   * @returns A promise of the generic response object with movie data fetched, otherwise error
   **/
  async getMovieById(id: string): Promise<Response<Movie>> {
    return this.request(`/${MovieResourceName}/${id}`);
  }

  /** Return all movies, with options for pagination/limits/offsets, and request parameters (for example, supplying a specific name, or runtime)
   *
   * @param options? - optional object containing options for pagination, offsets, limits, searching, and filtering
   * @returns list of movies in the database matching options (default: all)
   */
  async getMovies(options?: GetOptions): Promise<Response<Movie>> {
    return this.request(`/${MovieResourceName}`, options);
  }

  /** Given the name of a movie, return the movie details.
        For example: getMovieByName("The Unexpected Journey") -> return details for your favorite hobbit movie
        @param name - string name of movie to be fetched (i.e. "The Unexpected Journey"). Function will handle encoding spaces
        @returns Promise containing movie to be fetched in standard response object
    */
  async getMovieByName(name: string): Promise<Response<Movie>> {
    const options: GetOptions = { filters: [{ prop: "name", value: name }] };
    return this.getMovies(options);
  }

  /** Given a movie's ID string, return all quotes associated with said movie
     Supports pagination/limits/offset, and request parameters via Options object
     @param id - id of movie quotes should be fethed from
     @param options - options object containing values to be filtered on, as well as pagination/limits
     */
  async getMovieQuotesById(
    id: string,
    options?: GetOptions
  ): Promise<Response<Quote>> {
    return this.request(
      `/${MovieResourceName}/${id}/${QuoteResourceName}`,
      options
    );
  }
}
