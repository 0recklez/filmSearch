function getCharacters(filmTitle) {
    return fetch(`https://swapi.dev/api/films/?search=${filmTitle}`)
        .then((response) => response.json())
        .then((json) => {
            const characters = json.results[0].characters.slice(0, 10);


            return Promise.all(
                characters.map(person => 
                    fetch(person).then(response => response.json())
                ))


        })
        .then(characters => console.log(characters));
}

getCharacters('A New Hope')