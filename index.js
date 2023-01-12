const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json());

//Variable que contiene los jugadores
const jugadores = [];

//------Constructores

class Jugador {
    constructor (id){
        this.id = id
    }
    asignarElementor(elementor){
        this.elementor = elementor
    }
    actualizarPosicion(x,y){
        this.x = x;
        this.y = y;
    }
}

class Elementor {
    constructor(nombre){
        this.nombre = nombre
    }
}

//-------Peticiones

app.get('/', (req, res) =>{
    res.send('Hola Mundo!')
})

app.get('/unirse', (req, res) =>{
    let id = `${Math.random()}`
    let jugador = new Jugador(id);
    jugadores.push(jugador)
    res.send(jugador.id)
})

app.post('/elementor/:jugadorId', (req,res)=>{
    let id = req.params.jugadorId;
    let element = req.body.elementor;
    let elementor = new Elementor(element)
    let jugadorIndex = jugadores.findIndex((el)=> id == el.id);
    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarElementor(elementor);
    }
    console.log(jugadores);
    res.end();
})

app.post('/elementor/:jugadorId/posicion', (req, res) => {
    let id = req.params.jugadorId;
    const x = req.body.x || 0;
    const y = req.body.y || 0; 
    let jugadorIndex = jugadores.findIndex((el)=> id == el.id);
    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].actualizarPosicion(x,y);
    }   

    const enemigos = jugadores.filter((el) => {return el.id != id})

    res.send({
        enemigos
    })
})

app.listen(3001, () => {
    console.log('Servidor corriendo en puerto 3001')
})