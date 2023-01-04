//--------------------------------Sección de Variables---------------------------------------------

function traer (id){
    return document.getElementById(id)
}

    //--------------INICIO
    let totalElementores = []
    const elementores = traer('elementores');
    const seccionAtaque = traer('select-atack');
    const seccionReinicio = traer('replay');
    const seccionDerrota = traer('derrota');
    const mascotaJugador = traer('btn-seleccion');
    const ataqueDebil = traer('btn-atc1');
    const ataqueMedio = traer('btn-atc2');
    const ataqueFuerte = traer('btn-atc3');
    const ataqueEspecial1 = traer('btn-esp1');
    const ataqueEspecial2 = traer('btn-esp2');
    const ataqueEspecial3 = traer('btn-esp3');
    let especialSanar = false;
    let especialAtaque = false;
    let especialDefensa = false;
    const reinicio = traer('reinicio');

    //-------------SELECCION
    const divPresentacionPC = traer('present-PC');
    const divNombreElemPC = traer('nombre-elem-pc');
    const divPresentacionJd = traer('present-jugador');
    const imagenPresentJd = traer('img-present-Jd');
    const imagenPresentPC = traer('img-present-PC');
    const seccionElementor = traer('elementores');
    const seleccion1 = traer('seleccion1');
    const seleccion2 = traer('seleccion2')
    // const botonArriba = traer('btn-mover-arriba')
    // const botonIzquierda = traer('btn-mover-izquierda')
    // const botonDerecha = traer('btn-mover-derecha')
    // const botonAbajo = traer('btn-mover-abajo')

    //------------MENSAJERÍA
    const seccion = traer('actions');
    const contadorVidasPC = traer('vidas-pc');
    const contadorVidasJd = traer('vidas-jugador');

    //------------MAPA
    const seccionMapa = traer('ver-mapa');
    const mapa = traer('mapa');
    let lienzo = mapa.getContext('2d');
    let interval;
    let mapaBackground = new Image();
    mapaBackground.src = 'https://i.pinimg.com/564x/e7/ee/e6/e7eee60474d03e2b31f76707e14e626a.jpg';
    let anchoMapa = window.innerWidth - 100;
    anchoMapa < 630 ? anchoMapa += 80 : anchoMapa;
    let alturaMapa = anchoMapa * 100 / 200;
    mapa.width = anchoMapa;
    mapa.height = alturaMapa;
    let altoFoto = 80;
    let anchoFoto = 60;
    let posicionJugador = [200, 200];
    let posicionFluxo = [700,200];
    let posicionTerracore = [460, 140];
    let posicionIgneo = [440, 350];

    console.log(anchoMapa, alturaMapa)

    if(anchoMapa < 630){
        anchoMapa -= 80
        altoFoto = 50; anchoFoto = 50; posicionJugador = [20, 20];
        posicionFluxo = [250, 60]; posicionTerracore = [150, 20]; posicionIgneo = [150, 120];
    }
    else if(anchoMapa > 1100 && anchoMapa < 1500){
        altoFoto = 110; anchoFoto = 80; posicionJugador = [220, 250]
        posicionFluxo = [950, 250]; posicionTerracore = [600, 150]; posicionIgneo = [550, 475];
    }
    else if(anchoMapa > 1500){
        altoFoto = 140; anchoFoto = 100; posicionJugador = [350, 400]
        posicionFluxo = [1350, 350]; posicionTerracore = [800, 200]; posicionIgneo = [800, 600];
    }
    

    

//--------------------------------------Clases-------------------------------------------------------------------
class Elementor {
    constructor(nombre, imagen, vida, x = posicionJugador[0], y = posicionJugador[1]){
        this.nombre = nombre
        this.imagen = imagen
        this.vida = vida
        this.ataques; this.especiales; this.defensa
        this.x = x; this.y = y; this.alto = altoFoto; this.ancho = anchoFoto
        this.mapaImagen = new Image(); this.mapaImagen.src = imagen
        this.velocidadX = 0; this.velocidadY = 0
        this.pintar = () =>{
            lienzo.drawImage(this.mapaImagen, this.x, this.y, this.ancho, this.alto)
        }
    }
}

class AtaqueEspecial {
    constructor(tipo, nombre, efecto, valor){
        this.tipo = tipo
        this.nombre = nombre
        this.efecto = efecto
        this.valor = valor
    }
}

let elFluxo = new Elementor('Fluxo', 'https://i.pinimg.com/564x/7f/84/ee/7f84ee4374111e02747aeb9a1c57af62.jpg', 24)
let elTerracore = new Elementor('Terracore', 'https://i.pinimg.com/564x/0c/41/b6/0c41b64d7a65b01028c19be6e59a0cc6.jpg', 24)
let elIgneo = new Elementor('Igneo', 'https://i.pinimg.com/564x/1a/f3/33/1af333c4afddfc4552db741f341c5303.jpg', 24)

let enFluxo = new Elementor('Fluxo', 'https://i.pinimg.com/564x/7f/84/ee/7f84ee4374111e02747aeb9a1c57af62.jpg', 24, posicionFluxo[0], posicionFluxo[1])
let enTerracore = new Elementor('Terracore', 'https://i.pinimg.com/564x/0c/41/b6/0c41b64d7a65b01028c19be6e59a0cc6.jpg', 24, posicionTerracore[0], posicionTerracore[1])
let enIgneo = new Elementor('Igneo', 'https://i.pinimg.com/564x/1a/f3/33/1af333c4afddfc4552db741f341c5303.jpg', 24, posicionIgneo[0], posicionIgneo[1])

totalElementores.push(elFluxo); 
totalElementores.push(elTerracore);
totalElementores.push(elIgneo);

