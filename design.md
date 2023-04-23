I had a fun time thinking this one through! What I found as I went deeper and deeper was more and more base logic to extract into base classes/interface etc. I'll step through some of the thinking:



##High-Level
Tried to stick to classic nodey/typescript. The endpoints are organized into separate resource folders. 
Based off of movies and quotes you can see how we'd extend out types to the other endpoints.

The main client library also shows how we'd extend to additional API resources to call from.
The base class, base, handles defining the generic typings that every request follows, as well as building out the request parameters string before hitting the endpoint.

You'll notice that aside from the bearer token (in a perfect world: obtained from a secrets manager), base url is an option. I wanted to leave the door open for dependency injection/spinning up a localhost/mock/what have you. Didn't get to it for time constraints but that's the idea.








##Testing
Aside from manual tests, and creating a few index files to play around (left in tst/index.ts as a sample of how to call things), I pulled in jasmine to write some integration style tests, runnable with npm run test.

As mentioned in the high-level, ideally some DI could come into play to decouple from needing the real endpoint to test against data. Could've done mock data, or localhost, many options, that I didn't get time to explore from timeboxing myself.



##Considered, not done for time
* Adding in a lot more validation. Both on parameters (things like ID in the right shape, limit,offset,page are reasonable and defined), and on the response types and error codes. 
* Right now the error from the API itself is surfaced. I myself love it when an SDK surfaces more helpful errors and figures out things that can go wrong beforehand, but there's something to be said about the control that leaving this to the consumer has
* A lot more abstraction/syntactic sugar APIs. I did the movies by name to show how well the GetOptions object works out at being reusable, but I had to stop myself from creating sooo many helpful ones. I had ideas like: Handling paging for the user (something like python yield pagination), hydrating the character names in the quotes, way more cute little "Get high grossing movies", etc. All cool things, all easy to do, just timeboxed off.
* On the topic of limits/filters, urlRequestParams standard library appends things as key=value. I left some skeleton code for this being a real operator instead of =, which turned into a bunch of string manipulation and a timesync. Small tweak, and that gives us boxOffice<10 type params as well. Good idea, worth doing, timeboxed off
* Lastly, I know there's a cuter way to do the "filterableParams". I believe it's keyof, but I couldn't quite get the syntax right, and instead spent that time on unit tests. I don't love that it creates 2 lists of properties to maintain either :)



