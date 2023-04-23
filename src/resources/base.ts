import fetch from "isomorphic-unfetch";

type Config = {
  bearerToken: string;
  baseUrl?: string;
};

//Generic response shape for all APIs. Each API returns a different object in docs, but other data is standard
export declare interface Response<T> {
  docs: T[];
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
}

/**Options for extra filtering/pagination for APIs. */
export declare interface GetOptions {
  /**Limit particular request to a certain number */
  limit?: number;

  /**In case of earlier pagination, get the next page to be supplied */
  pageNumber?: number;

  /**In case of pagination, offset the array starting point */
  offSet?: number;

  /** Supply one or many search/filter criteria. Currently only supports '=' operator
       for certain types. for example, {prop: 'name', value: 'The Unexpected Journey'} will
       filter a getMovies() request to only that movie!
    */
  filters?: Filters[];
}

/** The shape each filter should have - a prop to filter on and the value to supply */
export declare interface Filters {
  /*Can only be a select number of props */
  prop: FilterableProps;

  //comparator: string;

  /*Value to supply to the right hand of the operator to match on*/
  value: string;
}

/** Only these types may be filtered on */
export declare type FilterableProps =
  | "name"
  | "runtimeInMinutes"
  | "budgetInMillions"
  | "boxOfficeRevenueInMillions"
  | "academyAwardNominations"
  | "academyAwardWins"
  | "rottenTomatoesScore"
  | "character"
  | "movie";

export abstract class Base {
  private bearerToken: string;
  private baseUrl: string;

  constructor(config: Config) {
    this.bearerToken = config.bearerToken;
    //allow for URL changes for testing/DI
    this.baseUrl = config.baseUrl || "https://the-one-api.dev/v2";
  }

  /**
   * Generic request base function. Handles building out the request params supplied, caller only really needs a resource to hit.
   *
   * @param endpoint - resource endpoint to hit
   * @param getOptions - options to be included in this get request, filtering/pagination/etc
   * @param initOptions - standard requestInit options, optional
   * @returns - promise for data fetched
   */
  protected request<T>(
    endpoint: string,
    getOptions?: GetOptions,
    initOptions?: RequestInit
  ): Promise<T> {
    let url = `${this.baseUrl}${endpoint}?`;
    url += this.buildRequestURL(getOptions)?.toString();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.bearerToken}`
    };

    const config = {
      ...initOptions,
      headers
    };

    //TODO: Create error type for statuses
    return fetch(url, config).then((response) => {
      if (response.ok) {
        return response.json() as T;
      }
      throw new Error(response.statusText);
    });
  }

  /**
   * Builds the end of the query given parameters from the user
   * @param options Options object to be parsed out and supplied as search params at end of request API
   * @returns
   */
  protected buildRequestURL(options?: GetOptions): URLSearchParams {
    const urlWithParams = new URLSearchParams();

    //I think there's a cute meta-looping function to be able to go over each prop, but hardcoding for now
    if (options?.limit != undefined)
      urlWithParams.append("limit", options.limit.toString());
    if (options?.pageNumber != undefined)
      urlWithParams.append("page", options.pageNumber.toString());
    if (options?.offSet != undefined)
      urlWithParams.append("offset", options.offSet.toString());

    //apply filter values
    //TODO: tried to extend this by having "operator" be a parameter as well. it turns into
    //a lot of string manipulation. So, very doable to add boxOffice < 1000, etc, but axing for time. Only = operator supported via
    //append operation
    if (options?.filters?.length) {
      for (let filter of options.filters) {
        urlWithParams.append(filter.prop, filter.value);
      }
    }
    return urlWithParams;
  }
}