//Ahora creamos los diferentes ataques para cada uno de los elementores.
//Como quiero variedad, vamos a hacer cinco por cada uno de los niveles de fuerza y cada uno de los elementores.
elFluxo.ataques = {
    debiles: ['SHURIKENS DE AGUA.', 'OLAS DE CHOQUE.','TORBELLINO.', 'CHORRO DE AGUA.', 'ESFERA DE AGUA.'],
    medios: ['MULTIESFERAS.', 'MORDIDA DE TIBURÓN.', 'CASCADA APLASTANTE.', 'ESPADAS DE HIELO.','ENGUYIR Y AHOGAR.'],
    fuertes:['TORMENTA DE GRANIZO.', 'CONGELAMIENTO.', 'LIMPIEZA INTERNA.', 'ABSORCIÓN TOTAL', 'NIEBLA DE VAPOR.']
}
elTerracore.ataques = {
    debiles: ['ROCA GIGANTE.', 'PARED DE ROCA.', 'ENREDADERA ESPINOSA.', 'EMPALAMIENTO POR ESTALAGMITAS.', 'ATAÚD DE ATADURA DE ARENA.'],
    medios: ['EMBESTIDA BRUTAL.', 'LAPIDACIÓN.', 'PLANTA CARNÍVORA.', 'MASAS DE ARENA.', 'MONTAÑA APLASTANTE.'],
    fuertes: ['EMPALAMIENTO POR BOSQUE DE BAMBÚ.', 'ARENAS MOVEDIZAS.', 'TERREMOTO DEVASTADOR.', 'SERPIENTE DE ARENA.', 'ESTIRAMIENTO POR ENREDADERAS']
}
elIgneo.ataques = {
    debiles: ['LLAMARADA DE FUEGO.', 'BOLAS DE FUEGO.', 'LÁTIGOS DE LAVA.', 'PRISIÓN DE FUEGO.', 'MANOS DE LAVA.'],
    medios: ['PETRIFICACIÓN EN ROCA VOLCÁNICA.', 'TORNADO DE FUEGO.', 'ENGUYIR Y CALCINAR.', 'ALIENTO DE PLASMA.', 'TALADRO DE LAVA.'],
    fuertes: ['TORMENTA DE AZÚFRE.', 'ESFERA DE PLASMA.', 'GOLPO DE ALTO VOLTAJE.', 'LAGO DE LAVA.', 'SUPERNOVA.']
}

//Ataques especiales: 
elFluxo.especiales = [
    new AtaqueEspecial('sanar', 'AGUAS SANADORAS', '+5❤️', 5 ),
    new AtaqueEspecial('ataque', 'AGUA VENENOSA', '+3|ATK', 3),
    new AtaqueEspecial('defensa', 'CORAZA DE HIELO', '+3|DEF', 3)
]
elTerracore.especiales = [
    new AtaqueEspecial('sanar', 'FLORACIÓN VEGETAL', '+5❤️', 5 ),
    new AtaqueEspecial('ataque', 'CUBIERTA DE ESPINAS', '+3|ATK', 3),
    new AtaqueEspecial('defensa', 'PIEL DE DIAMANTES', '+3|DEF', 3)
]
elIgneo.especiales = [
    new AtaqueEspecial('sanar', 'FUSIÓN DE HIDRÓGENO', '+5❤️', 5 ),
    new AtaqueEspecial('ataque', 'COMBUSTIÓN', '+3|ATK', 3),
    new AtaqueEspecial('defensa', 'ROCA VOLCÁNICA', '+3|DEF', 3)
]

//En esta sección creamos las diferentes defensas de los elementores que se mostrarán según su nivel de defensa,
//La fuerza del ataque contrario y el nivel de vida. 
elFluxo.defensa = ['Fluxo que absorve todo el impacto con su cuerpo flexible', 'El agua de Fluxo comienza a volverse un poco turbia, pero aún puede pelear', 'Fluxo está gravemente herido. Se recupera con la humedad del ambiente.']
elTerracore.defensa = ['No se ha podido traspazar la fuerte coraza de Terracore', 'Terracore está herido. Utiliza barro sanador para recuperarse.', 'Terracore casi es destruido. Aboserve minerales para recuperarse.']
elIgneo.defensa = ['Las llamas de Igneo han absorvido todo el impacto.', 'Igneo comienza a perder brillo. Absorve el oxígeno para avivar sus llamas.', 'Igeno está casi apagado. Usa la energía geotérmica para recuperarse.']

//----------------------------------Inicio de juego--------------------------------------------------------------
//Esta función es la que inicia el juego.
function iniciarJuego(){
    
    //No quiero que se vean aún las secciónes de ataque y reinicio, hasta que elija un elementor.
    seccionDerrota.style.display = 'none';
    seccionAtaque.style.display = 'none';
    seccionReinicio.style.display = 'none';
    seccionMapa.style.display = 'none';
    seccion.style.display = 'none';

    let card;
    totalElementores.forEach((el) =>{
        card = `
        <div class="elem">
            <input type="radio" name="elementor" id="${el.nombre}"/>
            <label for="${el.nombre}">${el.nombre}</label>
            <label for="${el.nombre}">
                <img class="img-element" src="${el.imagen}">
            </label>      
        </div>
        `;

        elementores.innerHTML += card;
    })

    //Luego le digo a ese elemento, que es un botón, que escuche el evento click
    mascotaJugador.addEventListener('click', handleSeleccion);

    ataqueDebil.addEventListener('click', () =>{ ataque('Débil')});
    ataqueMedio.addEventListener('click', () =>{ ataque('Medio')});
    ataqueFuerte.addEventListener('click', () =>{ ataque('Fuerte')});
    ataqueEspecial1.addEventListener('click',()=>{ especialSanar = true; especiales()});
    ataqueEspecial2.addEventListener('click',()=>{ especialAtaque = true; especiales()});
    ataqueEspecial3.addEventListener('click',()=>{ especialDefensa = true; especiales()});

    reinicio.addEventListener('click', () =>{
        alert('Espero que te haya gustado mucho jugar a este videojuego. Es bastante simple, pero es uno de los primeros que programo. Mi nombre es Lautaro Nuñez.\nTe pido de favor que me sigas en Instagram: @lautar0_07. \nMucha Suerte en la vida!!')
        location.reload();
    })
};

