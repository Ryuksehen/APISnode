import express from 'express'
import cors from 'cors'
import fs from 'fs'
import bodyParser from 'body-parser'
import { pid } from 'process';

const app = express();
app.use(cors())
app.use(bodyParser.json())

const readData = () => {
    try {
        const data = fs.readFileSync('./db.json', 'utf8') // Agregado 'utf8'
        return JSON.parse(data)
    } catch (error) {
        console.error("Error al leer el archivo", error)
    }
}

const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data))
    } catch (error) {
        console.error("Error al escribir el archivo", error)
    }   
}

// Metodo GET

app.get("/", (req, res) => {
    res.send("Bienvenidos a mi primera app con node")
})

app.get("/ww2/", (req, res) => {
    const data = readData();
    res.json(data.p_ww2)
})


app.get("/ww2/:id", (req, res) => {
    const data = readData()
    
    const id = parseInt(req.params.id)
    
    const ww2 = data.p_ww2.find((ww) => ww.id === id)
    
    res.json(ww2)
})

// Metodo POST 

app.post("/ww2", (req, res) => {
    const data = readData()

    // formato del cuerpo de la solicitud
    const body = req.body

    const newPersonaje = {
        id: data.p_ww2.length + 1,
         ...body,
    }

    data.p_ww2.push(newPersonaje)

    writeData(data)

    res.json(newPersonaje)
})

// Metodo PUT

app.put("/ww2/:id", (req, res) => {
    const data = readData()

    const id = parseInt(req.params.id)

    const body = req.body

    const pIndex = data.p_ww2.findIndex((ww) => ww.id === id)

    const pActualizado = {
        ...data.p_ww2[pIndex],
        ...body
    }

    data.p_ww2[pIndex] = pActualizado

    writeData(data)

    res.json(pActualizado)
})

// Metodo DELETE

app.delete("/ww2/:id", (req, res) => {
    const data = readData()
    const id = parseInt(req.params.id)

    data.p_ww2 = data.p_ww2.filter((ww) => ww.id !== id)

    writeData(data)

    res.json( {mensaje: `Personaje con el iD ${id} eliminado correctamente`})
})


app.listen(3000, () => {
    console.log("El servidor está abierto en el puerto 3000")
})
