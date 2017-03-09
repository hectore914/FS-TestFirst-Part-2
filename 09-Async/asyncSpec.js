
describe('oneSecondsLater', function() {
  var myValue = 0;
  var onelater;

  beforeEach(function(done) {
    time = Date.now()
    twoSecondsLater(function() {
      myValue += 5;
      onelater = Date.now()
      done();
      //The done function tells our tests that the function in the beforeEach
      //is asyncronous. Jasmine will WAIT until 'done()' is called before running
      //any 'it' blocks, letting us test as if the code were synchronous. 
    })
  })

  it('will run the function passed in as an argument.', function() {
    expect(myValue).toEqual(5);
  })

  it('will wait 3 seconds before running passed in function', function() {
    var diff = (onelater - time)/1000;
    expect(Math.floor(diff)).toEqual(2);
  })
})

describe('getBirthYearOfStarWarsCharacter', function() {
  
  var birthYear;
  var R2D2Id = 3;
  var C3POId = 2;

  //Api call is: http://swapi.co/api/people/CHARACTER_ID
  //You can see the documentation at http://swapi.co/

  //We don't need a beforeEach since we are making separate calls in each it block.

  it('takes a characterId and requests data about that character. Should set the variable birthYear to the birth year of the character.', function(done) {

    getBirthYearOfStarWarsCharacter(R2D2Id, function(data) {
      birthYear = data;
      expect(birthYear).toEqual('33BBY');
      done();
    });
  })

  it('works with different inputs', function(done) {
    getBirthYearOfStarWarsCharacter(C3POId, function(data) {
      birthYear = data;
      expect(birthYear).toEqual('112BBY');
      done();
    });
  })

});

describe('getHomePlanetOfStarWarsCharacter', function() {
  
  var homePlanet;
  var R2D2Id = 3;
  var C3POId = 2;

  //Api call is: http://swapi.co/api/people/CHARACTER_ID
  //You can see the documentation at http://swapi.co/

  //Study the results from the above api call and use that data to then request the home planet's data

  //We don't need a beforeEach since we are making separate calls in each 'it' block.

  it('takes a characterId and requests data about that character. Uses that data to find the name of the character\'s homeworld', function(done) {

    getHomePlanetOfStarWarsCharacter(R2D2Id, function(data) {
      homePlanet = data;
      expect(homePlanet).toEqual('Naboo');
      done();
    });
  })

  it('works with different inputs', function(done) {
    getHomePlanetOfStarWarsCharacter(C3POId, function(data) {
      homePlanet = data;
      expect(homePlanet).toEqual('Tatooine');
      done();
    });
  })

});

describe('getRelatedArtistsBySong', function() {
  //For this call we will use the spotify Api
  //To search for a song, use the url https://api.spotify.com/v1/search/?q={SONGTITLE_HERE}&type=track&limit=1
  //You will get an array of one result
  //Docs: https://developer.spotify.com/web-api/search-item/

  //Once you find the song, you can use the song's artist Id to request a list of artists that are similar
  //https://api.spotify.com/v1/artists/{ARTIST_ID}/related-artists
  //You will get an array of results, use the first one
  //DOCS: https://developer.spotify.com/web-api/get-related-artists/


  it('takes a track title and gets an artist that\'s similar to the track\'s artist', function(done) {
    //Chantaje by Shakira
    getRelatedArtistBySong('Chantaje', function(relatedArtist) {
      expect(relatedArtist).toEqual('Ricky Martin');
      done();
    })
  })

  it('works with different inputs', function(done) {
    //Irreplaceable by Beyonce
    getRelatedArtistBySong('Irreplaceable', function(relatedArtist) {
      expect(relatedArtist).toEqual('Destiny\'s Child');
      done();
    })
  })

  it('can handle spaces in the track\'s title', function(done) {
    //Hint: Have you ever seen '%20' in a url? That's a space!
    //Yellow Submarine by The Beatles
    getRelatedArtistBySong('Yellow Submarine', function(relatedArtist) {
      expect(relatedArtist).toEqual('George Harrison');
      done();
    })
  })


})

describe('asyncMap', function() {
  var relatedArtistsArr;
  
  //The callback passed to asyncFunc is an error first callback
  //meaning that it takes first an error (if any) and then the result

  //These specs make use of getRelatedArtistBySong that you defined for the last group of specs
  //If you are having mysterious troubles, please confirm that your solution for getRelatedArtistBySong is correct.

  var asyncFunc = function(song, callback) { 
    getRelatedArtistBySong(song, function(relatedArtist) {
      callback(null, relatedArtist);
    })
  };

  var songArr = ['Umbrella', 'Teardrops on my guitar', 'Thriller', 'Defying Gravity', 'Jolene', 'Drive By', 'La Camisa Negra'];

  beforeEach(function(done) {
    asyncMap(songArr, asyncFunc, function(err, resultingArr) { //Error first callback that will be passed to asyncFunc
      relatedArtistsArr = resultingArr;
      done();
    })
  })

  it('creates an array of the mapped values generated by the async function, and passes that array into the given callback', function() {
    expect(relatedArtistsArr.length).toEqual(7);
  })

  it('the array contains the artists that are mostly closely related to the artist of the given song ', function() {
    expect(relatedArtistsArr.indexOf('Country Road Band')).toBeGreaterThan(-1);
    expect(relatedArtistsArr.indexOf('Dierks Bentley')).toBeGreaterThan(-1);
    expect(relatedArtistsArr.indexOf('Bacilos')).toBeGreaterThan(-1);
  })

  it('the array contains the related artists IN ORDER.', function() {
    expect(relatedArtistsArr).toEqual(['The Pussycat Dolls', 'Country Road Band', 'Lionel Richie', 'Dierks Bentley', 'Reba McEntire', 'Rob Thomas', 'Bacilos']);
  })

  it('throws an error if the async function generates an error', function(done) {
    
    var asyncFunc = function(song, callback) { 
      getRelatedArtistBySong(song, function(relatedArtist) {
        callback({message: 'Something Went Wrong'});
        //Instead of passing the result into our callback, we are simulating an error.  
      })
    };

    asyncMap(songArr, asyncFunc, function(err, resultingArr) {
      expect(err.message).toEqual('Something Went Wrong');
      done();
    })

  });
  
})