//-----------------------SELECCION DE ELEMENTORES----------------------------------------------------------------

//Primeramente, se escogerá cuál es el Elementor de la PC

let elementorPC;
let fluxo = traer('fluxo');
let terracore = traer('terracore');
let igneo = traer('igneo');

//Esta función controla la presentación del Elementor contrario, dependiendo que cual sea nuestor elementor.
function presentacionPC (elementEscogido){
   
    //Coloco la información en el HTML.
    divPresentacionPC.innerHTML = 'El elementor CONTRARIO es ' + elementEscogido.nombre + '.';
    divNombreElemPC.innerHTML = elementEscogido.nombre;
    imagenPresentPC.setAttribute('src', elementEscogido.imagen);

    //Luego digo cuál es el elementor. 
    elementorPC = elementEscogido.nombre
    
}

//EXPLICACION DE LA FUNCIÓN HandleSeleccion (abrir)
//Para saber cual es el elementor elegido, utilizamos ternarios para saber cuál de los inputs se ha escogido.
//Dependiendo de estos, se completará la variable 'elementor' que luego concatenamos en la alerta.
//Si no se elige elementor hay un Easter Egg, un mensaje chistoso.
//Una vez que se elige un Elementor hay una acción disponible: la presentación del elementor.
//Luego de la presentación de nuestro elementor, se sucede la presentación del elementor contrario. 
//Para ello ejecutamos la función donde están las diferentes presentaciones segun sean los elementores.
//Para finalizar, tenemos también un controlador que verifica que no se pueda cambiar de elementor en medio de
//la partida. En ese caso, si ya se eligió el elementor, se indica que puede recargar la página para reelegir. 

    let elementor = '';
    
function handleSeleccion (){
    fluxo = traer('Fluxo');
    terracore = traer('Terracore');
    igneo = traer('Igneo');

    fluxo.checked ? elementor = fluxo.id : null;
    terracore.checked ? elementor = terracore.id : null;
    igneo.checked ? elementor = igneo.id : null;

    elementor ? null : 
    alert('El primer paso para jugar este juego es muy simple: Elegir un Elementor!! \nPorque si no eliges uno, entonces ni modo que vayas a pelear tú solo contra el Elementor contrario y termines ahogado, enterrado o calcinado. \nELIGE UN ELEMENTOR!!!');  
    elementor ? traer('nombre-elem-jugador').innerHTML = elementor : null; 

    let elementEscogido = totalElementores.filter((el) => {return el.nombre == elementor})[0];

    divPresentacionJd.innerHTML = elementEscogido.nombre + ' se acerca a la arena.';
    imagenPresentJd.setAttribute('src', elementEscogido.imagen);
    
    if(elementor){
    //seccionAtaque.style.display = 'block';
    seccionMapa.style.display = 'flex';
    interval = setInterval(pintarCanvas,50);
    window.addEventListener('keydown', presionTecla);
    window.addEventListener('keyup', detenerMovimiento);
    seccionElementor.style.display = 'none';
    seleccion1.style.display = 'none';
    seleccion2.style.display = 'none';
    }
   
}


//-------------------------------SELECCIÓN DE ATAQUES--------------------------------------------------------------

//Esta variable controla los rounds: 
let round = 0

//Tanto jugador como PC comienzan con 24 vidas: 
let vidasJd = 24;
let vidasPC = 24;

//Colocamos una variable global para guardar el tipo de ataque del jugador
let tipoAtaqueJd = '';
let contadorFuerteJd = 0;

//Creo también un arreglo con las diferentes tipos de ataque:
let eleccionAtaques = ['Débil', 'Medio', 'Fuerte']

//Ahora creo otra varaible para configurar el tipo de ataque de la PC
let tipoAtaquePC = '';
let tipoEspecialPC = 0;
//Esta variable nos ayudará a saber si el juego ha llegado a su final o no aún.
let finalDelJuego = false

//Creamos una función para poder determinar el tipo de ataque:
//La función recibe un tipo de ataque como parámetro, y por ahora solamente hace un console.log del tipo de ataque.
//Si el ataque es de tipo fuerte se suma una unidad al contador para que solo se permita realizar 2 ataques fuertes.
//Se aumenta por una unidad la variable de rounds
function ataque(tipo){
  
    tipoAtaqueJd = tipo

    console.log('Usted seleccionó un ataque de tipo ' + tipo)
    if(tipo !== 'Fuerte' || (tipo == 'Fuerte' && contadorFuerteJd < 2)){
        tipo === 'Fuerte' ? contadorFuerteJd ++ : null
    }
    else {
        contadorFuerteJd = 2 ? alert('Ya no puede realizar ataques fuertes, tu elementor está cansado. Elige otro ataque.') : null;
    }
    
    if(tipoAtaqueJd!== 'Fuerte' || (tipoAtaqueJd == 'Fuerte' && contadorFuerteJd <= 2)){
        round ++
        ataquePC();
        mensajeria1(); mensajeria2(); mensajeria3(); mensajeria4();
    }

    if(vidasJd <= 0 && vidasPC <= 0){
        derrota('Empate');
        return 'GAME OVER'
    }
    vidasJd <= 0 ? derrota('Jd') : null;
    vidasPC <= 0 ? derrota('Pc') : null;
    
}

let contadorFuertePC = 0;

