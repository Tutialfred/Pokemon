const { Router } = require('express');
const axios = require("axios");
const { Characterr, Occupation } = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const server = express()

const router = Router();
// Hacer funciones controladoras que me traigan informacion y despues en la ruta invocarlas


// 1° Funcion → Traer los datos de la api
const getApiInfo = async () => {
    const apiUrl = await axios.get("https://breakingbadapi.com/api/characters");

    const apiInfo = await apiUrl.data.map(e => {
        return {
            name: e.name,
            img: e.img,
            nickname: e.nickname,
            status: e.status,
            id: e.char_id,   
            occupation: e.occupation.map(e => e),
            birthday: e.birthday,
            appearance: e.appearance.map(e => e),
          
        }
    })
    return apiInfo;
}

// 2° funcion → Traer los datos de la base de datos
const getDbInfo = async () => {
    return await Characterr.findAll({
        include: {
            model: Occupation, // Treamos a 'ocupation' para que haga la relacion //Si creo un character y no incluyo este modelo nunca va a traer el character con el ocupation
            attributes: ["name"], // ← ↑ y traeme este atributo del modelo 'Tipo'
            through: {
                attributes: [] //Sobre o mediante la tabla atributos
            }
        }
    })
}

// 3° funcion → Traer todos los datos de la api y de la base de datos === Concatenando ambos y devolviendola
const getAllCharacter = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}

// 🎈 Peticiones GET/character: || Peticion por query === /pokemons && ?name=".."
router.get("/characters", async (req, res) => {
    const name = req.query.name // ?name=*****
    let characterTotal = await getAllCharacter();
    if (name) {                                            //↓ nombre del pokemon
        let chatacterName = await characterTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase())) //includes → por el ejemplo si busco 'jose' y tengo un 'maria jose' === todo lo que le incluya al medio, atras , todo!

        // ↓↓ Encontraste algo 
        chatacterName.length ? res.status("200").send(chatacterName) : res.status("404").send("NO EXISTE CHARACTER CON ESE NOMBRE") 
    }
    // ↓ Si no existe un query 
    else {
        res.status("200").send(characterTotal)
    }
})

// 🎈 Peticion GET / occupation === types
router.get("/occupations", async (req, res) => { // Una vez que las traigamos la guardamos en la base de datos y trabajamos desde alli
    const occupationApi = await axios.get("https://breakingbadapi.com/api/characters") //Hacemos la peticion a la API
        const occupation = await occupationApi.data.map(e => e.occupation) //Mapeamos a 'occupation'
    const occEach = occupation.map(e => { //Un mapeo de cada ocupacion
        for (let i = 0; i < e.length; i++) return e[i]
    }) //iterar sobre cada elemento
    occEach.forEach(e => { //Para cada uno de esos entra el modelo 'Occupation'
        Occupation.findOrCreate({
            where: { name : e }
        })  
    })
    const allOccupation = await Occupation.findAll(); //Una vez que recorres todos y lo guardamos en la base de datos , las llamamos y despues ↓ las mandamos 
    res.send(allOccupation)

    // Me traigo la informacion de la API para guardarla en la base de datos y sacarla desde la base de datos
})

// 🎈 Peticion POST / character === pokemons
router.post("/characters", async (req, res) => {
    try {

        let { name,
            nickname,
            birthday,
            status,
            image,
            createInData,
            occupation
        } = req.body; //Hacemos el post con todo lo que nos llega por body === nos llega esto por body

        let characterCreated = await Characterr.create({ //CREAR EL PERSONAJE
            //NO VA 'occupation' por que hay ser la relacion aparte
            name,
            nickname,
            birthday,
            status,
            image,
            createInData,
            
            // Con estos datos creamos el personaje
        })

        let occupationDb = await Occupation.findAll({ //Encontrar en mi modelo de 'Occupation' todas las que coincidan con el nombre que llega por body
            // DENTRO DE ESTE MODELO ENCONTRA TODA LAS OCUPACIONES QUE COINCIDAN CON ESTO QUE LE ESTOY PASANDO POR BODY
            where: { name : occupation } //← occupation que llega por el body
        })

        //Traerme de la tabla ↓ esto que le paso por parametro
        characterCreated.addOccupation(occupationDb)
        res.send("Personaje creado exito")

    } catch (error) {
        res.send(error)
        console.log(error);
    }
})

// 🎈 Peticion GET / id
router.get("/characters/:id", async (req, res) =>{
    const id = req.params.id
    const characterTotal = await getAllCharacter()

    if(id){
        let characterId = await characterTotal.filter(e => e.id == id)
        characterId.length ? 
        res.status(200).send(characterId) :
        res.status(404).send(`No se encontro un personaje con el ID ${id}`)
    }
})




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;



// 01:10:00
// Repaso