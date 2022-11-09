const { Router } = require('express');
const axios = require("axios");
const { Pokemon, Tipo } = require("../db")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const server = express()

const router = Router();
// Hacer funciones controladoras que me traigan informacion y despues en la ruta invocarlas


// 1° Funcion → Traer los datos de la api
const getApiInfo = async () => {
    const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon");

    const apiInfo = await apiUrl.data.results.map(e => {
        return {
            name: e.name,
            url: e.url, //NO LO PIDEN, PERO ES LO UNICO QUE TIENE LA API DE POKEMON (POKE API)
            life: e.life,
            attack: e.attack,
            defense: e.defense,
            speed: e.speed,
            height: e.height,
            weight: e.weight,
        }
    })
    return apiInfo;
}

// 2° funcion → Traer los datos de la base de datos
const getDbInfo = async () => {
    return await Pokemon.findAll({
        include: {
            model: Tipo, // Treamos a 'Tipo' para que haga la relacion //Si creo un pokemon y no incluyo este modelo nunca va a traer el pokemon con el tipo
            attributes: ["name"], // ← ↑ y traeme este atributo del modelo 'Tipo'
            through: {
                attributes: [] //Sobre o mediante la tabla atributos
            }
        }
    })
}

// 3° funcion → Traer todos los datos de la api y de la base de datos === Concatenando ambos y devolviendola
const getAllPokemon = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}

// 🎈 Peticiones GET/Pokemon: || Peticion por query
router.get("/pokemon", async (req, res) => {
    const name = req.query.name // ?name=*****
    let pokemonTotal = await getAllPokemon();
    if (name) {                                            //↓ nombre del pokemon
        let pokemonsName = await pokemonTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        // ↓↓ Encontraste algo 
        pokemonsName.length ? res.status("200").send(pokemonsName) : res.status("404").send("NO EXISTE POKEMON CON ESE NOMBRE")
    }
    // ↓ Si no existe un query 
    else {
        res.status("200").send(pokemonTotal)
    }
})

// 🎈 SEGUNDA PETICION PARA VER EL SIGUIENTE PASO // GET/TYPES
router.get("/types", async (req, res) => {
   
})

 
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;



// 55:00
// Repaso