//Ahora creo la función que regula la elección de ataques de la PC:
//Generamos dos variables de azar, una para establecer el ataque de la PC y otro para cambiarlo en caso de que
//Ya no pueda realizar golpes fuertes.
//Luego tenemos un condicional parecido al ataque del jugador, solo que funciona con esta nueva variable.
//Finalmente en el else se cambia el tipo de ataque por uno permitido.
function ataquePC (){
    let azar = () =>{ return Math.floor(Math.random() * (3 - 0) + 0)};
    let azar2 = () => { return Math.floor(Math.random() * (2 - 0) + 0)};
    tipoEspecialPC = azar2()
    console.log(tipoEspecialPC)
    especialesPC();
    tipoAtaquePC = eleccionAtaques[azar()];
    
    if(tipoAtaquePC !== 'Fuerte' || (tipoAtaquePC == 'Fuerte' && contadorFuertePC < 2)){
        console.log('La PC seleccionó un ataque de tipo ' + tipoAtaquePC)
        tipoAtaquePC === 'Fuerte' ? contadorFuertePC ++ : null
    }
    else {
        console.log('La PC ya no puede realizar ataques fuertes');
        tipoAtaquePC = eleccionAtaques[azar2()];
        console.log('El golpe de la PC fue cambiado a ' + tipoAtaquePC)
    }
}

//----------------------------------MENSAJERÍA----------------------------------------------------------------
//En esta sección se manejan los mensajes que se muestran en pantalla, narrando la lucha.

//La primer variable crea un numero aleatorio entre 0 y 4 para elegir un ataque al azar.
//La otra variable crea un numero aleatorio entre 0 y 2 para elegir una defensa al azar.
let azarDebil = () => {return Math.floor(Math.random() * (3 - 1) + 1);}
let azarMedio = () => {return Math.floor(Math.random() * (7 - 4) + 4);}
let azarFuerte = () => {return Math.floor(Math.random() * (12 - 8) + 8);}
let azar5 = () => {return Math.floor(Math.random() * (5 - 0) + 0);}
let azar3 = () => {return Math.floor(Math.random() * (3 - 0) + 0);}
let contadorEspecialPC = 0;
let ataqueEspecialPC = false;
let defensaEspecialPC = false;

//Mensajería de poderes especiales: 

function especiales(){

    let elementEscogido = totalElementores.filter((el) => {return el.nombre == elementor})[0]

    let mensajeEsp = document.createElement('p');
    if(especialSanar){ 
        mensajeEsp.innerHTML = 'Tu elementor ' + elementor + ' utiliza un poder especial sanador: ' + elementEscogido.especiales[0].nombre + '. ' + elementEscogido.especiales[0].efecto;
        vidasJd += 5;
        contadorVidasJd.innerHTML = vidasJd
        especialSanar = false; 
        ataqueEspecial1.style.display = 'none';
    }
    if(especialAtaque){
        mensajeEsp.innerHTML = 'Tu elementor ' + elementor + ' utiliza un poder especial de ataque: ' + elementEscogido.especiales[1].nombre + '. ' + elementEscogido.especiales[1].efecto + '\nEl efecto tendrá valor en el siguiente ataque.'
        ataqueEspecial2.style.display = 'none';
    }
    if(especialDefensa){
        mensajeEsp.innerHTML = 'Tu elementor ' + elementor + ' utiliza un poder especial de defensa: ' + elementEscogido.especiales[2].nombre + '. ' + elementEscogido.especiales[2].efecto + '\nEl efecto tendrá valor en el siguiente ataque.'
        ataqueEspecial3.style.display = 'none';
    };
    seccion.appendChild(document.createElement('hr'));
    seccion.appendChild(mensajeEsp);
}

function especialesPC(){
    let elementEscogido = totalElementores.filter((el) => {return el.nombre == elementorPC})[0]
    console.log(elementEscogido)

    let mensajeEsp = document.createElement('p');
    if(contadorEspecialPC <=3 && tipoEspecialPC){
        contadorEspecialPC++
    }
    if(contadorEspecialPC == 1 && tipoEspecialPC){
        mensajeEsp.innerHTML = 'El elementor contrario ' + elementorPC + ' utiliza un poder especial sanador: ' + elementEscogido.especiales[0].nombre + '. ' + elementEscogido.especiales[0].efecto;
        vidasPC += 5;
        contadorVidasJd.innerHTML = vidasPC
    }
    else if(contadorEspecialPC == 2 && tipoEspecialPC){
        mensajeEsp.innerHTML = 'El elementor contrario ' + elementorPC + ' utiliza un poder especial de ataque: ' + elementEscogido.especiales[1].nombre + '. ' + elementEscogido.especiales[1].efecto + '\nEl efecto tendrá valor en el siguiente ataque.'
        ataqueEspecialPC = true;
    }
    else if(contadorEspecialPC == 3 && tipoEspecialPC){
        mensajeEsp.innerHTML = 'El elementor contrario ' + elementorPC + ' utiliza un poder especial de defensa: ' + elementEscogido.especiales[2].nombre + '. ' + elementEscogido.especiales[2].efecto + '\nEl efecto tendrá valor en el siguiente ataque.'
        defensaEspecialPC = true;
    }
    seccion.appendChild(document.createElement('hr'));
    seccion.appendChild(mensajeEsp);
}

