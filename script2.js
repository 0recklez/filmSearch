function getUniquePlanets(filmTitle) {
    return fetch(`https://swapi.dev/api/films/?search=${filmTitle}`)
        .then((response) => response.json())
        .then((json) => {
            const characters = json.results[0].characters.slice(0, 10);

            return Promise.all(
                characters.map(person =>
                    fetch(person).then(response => response.json())
                ))
        })

        .then((characters) => {
            return Promise.all(
                characters.map((chel) => {
                    return fetch(chel.homeworld)
                        .then(response => response.json())
                        .then(planet => ({
                            name: planet.name,
                            character: chel.name
                        }))
                }
                )
            )
        })
        .then(result => {
            let planets = {};
            result.forEach((planet) => {
                if (!planets[planet.name]) {
                    planets[planet.name] = []
                }
                planets[planet.name].push(planet.character)
            })
            console.log(planets)
            return planets
        })
}

getUniquePlanets('A New Hope');