//El primer mensaje corresponde al ataque del jugador. Además se coloca un hr de separación y el número de round.
function mensajeria1 (){
    let mensaje = document.createElement('p')
    
    if(tipoAtaqueJd === 'Débil'){
        elementor === 'Fluxo' ? mensaje.innerHTML = 'Fluxo ataca con ' + elFluxo.ataques.debiles[azar5()]  : null;
        elementor === 'Terracore' ? mensaje.innerHTML = 'Terracore ataca con ' + elTerracore.ataques.debiles[azar5()] : null;
        elementor === 'Igneo' ? mensaje.innerHTML = 'Igneo ataca con ' + elIgneo.ataques.debiles[azar5()] : null;
        !elementor ? alert('Debes elegir un Elementor antes de atacar!!') : null;
        console.log(mensaje)
    }
    else if (tipoAtaqueJd === 'Medio'){
        elementor === 'Fluxo' ? mensaje.innerHTML = 'Fluxo ataca con ' + elFluxo.ataques.medios[azar5()] : null;
        elementor === 'Terracore' ? mensaje.innerHTML = 'Terracore ataca con ' + elTerracore.ataques.medios[azar5()] : null;
        elementor === 'Igneo' ? mensaje.innerHTML = 'Igneo ataca con ' + elIgneo.ataques.medios[azar5()] : null;
        !elementor ? alert('Debes elegir un Elementor antes de atacar!!') : null;
        console.log(mensaje)
    }
    else {
        elementor === 'Fluxo' ? mensaje.innerHTML = 'Fluxo ataca con ' + elFluxo.ataques.fuertes[azar5()] : null;
        elementor === 'Terracore' ? mensaje.innerHTML = 'Terracore ataca con ' + elTerracore.ataques.fuertes[azar5()] : null;
        elementor === 'Igneo' ? mensaje.innerHTML = 'Igneo ataca con ' + elIgneo.ataques.fuertes[azar5()] : null;
        !elementor ? alert('Debes elegir un Elementor antes de atacar!!') : null;
        console.log(mensaje)
    }
    let cartel = document.createElement('h3');
    cartel.innerHTML = 'ROUND ' + round;
    let titulo = document.createElement('p');
    titulo.innerHTML = 'ATAQUE PROPIO: ' + tipoAtaqueJd;
    if(elementor){
        seccion.appendChild(document.createElement('hr'));
        seccion.appendChild(cartel);
        seccion.appendChild(titulo);
        seccion.appendChild(mensaje);
    }
    
}

//El segundo mensaje corresponde a la defensa de la PC 
function mensajeria2 (){
    let mensaje = document.createElement('p');
    let dano = [azarDebil(), azarMedio(), azarFuerte()];
    let mensajeEsp = document.createElement('p');
    let mensajeEspPC = document.createElement('p');
    if(especialAtaque){vidasPC -=3;
        mensajeEsp.innerHTML = '-3❤️ (Ataque Especial)'
    }
    if(defensaEspecialPC){
        vidasPC += 3;
        mensajeEspPC.innerHTML = '+3❤️ (Defensa Especial)';
    }

    switch (elementorPC){
        case 'Fluxo': 
            if(tipoAtaqueJd == 'Débil' && tipoAtaquePC != 'Fuerte'){mensaje.innerHTML = elFluxo.defensa[0] + (tipoAtaquePC == 'Medio'? `-${dano[0]}❤️` :  `=❤️`); tipoAtaquePC == 'Medio'? vidasPC-= dano[0] : vidasPC}
            else if(tipoAtaqueJd == 'Débil' && tipoAtaquePC == 'Fuerte'){mensaje.innerHTML = elFluxo.defensa[1] + `-${dano[0]}❤️`; vidasPC -= dano[0]}
            else if(tipoAtaqueJd == 'Medio' && tipoAtaquePC == 'Débil'){mensaje.innerHTML = elFluxo.defensa[0] + `-${dano[0]}❤️`; vidasPC -= dano[0]}
            else if(tipoAtaqueJd == 'Medio' && tipoAtaquePC == 'Medio'){mensaje.innerHTML = elFluxo.defensa[1] + `-${dano[1]}❤️`; vidasPC -= dano[1]}
            else if(tipoAtaqueJd == 'Medio' && tipoAtaquePC == 'Fuerte'){mensaje.innerHTML = elFluxo.defensa[2] + `-${dano[1]}❤️`; vidasPC -= dano[1]}
            else if(tipoAtaqueJd == 'Fuerte' && tipoAtaquePC == 'Débil'){mensaje.innerHTML = elFluxo.defensa[1] + `-${dano[1]}❤️`; vidasPC -= dano[1]}
            else if(tipoAtaqueJd == 'Fuerte' && tipoAtaquePC != 'Débil'){mensaje.innerHTML = elFluxo.defensa[2] + (tipoAtaquePC == 'Medio'? `-${dano[1]}❤️` : `-${dano[2]}❤️`); tipoAtaquePC == 'Medio'? vidasPC -= dano[1] : vidasPC -= dano[2]}
            break
        case 'Terracore':
            if(tipoAtaqueJd == 'Débil' && tipoAtaquePC != 'Fuerte'){mensaje.innerHTML = elTerracore.defensa[0]+ (tipoAtaquePC == 'Medio'? `-${dano[0]}❤️` :  `=❤️`); tipoAtaquePC == 'Medio'? vidasPC-= dano[0] : vidasPC}
            else if(tipoAtaqueJd == 'Débil' && tipoAtaquePC == 'Fuerte'){mensaje.innerHTML = elTerracore.defensa[1]+ `-${dano[0]}❤️`; vidasPC -= dano[0]}
            else if(tipoAtaqueJd == 'Medio' && tipoAtaquePC == 'Débil'){mensaje.innerHTML = elTerracore.defensa[0]+ `-${dano[0]}❤️`; vidasPC -= dano[0]}
            else if(tipoAtaqueJd == 'Medio' && tipoAtaquePC == 'Medio'){mensaje.innerHTML = elTerracore.defensa[1]+ `-${dano[1]}❤️`; vidasPC -= dano[1]}
            else if(tipoAtaqueJd == 'Medio' && tipoAtaquePC == 'Fuerte'){mensaje.innerHTML = elTerracore.defensa[2]+ `-${dano[1]}❤️`; vidasPC -= dano[1]}
            else if(tipoAtaqueJd == 'Fuerte' && tipoAtaquePC == 'Débil'){mensaje.innerHTML = elTerracore.defensa[1]+ `-${dano[1]}❤️`; vidasPC -= dano[1]}
            else if(tipoAtaqueJd == 'Fuerte' && tipoAtaquePC != 'Débil'){mensaje.innerHTML = elTerracore.defensa[2]+ (tipoAtaquePC == 'Medio'? `-${dano[1]}❤️` : `-${dano[2]}❤️`); tipoAtaquePC == 'Medio'? vidasPC -= dano[1] : vidasPC -= dano[2]}
            break
        case 'Igneo':
            if(tipoAtaqueJd == 'Débil' && tipoAtaquePC != 'Fuerte'){mensaje.innerHTML = elIgneo.defensa[0]+ (tipoAtaquePC == 'Medio'? `-${dano[0]}❤️` :  `=❤️`); tipoAtaquePC == 'Medio'? vidasPC-= dano[0] : vidasPC}
            else if(tipoAtaqueJd == 'Débil' && tipoAtaquePC == 'Fuerte'){mensaje.innerHTML = elIgneo.defensa[1]+ `-${dano[0]}❤️`; vidasPC -= dano[0]}
            else if(tipoAtaqueJd == 'Medio' && tipoAtaquePC == 'Débil'){mensaje.innerHTML = elIgneo.defensa[0]+ `-${dano[0]}❤️`; vidasPC -= dano[0]}
            else if(tipoAtaqueJd == 'Medio' && tipoAtaquePC == 'Medio'){mensaje.innerHTML = elIgneo.defensa[1]+ `-${dano[1]}❤️`; vidasPC -= dano[1]}
            else if(tipoAtaqueJd == 'Medio' && tipoAtaquePC == 'Fuerte'){mensaje.innerHTML = elIgneo.defensa[2]+ `-${dano[1]}❤️`; vidasPC -= dano[1]}
            else if(tipoAtaqueJd == 'Fuerte' && tipoAtaquePC == 'Débil'){mensaje.innerHTML = elIgneo.defensa[1]+ `-${dano[1]}❤️`; vidasPC -= dano[1]}
            else if(tipoAtaqueJd == 'Fuerte' && tipoAtaquePC != 'Débil'){mensaje.innerHTML = elIgneo.defensa[2]+ (tipoAtaquePC == 'Medio'? `-${dano[1]}❤️` : `-${dano[2]}❤️`); tipoAtaquePC == 'Medio'? vidasPC -= dano[1] : vidasPC -= dano[2]}
            break
        default:
            console.log(elementorPC)
    }
    console.log(vidasPC);
    let titulo = document.createElement('p');
    titulo.innerHTML = 'DEFENSA DEL ELEMENTOR CONTRARIO:';
    seccion.appendChild(document.createElement('hr'));
    seccion.appendChild(titulo);
    seccion.appendChild(mensaje);
    seccion.appendChild(mensajeEsp);
    seccion.appendChild(mensajeEspPC);
    contadorVidasPC.innerHTML = vidasPC;
    especialAtaque? especialAtaque = false : null;
    defensaEspecialPC? defensaEspecialPC = false : null;
}

//El tercer mensaje corresponde al ataque de la PC
function mensajeria3 (){
    let mensaje = document.createElement('p')
    console.log(elementorPC);
    if(tipoAtaquePC === 'Débil'){
        elementorPC === 'Fluxo' ? mensaje.innerHTML = 'Fluxo ataca con ' + elFluxo.ataques.debiles[azar5()]  : null;
        elementorPC === 'Terracore' ? mensaje.innerHTML = 'Terracore ataca con ' + elTerracore.ataques.debiles[azar5()] : null;
        elementorPC === 'Igneo' ? mensaje.innerHTML = 'Igneo ataca con ' + elIgneo.ataques.debiles[azar5()] : null;
        console.log(mensaje)
    }
    else if (tipoAtaquePC === 'Medio'){
        elementorPC === 'Fluxo' ? mensaje.innerHTML = 'Fluxo ataca con ' + elFluxo.ataques.medios[azar5()] : null;
        elementorPC === 'Terracore' ? mensaje.innerHTML = 'Terracore ataca con ' + elTerracore.ataques.medios[azar5()] : null;
        elementorPC === 'Igneo' ? mensaje.innerHTML = 'Igneo ataca con ' + elIgneo.ataques.medios[azar5()] : null;
        console.log(mensaje)
    }
    else {
        elementorPC === 'Fluxo' ? mensaje.innerHTML = 'Fluxo ataca con ' + elFluxo.ataques.fuertes[azar5()] : null;
        elementorPC === 'Terracore' ? mensaje.innerHTML = 'Terracore ataca con ' + elTerracore.ataques.fuertes[azar5()] : null;
        elementorPC === 'Igneo' ? mensaje.innerHTML = 'Igneo ataca con ' + elIgneo.ataques.fuertes[azar5()] : null;
        console.log(mensaje)
    }
    let titulo = document.createElement('p');
    titulo.innerHTML = 'Ataque contrario: ' + tipoAtaquePC;
    if(elementorPC){
        elementor ? seccion.appendChild(document.createElement('hr')) : null;
        elementor ? seccion.appendChild(titulo) : null;
        elementor ? seccion.appendChild(mensaje): null;
    }
}

//El cuarto mensaje corresponde a la defense del jugador
function mensajeria4 (){
    let dano = [azarDebil(), azarMedio(), azarFuerte()]
    let mensaje = document.createElement('p');
    let mensajeEsp = document.createElement('p');
    let mensajeEspPC = document.createElement('p');
    if(especialDefensa){
        vidasJd += 3;
        mensajeEsp.innerHTML = '+3❤️ (Defensa Especial)';
    }
    if(ataqueEspecialPC){
        vidasJd -=3;
        mensajeEspPC.innerHTML = '-3❤️ (Ataque Especial)'
    }
    
    switch (elementor){
        case 'Fluxo': 
            if(tipoAtaquePC == 'Débil' && tipoAtaqueJd != 'Fuerte'){mensaje.innerHTML = elFluxo.defensa[0] + (tipoAtaqueJd == 'Medio'? `-${dano[0]}❤️` :  `=❤️`); tipoAtaqueJd == 'Medio'? vidasJd-= dano[0] : vidasJd}
            else if(tipoAtaquePC == 'Débil' && tipoAtaqueJd == 'Fuerte'){mensaje.innerHTML = elFluxo.defensa[1] + `-${dano[0]}❤️`; vidasJd -= dano[0]}
            else if(tipoAtaquePC == 'Medio' && tipoAtaqueJd == 'Débil'){mensaje.innerHTML = elFluxo.defensa[0] + `-${dano[0]}❤️`; vidasJd -= dano[0]}
            else if(tipoAtaquePC == 'Medio' && tipoAtaqueJd == 'Medio'){mensaje.innerHTML = elFluxo.defensa[1] + `-${dano[1]}❤️`; vidasJd -= dano[1]}
            else if(tipoAtaquePC == 'Medio' && tipoAtaqueJd == 'Fuerte'){mensaje.innerHTML = elFluxo.defensa[2] + `-${dano[1]}❤️`; vidasJd -= dano[1]}
            else if(tipoAtaquePC == 'Fuerte' && tipoAtaqueJd == 'Débil'){mensaje.innerHTML = elFluxo.defensa[1] + `-${dano[1]}❤️`; vidasJd -= dano[1]}
            else if(tipoAtaquePC == 'Fuerte' && tipoAtaqueJd != 'Débil'){mensaje.innerHTML = elFluxo.defensa[2]+ (tipoAtaqueJd == 'Medio'? `-${dano[1]}❤️` : `-${dano[2]}❤️`); tipoAtaqueJd == 'Medio'? vidasJd -= dano[1] : vidasJd -= dano[2]}
            break
        case 'Terracore':
            if(tipoAtaquePC == 'Débil' && tipoAtaqueJd != 'Fuerte'){mensaje.innerHTML = elTerracore.defensa[0]+ (tipoAtaqueJd == 'Medio'? `-${dano[0]}❤️` :  `=❤️`); tipoAtaqueJd == 'Medio'? vidasJd-= dano[0] : vidasJd}
            else if(tipoAtaquePC == 'Débil' && tipoAtaqueJd == 'Fuerte'){mensaje.innerHTML = elTerracore.defensa[1]+ `-${dano[0]}❤️`; vidasJd -= dano[0]}
            else if(tipoAtaquePC == 'Medio' && tipoAtaqueJd == 'Débil'){mensaje.innerHTML = elTerracore.defensa[0]+ `-${dano[0]}❤️`; vidasJd -= dano[0]}
            else if(tipoAtaquePC == 'Medio' && tipoAtaqueJd == 'Medio'){mensaje.innerHTML = elTerracore.defensa[1]+ `-${dano[1]}❤️`; vidasJd -= dano[1]}
            else if(tipoAtaquePC == 'Medio' && tipoAtaqueJd == 'Fuerte'){mensaje.innerHTML = elTerracore.defensa[2]+ `-${dano[1]}❤️`; vidasJd -= dano[1]}
            else if(tipoAtaquePC == 'Fuerte' && tipoAtaqueJd == 'Débil'){mensaje.innerHTML = elTerracore.defensa[1]+ `-${dano[1]}❤️`; vidasJd -= dano[1]}
            else if(tipoAtaquePC == 'Fuerte' && tipoAtaqueJd != 'Débil'){mensaje.innerHTML = elTerracore.defensa[2]+ (tipoAtaqueJd == 'Medio'? `-${dano[1]}❤️` : `-${dano[2]}❤️`); tipoAtaqueJd == 'Medio'? vidasJd -= dano[1] : vidasJd -= dano[2]}
            break
        case 'Igneo':
            if(tipoAtaquePC == 'Débil' && tipoAtaqueJd != 'Fuerte'){mensaje.innerHTML = elIgneo.defensa[0]+ (tipoAtaqueJd == 'Medio'? `-${dano[0]}❤️` :  `=❤️`); tipoAtaqueJd == 'Medio'? vidasJd-= dano[0] : vidasJd}
            else if(tipoAtaquePC == 'Débil' && tipoAtaqueJd == 'Fuerte'){mensaje.innerHTML = elIgneo.defensa[1]+ `-${dano[0]}❤️`; vidasJd -= dano[0]}
            else if(tipoAtaquePC == 'Medio' && tipoAtaqueJd == 'Débil'){mensaje.innerHTML = elIgneo.defensa[0]+ `-${dano[0]}❤️`; vidasJd -= dano[0]}
            else if(tipoAtaquePC == 'Medio' && tipoAtaqueJd == 'Medio'){mensaje.innerHTML = elIgneo.defensa[1]+ `-${dano[1]}❤️`; vidasJd -= dano[1]}
            else if(tipoAtaquePC == 'Medio' && tipoAtaqueJd == 'Fuerte'){mensaje.innerHTML = elIgneo.defensa[2]+ `-${dano[1]}❤️`; vidasJd -= dano[1]}
            else if(tipoAtaquePC == 'Fuerte' && tipoAtaqueJd == 'Débil'){mensaje.innerHTML = elIgneo.defensa[1]+ `-${dano[1]}❤️`; vidasJd -= dano[1]}
            else if(tipoAtaquePC == 'Fuerte' && tipoAtaqueJd != 'Débil'){mensaje.innerHTML = elIgneo.defensa[2]+ (tipoAtaqueJd == 'Medio'? `-${dano[1]}❤️` : `-${dano[2]}❤️`); tipoAtaqueJd == 'Medio'? vidasJd -= dano[1] : vidasJd -= dano[2]}
            break
        default:
            console.log(elementor)
    }
    console.log(vidasJd);
    let seccion = traer('actions');
    let titulo = document.createElement('p');
    titulo.innerHTML = 'DEFENSA DE TU ELEMENTOR:';
    seccion.appendChild(document.createElement('hr')) 
    seccion.appendChild(titulo)
    seccion.appendChild(mensaje);
    seccion.appendChild(mensajeEsp);
    seccion.appendChild(mensajeEspPC);
    especialDefensa? especialDefensa = false : null;
    ataqueEspecialPC ? ataqueEspecialPC = false : null;
    contadorVidasJd.innerHTML = vidasJd ;

}

//---------------------------------FINAL DEL JUEGO----------------------------------------------------------
//En esta sección se maneja, según el jugador que llegue a perder todas las vidas, los mensajes que indican
//el final del juego.

function derrota(jugador){
    let mensaje = document.createElement('h3');
    let mensaje1 = document.createElement('h2');
    let mensaje2 = document.createElement('h2');
    mensaje2.innerHTML = 'FINAL DEL JUEGO'
    seccionDerrota.style.display = 'block';
    if(jugador == 'Jd'){
        mensaje.innerHTML = 'TU ELEMENTOR, ' + elementor.toUpperCase() + ', HA SIDO DERROTADO EN COMBATE. EL ELEMENTOR CONTRARIO, ' + elementorPC.toUpperCase() + ', ES EL VENCEDOR DE ESTE MEMORABLE ENCUENTRO.'
        mensaje1.innerHTML = 'HAZ PERDIDO'
    }
    else if(jugador == 'Empate'){
        mensaje.innerHTML = 'AMBOS ELEMENTORES ACABARON POR DESTRUIRSE MUTUAMENTE EN UNA HECATOMBE DEVASTADORA. LA CONTIENDA SIGNIFICA UN EMPATE'
        mensaje1.innerHTML = 'ES UN EMPATE!'
    }
    else { 
        mensaje.innerHTML = 'EL ELEMENTOR CONTRARIO, ' + elementorPC.toUpperCase() + ', HA SIDO DERROTADO EN COMBATE. TU ELEMENTOR, ' + elementor.toUpperCase() + ', ES EL VENCEDOR DE ESTE MEMORABLE ENCUENTRO.'
        mensaje1.innerHTML = 'HAZ GANADO!'
    }
    seccionDerrota.appendChild(mensaje);
    seccionDerrota.appendChild(mensaje1);
    seccionDerrota.appendChild(mensaje2);

    let seccionAtaque = traer('select-atack');
    seccionAtaque.style.display = 'none';

    let seccionReinicio = traer('replay');
    seccionReinicio.style.display = 'block';

    finalDelJuego = true; 
}

//---------------------------------------MAPA---------------------------------------------------------------
//En esta sección se controla lo relativo al mapa en canvas.

function pintarCanvas(){
    let elementEscogido = totalElementores.filter((el) => {return el.nombre == elementor})[0]
    elementEscogido.x = elementEscogido.x + elementEscogido.velocidadX;
    elementEscogido.y = elementEscogido.y + elementEscogido.velocidadY;
    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
    elementEscogido.pintar();

    if(elementEscogido.nombre == 'Igneo'){
        enFluxo.pintar();
        enTerracore.pintar();
        if(elementEscogido.velocidadX || elementEscogido.velocidadY){
            controlColision(enTerracore);
            controlColision(enFluxo);
        }
    }
    else if(elementEscogido.nombre == 'Fluxo'){
        enIgneo.pintar();
        enTerracore.pintar();
        if(elementEscogido.velocidadX || elementEscogido.velocidadY){
            controlColision(enIgneo);
            controlColision(enTerracore);
        }
    }
    else{
        enFluxo.pintar();
        enIgneo.pintar();
        if(elementEscogido.velocidadX || elementEscogido.velocidadY){
            controlColision(enIgneo);
            controlColision(enFluxo);
        }
    };

    
};

function moverElementor (direccion){
    console.log(direccion)
    let elementEscogido = totalElementores.filter((el) => {return el.nombre == elementor})[0]
    direccion === 'arriba' ? elementEscogido.velocidadY = -5 : null;
    direccion === 'derecha' ? elementEscogido.velocidadX = 5 : null;
    direccion === 'abajo' ? elementEscogido.velocidadY = 5 : null;
    direccion === 'izquierda' ? elementEscogido.velocidadX = -5 : null;
}

function detenerMovimiento(){
    let elementEscogido = totalElementores.filter((el) => {return el.nombre == elementor})[0]
    elementEscogido.velocidadX = 0;
    elementEscogido.velocidadY = 0;   
}

function presionTecla (event){
    event.preventDefault()
    console.log(event.key)
    event.key === 'ArrowUp' ? moverElementor('arriba'): null;
    event.key === 'ArrowDown' ? moverElementor('abajo'): null;
    event.key === 'ArrowRight' ? moverElementor('derecha'): null;
    event.key === 'ArrowLeft' ? moverElementor('izquierda'): null;
}

function controlColision(enemigo){
    let elementEscogido = totalElementores.filter((el) => {return el.nombre == elementor})[0]

    const arribaEnemigo = enemigo.y; const abajoEnemigo = enemigo.y + enemigo.alto;
    const izquierdaEnemigo = enemigo.x; const derechaEnemigo = enemigo.x + enemigo.ancho;
    const arribaJugador = elementEscogido.y; const abajoJugador = elementEscogido.y + elementEscogido.alto;
    const izquierdaJugador = elementEscogido.x; const derechaJugador = elementEscogido.x + elementEscogido.ancho;

    if(
        abajoJugador < arribaEnemigo ||
        arribaJugador > abajoEnemigo ||
        derechaJugador < izquierdaEnemigo ||
        izquierdaJugador > derechaEnemigo
    ){
        return;
    }

    detenerMovimiento();
    clearInterval(interval);
    alert('Te enfrentarás a ' + enemigo.nombre + '\nCOMBATE!');
    seccionMapa.style.display = 'none';
    seccion.style.display = 'flex';
    seccionAtaque.style.display = 'block';
    presentacionPC(enemigo);
}
//----------------------------------------------------------------------------------------------------------

//Para que esto se ejecute una vez que termina de cargar el html, necesito que window espere al evento 'load'
//Una vez que el html cargue, se iniciará el juego y entonces se implementará la función que llama a los 
//elementos por ID
window.addEventListener('load', iniciarJuego)