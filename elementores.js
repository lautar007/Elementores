//--------------------------------Sección de Variables---------------------------------------------

function traer (id){
    return document.getElementById(id)
}

    //--------------INICIO
    let totalElementores = []
    const seccionAtaque = traer('select-atack');
    const seccionReinicio = traer('replay');
    const seccionDerrota = traer('derrota');
    const mascotaJugador = traer('btn-seleccion');
    const ataqueDebil = traer('btn-atc1');
    const ataqueMedio = traer('btn-atc2');
    const ataqueFuerte = traer('btn-atc3');
    const reinicio = traer('reinicio');

    //-------------SELECCION
    const divPresentacionPC = traer('present-PC');
    const divNombreElemPC = traer('nombre-elem-pc');
    const fluxo = traer('fluxo');
    const terracore = traer('terracore');
    const igneo = traer('igneo');
    const divPresentacionJd = traer('present-jugador');
    const imagenPresentJd = traer('img-present-Jd');
    const imagenPresentPC = traer('img-present-PC');
    const seccionElementor = traer('elementores');
    const seleccion1 = traer('seleccion1');
    const seleccion2 = traer('seleccion2')

    //------------MENSAJERÍA
    const seccion = traer('actions');
    const contadorVidasPC = traer('vidas-pc');
    const contadorVidasJd = traer('vidas-jugador');

//--------------------------------------Clases-------------------------------------------------------------------
class Elementor {
    constructor(nombre, imagen, vida){
        this.nombre = nombre
        this.imagen = imagen
        this.vida = vida
    }
}

let elFluxo = new Elementor('Fluxo', 'https://i.pinimg.com/564x/7f/84/ee/7f84ee4374111e02747aeb9a1c57af62.jpg', 24)
let elTerracore = new Elementor('Terracore', 'https://i.pinimg.com/564x/0c/41/b6/0c41b64d7a65b01028c19be6e59a0cc6.jpg', 24)
let elIgneo = new Elementor('Igneo', 'https://i.pinimg.com/564x/1a/f3/33/1af333c4afddfc4552db741f341c5303.jpg', 24)

totalElementores.push(elFluxo);
totalElementores.push(elTerracore);
totalElementores.push(elIgneo);

console.log(totalElementores)
//----------------------------------Inicio de juego--------------------------------------------------------------
//Esta función es la que inicia el juego.
function iniciarJuego(){
    
    //No quiero que se vean aún las secciónes de ataque y reinicio, hasta que elija un elementor.
    seccionDerrota.style.display = 'none';
    seccionAtaque.style.display = 'none';
    seccionReinicio.style.display = 'none';

    //Luego le digo a ese elemento, que es un botón, que escuche el evento click
    mascotaJugador.addEventListener('click', handleSeleccion);

    ataqueDebil.addEventListener('click', () =>{
        ataque('Débil');
    });
    ataqueMedio.addEventListener('click', () =>{
        ataque('Medio');
    });
    ataqueFuerte.addEventListener('click', () =>{
        ataque('Fuerte');
    });

    reinicio.addEventListener('click', () =>{
        alert('Espero que te haya gustado mucho jugar a este videojuego. Es bastante simple, pero es uno de los primeros que programo. Mi nombre es Lautaro Nuñez.\nTe pido de favor que me sigas en Instagram: @lautar0_07. \nMucha Suerte en la vida!!')
        location.reload();
    })
};

//-----------------------SELECCION DE ELEMENTORES----------------------------------------------------------------

//Primeramente, se escogerá cuál es el Elementor de la PC
let posibilidades = ['Fluxo', 'Terracore', 'Igneo'];
let azar = Math.floor(Math.random() * (3 - 0) + 0);
let elementorPC = posibilidades[azar];
let eleccion = false

//Esta función controla la presentación del Elementor contrario, dependiendo que cual sea nuestor elementor.
function presentacionPC (elemJugador){
    if(elementorPC == 'Fluxo' && elemJugador !== 'Fluxo' ){
        divPresentacionPC.innerHTML = 'El elementor contrario es Fluxo.'
        divNombreElemPC.innerHTML = 'Fluxo'
        imagenPresentPC.setAttribute('src', "https://i.pinimg.com/564x/7f/84/ee/7f84ee4374111e02747aeb9a1c57af62.jpg")
    }
    else if(elementorPC == 'Fluxo'){
        divPresentacionPC.innerHTML = 'El elementor contrario es otro Fluxo.'
        divNombreElemPC.innerHTML = 'Fluxo'
        imagenPresentPC.setAttribute('src', "https://i.pinimg.com/564x/7f/84/ee/7f84ee4374111e02747aeb9a1c57af62.jpg")
    }
    else if(elementorPC == 'Terracore' && elemJugador !== 'Terracore'){
        divPresentacionPC.innerHTML = 'El elementor contrario es Terracore.'
        divNombreElemPC.innerHTML = 'Terracore'
        imagenPresentPC.setAttribute('src', "https://i.pinimg.com/564x/0c/41/b6/0c41b64d7a65b01028c19be6e59a0cc6.jpg")
    }
    else if(elementorPC == 'Terracore'){
        divPresentacionPC.innerHTML = 'El elementor contrario es otro Terracore'
        divNombreElemPC.innerHTML = 'Terracore'
        imagenPresentPC.setAttribute('src', "https://i.pinimg.com/564x/0c/41/b6/0c41b64d7a65b01028c19be6e59a0cc6.jpg")
    }
    else if(elementorPC == 'Igneo' && elemJugador !== 'Igneo'){
        divPresentacionPC.innerHTML = 'El elementor contrario es Igneo.'
        divNombreElemPC.innerHTML = 'Igneo'
        imagenPresentPC.setAttribute('src', "https://i.pinimg.com/564x/1a/f3/33/1af333c4afddfc4552db741f341c5303.jpg")
    }
    else if(elementorPC == 'Igneo'){
        divPresentacionPC.innerHTML = 'El elementor contrario es otro Igneo.'
        divNombreElemPC.innerHTML = 'Igneo'
        imagenPresentPC.setAttribute('src', "https://i.pinimg.com/564x/1a/f3/33/1af333c4afddfc4552db741f341c5303.jpg")
    }
}

//EXPLICACION DE LA FUNCIÓN HandleSeleccion (abrir)
//Esta es una función de prueba que da una alerta para que el usuario sepa que ha elegido un elementor
//Para saber cual es el elementor elegido, utilizamos ternarios para saber cuál de los inputs se ha escogido.
//Dependiendo de estos, se completará la variable 'elementor' que luego concatenamos en la alerta.
//La alerta solo se activará en caso de que la variable contenga algún valor.
//En caso contrario hay un Easter Egg, un mensaje chistoso.
//Una vez que se elige un Elementor, y luego de la alerta, hay una acción disponible: la presentación del elementor.
//Luego de la presentación de nuestro elementor, se sucede la presentación del elementor contrario. 
//Para ello ejecutamos la función donde están las diferentes presentaciones segun sean los elementores.
//Para finalizar, tenemos también un controlador que verifica que no se pueda cambiar de elementor en medio de
//la partida. En ese caso, si ya se eligió el elementor, se indica que puede recargar la página para reelegir. 

    let elementor = '';

function handleSeleccion (){
    fluxo.checked ? elementor = 'Fluxo' : null;
    terracore.checked ? elementor = 'Terracore' : null;
    igneo.checked ? elementor = 'Igneo' : null;

    elementor ? null : 
    alert('El primer paso para jugar este juego es muy simple: Elegir un Elementor!! \nPorque si no eliges uno, entonces ni modo que vayas a pelear tú solo contra el Elementor contrario y termines ahogado, enterrado o calcinado. \nELIGE UN ELEMENTOR!!!');  
    elementor ? traer('nombre-elem-jugador').innerHTML = elementor : null; 
    if(elementor == 'Fluxo'){
        divPresentacionJd.innerHTML = 'Fluxo se acerca a la arena.'
        imagenPresentJd.setAttribute('src', "https://i.pinimg.com/564x/7f/84/ee/7f84ee4374111e02747aeb9a1c57af62.jpg")
    }
    else if(elementor == 'Terracore'){
        divPresentacionJd.innerHTML = 'Terracore entra en la arena.'
        imagenPresentJd.setAttribute('src', "https://i.pinimg.com/564x/0c/41/b6/0c41b64d7a65b01028c19be6e59a0cc6.jpg")
    }
    else if(elementor == 'Igneo') {
        divPresentacionJd.innerHTML = 'Igneo ingresa a la arena.' 
        imagenPresentJd.setAttribute('src', "https://i.pinimg.com/564x/1a/f3/33/1af333c4afddfc4552db741f341c5303.jpg")
    }
    elementor ? presentacionPC(elementor): null;
    elementor ? eleccion = true : eleccion
    
    if(elementor){
    seccionAtaque.style.display = 'block';
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

//Esta variable nos ayudará a saber si el juego ha llegado a su final o no aún.
let finalDelJuego = false

//Creamos una función para poder determinar el tipo de ataque:
//La función recibe un tipo de ataque como parámetro, y por ahora solamente hace un console.log del tipo de ataque.
//Si el ataque es de tipo fuerte se suma una unidad al contador para que solo se permita realizar 2 ataques fuertes.
//Se aumenta por una unidad la variable de rounds
function ataque(tipo){
  
    if(!elementor){
        alert('El primer paso para jugar este juego es muy simple: Elegir un Elementor!! \nPorque si no eliges uno, entonces ni modo que vayas a pelear tú solo contra el Elementor contrario y termines ahogado, enterrado o calcinado. \nSolo los Elementores aguantan este tipo de ataques, y además, por reglas de seguridad, no está permitido que un humano luche contra un Elementor, así que elige uno que te represente!!!');
        return 'No hay elementor'
    }

    tipoAtaqueJd = tipo
    if(tipo !== 'Fuerte' || (tipo == 'Fuerte' && contadorFuerteJd < 2)){
        console.log('Usted seleccionó un ataque de tipo ' + tipoAtaqueJd)
        tipo === 'Fuerte' ? contadorFuerteJd ++ : null
    }
    else {
        console.log('El jugador ya no puede realizar ataques fuertes')
        contadorFuerteJd = 2 ? alert('Ya no puede realizar ataques fuertes, tu elementor está cansado. Elige otro ataque.') : null;
    }
    
    if(elementor && (tipoAtaqueJd!== 'Fuerte' || (tipoAtaqueJd == 'Fuerte' && contadorFuerteJd <= 2))){
        round ++
        console.log('sume uno al round')
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

//------------------------------ATAQUES DE LOS ELEMENTORES----------------------------------------------
//Ahora creamos los diferentes ataques para cada uno de los elementores.
//Como quiero variedad, vamos a hacer cinco por cada uno de los niveles de fuerza y cada uno de los elementores.

let fluxoDebil = [
    'SHURIKENS DE AGUA.',
    'OLAS DE CHOQUE.',
    'TORBELLINO.',
    'CHORRO DE AGUA.',
    'ESFERA DE AGUA.'
]
let fluxoMedio = [
    'MULTIESFERAS.',
    'MORDIDA DE TIBURÓN.',
    'CASCADA APLASTANTE.',
    'ESPADAS DE HIELO.',
    'ENGUYIR Y AHOGAR.'
]
let fluxoFuerte = [
    'TORMENTA DE GRANIZO.',
    'CONGELAMIENTO.',
    'LIMPIEZA INTERNA.',
    'ABSORCIÓN TOTAL',
    'NIEBLA DE VAPOR.'
]


let terracoreDebil = [
    'ROCA GIGANTE.',
    'PARED DE ROCA.',
    'ENREDADERA ESPINOSA.',
    'EMPALAMIENTO POR ESTALAGMITAS.',
    'ATAÚD DE ATADURA DE ARENA.'
]
let terracoreMedio = [
    'EMBESTIDA BRUTAL.',
    'LAPIDACIÓN.',
    'PLANTA CARNÍVORA.',
    'MASAS DE ARENA.',
    'MONTAÑA APLASTANTE.' 
]
let terracoreFuerte = [
    'EMPALAMIENTO POR BOSQUE DE BAMBÚ.',
    'ARENAS MOVEDIZAS.',
    'TERREMOTO DEVASTADOR.',
    'SERPIENTE DE ARENA.',
    'ESTIRAMIENTO POR ENREDADERAS',
]


let igneoDebil = [
    'LLAMARADA DE FUEGO.',
    'BOLAS DE FUEGO.',
    'LÁTIGOS DE LAVA.',
    'PRISIÓN DE FUEGO.',
    'MANOS DE LAVA.'
]
let igneoMedio = [
    'PETRIFICACIÓN EN ROCA VOLCÁNICA.',
    'TORNADO DE FUEGO.',
    'ENGUYIR Y CALCINAR.',
    'ALIENTO DE PLASMA.',
    'TALADRO DE LAVA.'
]
let igneoFuerte = [
    'TORMENTA DE AZÚFRE.',
    'ESFERA DE PLASMA.',
    'GOLPO DE ALTO VOLTAJE.',
    'LAGO DE LAVA.',
    'SUPERNOVA.'
]

//--------------------------------DEFENSA DE LOS ELEMENTORES-------------------------------------------------
//En esta sección creamos las diferentes defensas de los elementores que se mostrarán según su nivel de defensa,
//La fuerza del ataque contrario y el nivel de vida. 
//Son solo tres por elementor, pero podría hacerse más extenso en el futuro.

let fluxoDef = [
    'Fluxo que absorve todo el impacto con su cuerpo flexible',
    'El agua de Fluxo comienza a volverse un poco turbia, pero aún puede pelear',
    'Fluxo está gravemente herido. Se recupera con la humedad del ambiente.'
]

let terracoreDef = [
    'No se ha podido traspazar la fuerte coraza de Terracore',
    'Terracore está herido. Utiliza barro sanador para recuperarse.',
    'Terracore casi es destruido. Aboserve minerales para recuperarse.',
]

let igneoDef = [
    'Las llamas de Igneo han absorvido todo el impacto.',
    'Igneo comienza a perder brillo. Absorve el oxígeno para avivar sus llamas.',
    'Igeno está casi apagado. Usa la energía geotérmica para recuperarse.'
]

//----------------------------------MENSAJERÍA----------------------------------------------------------------
//En esta sección se manejan los mensajes que se muestran en pantalla, narrando la lucha.

//La primer variable crea un numero aleatorio entre 0 y 4 para elegir un ataque al azar.
//La otra variable crea un numero aleatorio entre 0 y 2 para elegir una defensa al azar.
let azarDebil = () => {return Math.floor(Math.random() * (3 - 1) + 1);}
let azarMedio = () => {return Math.floor(Math.random() * (7 - 4) + 4);}
let azarFuerte = () => {return Math.floor(Math.random() * (12 - 8) + 8);}
let azar5 = () => {return Math.floor(Math.random() * (5 - 0) + 0);}
let azar3 = () => {return Math.floor(Math.random() * (3 - 0) + 0);}

//El primer mensaje corresponde al ataque del jugador. Además se coloca un hr de separación y el número de round.
function mensajeria1 (){
    let mensaje = document.createElement('p')
    console.log(elementor);
    if(tipoAtaqueJd === 'Débil'){
        elementor === 'Fluxo' ? mensaje.innerHTML = 'Fluxo ataca con ' + fluxoDebil[azar5()]  : null;
        elementor === 'Terracore' ? mensaje.innerHTML = 'Terracore ataca con ' + terracoreDebil[azar5()] : null;
        elementor === 'Igneo' ? mensaje.innerHTML = 'Igneo ataca con ' + igneoDebil[azar5()] : null;
        !elementor ? alert('Debes elegir un Elementor antes de atacar!!') : null;
        console.log(mensaje)
    }
    else if (tipoAtaqueJd === 'Medio'){
        elementor === 'Fluxo' ? mensaje.innerHTML = 'Fluxo ataca con ' + fluxoMedio[azar5()] : null;
        elementor === 'Terracore' ? mensaje.innerHTML = 'Terracore ataca con ' + terracoreMedio[azar5()] : null;
        elementor === 'Igneo' ? mensaje.innerHTML = 'Igneo ataca con ' + igneoMedio[azar5()] : null;
        !elementor ? alert('Debes elegir un Elementor antes de atacar!!') : null;
        console.log(mensaje)
    }
    else {
        elementor === 'Fluxo' ? mensaje.innerHTML = 'Fluxo ataca con ' + fluxoFuerte[azar5()] : null;
        elementor === 'Terracore' ? mensaje.innerHTML = 'Terracore ataca con ' + terracoreFuerte[azar5()] : null;
        elementor === 'Igneo' ? mensaje.innerHTML = 'Igneo ataca con ' + igneoFuerte[azar5()] : null;
        !elementor ? alert('Debes elegir un Elementor antes de atacar!!') : null;
        console.log(mensaje)
    }
    let cartel = document.createElement('h3');
    cartel.innerHTML = 'ROUND ' + round;
    let titulo = document.createElement('p');
    titulo.innerHTML = 'Ataque propio: ' + tipoAtaqueJd;
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
    let dano = [azarDebil(), azarMedio(), azarFuerte()]
    switch (elementorPC){
        case 'Fluxo': 
            if(tipoAtaqueJd == 'Débil' && tipoAtaquePC != 'Fuerte'){mensaje.innerHTML = fluxoDef[0] + (tipoAtaquePC == 'Medio'? `-${dano[0]}❤️` :  `=❤️`); tipoAtaquePC == 'Medio'? vidasPC-= dano[0] : vidasPC}
            else if(tipoAtaqueJd == 'Débil' && tipoAtaquePC == 'Fuerte'){mensaje.innerHTML = fluxoDef[1] + `-${dano[0]}❤️`; vidasPC -= dano[0]}
            else if(tipoAtaqueJd == 'Medio' && tipoAtaquePC == 'Débil'){mensaje.innerHTML = fluxoDef[0] + `-${dano[0]}❤️`; vidasPC -= dano[0]}
            else if(tipoAtaqueJd == 'Medio' && tipoAtaquePC == 'Medio'){mensaje.innerHTML = fluxoDef[1] + `-${dano[1]}❤️`; vidasPC -= dano[1]}
            else if(tipoAtaqueJd == 'Medio' && tipoAtaquePC == 'Fuerte'){mensaje.innerHTML = fluxoDef[2] + `-${dano[1]}❤️`; vidasPC -= dano[1]}
            else if(tipoAtaqueJd == 'Fuerte' && tipoAtaquePC == 'Débil'){mensaje.innerHTML = fluxoDef[1] + `-${dano[1]}❤️`; vidasPC -= dano[1]}
            else if(tipoAtaqueJd == 'Fuerte' && tipoAtaquePC != 'Débil'){mensaje.innerHTML = fluxoDef[2] + (tipoAtaquePC == 'Medio'? `-${dano[1]}❤️` : `-${dano[2]}❤️`); tipoAtaquePC == 'Medio'? vidasPC -= dano[1] : vidasPC -= dano[2]}
            break
        case 'Terracore':
            if(tipoAtaqueJd == 'Débil' && tipoAtaquePC != 'Fuerte'){mensaje.innerHTML = terracoreDef[0]+ (tipoAtaquePC == 'Medio'? `-${dano[0]}❤️` :  `=❤️`); tipoAtaquePC == 'Medio'? vidasPC-= dano[0] : vidasPC}
            else if(tipoAtaqueJd == 'Débil' && tipoAtaquePC == 'Fuerte'){mensaje.innerHTML = terracoreDef[1]+ `-${dano[0]}❤️`; vidasPC -= dano[0]}
            else if(tipoAtaqueJd == 'Medio' && tipoAtaquePC == 'Débil'){mensaje.innerHTML = terracoreDef[0]+ `-${dano[0]}❤️`; vidasPC -= dano[0]}
            else if(tipoAtaqueJd == 'Medio' && tipoAtaquePC == 'Medio'){mensaje.innerHTML = terracoreDef[1]+ `-${dano[1]}❤️`; vidasPC -= dano[1]}
            else if(tipoAtaqueJd == 'Medio' && tipoAtaquePC == 'Fuerte'){mensaje.innerHTML = terracoreDef[2]+ `-${dano[1]}❤️`; vidasPC -= dano[1]}
            else if(tipoAtaqueJd == 'Fuerte' && tipoAtaquePC == 'Débil'){mensaje.innerHTML = terracoreDef[1]+ `-${dano[1]}❤️`; vidasPC -= dano[1]}
            else if(tipoAtaqueJd == 'Fuerte' && tipoAtaquePC != 'Débil'){mensaje.innerHTML = terracoreDef[2]+ (tipoAtaquePC == 'Medio'? `-${dano[1]}❤️` : `-${dano[2]}❤️`); tipoAtaquePC == 'Medio'? vidasPC -= dano[1] : vidasPC -= dano[2]}
            break
        case 'Igneo':
            if(tipoAtaqueJd == 'Débil' && tipoAtaquePC != 'Fuerte'){mensaje.innerHTML = igneoDef[0]+ (tipoAtaquePC == 'Medio'? `-${dano[0]}❤️` :  `=❤️`); tipoAtaquePC == 'Medio'? vidasPC-= dano[0] : vidasPC}
            else if(tipoAtaqueJd == 'Débil' && tipoAtaquePC == 'Fuerte'){mensaje.innerHTML = igneoDef[1]+ `-${dano[0]}❤️`; vidasPC -= dano[0]}
            else if(tipoAtaqueJd == 'Medio' && tipoAtaquePC == 'Débil'){mensaje.innerHTML = igneoDef[0]+ `-${dano[0]}❤️`; vidasPC -= dano[0]}
            else if(tipoAtaqueJd == 'Medio' && tipoAtaquePC == 'Medio'){mensaje.innerHTML = igneoDef[1]+ `-${dano[1]}❤️`; vidasPC -= dano[1]}
            else if(tipoAtaqueJd == 'Medio' && tipoAtaquePC == 'Fuerte'){mensaje.innerHTML = igneoDef[2]+ `-${dano[1]}❤️`; vidasPC -= dano[1]}
            else if(tipoAtaqueJd == 'Fuerte' && tipoAtaquePC == 'Débil'){mensaje.innerHTML = igneoDef[1]+ `-${dano[1]}❤️`; vidasPC -= dano[1]}
            else if(tipoAtaqueJd == 'Fuerte' && tipoAtaquePC != 'Débil'){mensaje.innerHTML = igneoDef[2]+ (tipoAtaquePC == 'Medio'? `-${dano[1]}❤️` : `-${dano[2]}❤️`); tipoAtaquePC == 'Medio'? vidasPC -= dano[1] : vidasPC -= dano[2]}
            break
        default:
            console.log(elementorPC)
    }
    console.log(vidasPC);
    let titulo = document.createElement('p');
    titulo.innerHTML = 'DEFENSA DEL ELEMENTOR CONTRARIO:';
    elementor ? seccion.appendChild(document.createElement('hr')): null
    elementor ? seccion.appendChild(titulo) : null
    elementor ? seccion.appendChild(mensaje): null;
    elementor ? contadorVidasPC.innerHTML = vidasPC : null;
}

//El tercer mensaje corresponde al ataque de la PC
function mensajeria3 (){
    let mensaje = document.createElement('p')
    console.log(elementorPC);
    if(tipoAtaquePC === 'Débil'){
        elementorPC === 'Fluxo' ? mensaje.innerHTML = 'Fluxo ataca con ' + fluxoDebil[azar5()]  : null;
        elementorPC === 'Terracore' ? mensaje.innerHTML = 'Terracore ataca con ' + terracoreDebil[azar5()] : null;
        elementorPC === 'Igneo' ? mensaje.innerHTML = 'Igneo ataca con ' + igneoDebil[azar5()] : null;
        console.log(mensaje)
    }
    else if (tipoAtaquePC === 'Medio'){
        elementorPC === 'Fluxo' ? mensaje.innerHTML = 'Fluxo ataca con ' + fluxoMedio[azar5()] : null;
        elementorPC === 'Terracore' ? mensaje.innerHTML = 'Terracore ataca con ' + terracoreMedio[azar5()] : null;
        elementorPC === 'Igneo' ? mensaje.innerHTML = 'Igneo ataca con ' + igneoMedio[azar5()] : null;
        console.log(mensaje)
    }
    else {
        elementorPC === 'Fluxo' ? mensaje.innerHTML = 'Fluxo ataca con ' + fluxoFuerte[azar5()] : null;
        elementorPC === 'Terracore' ? mensaje.innerHTML = 'Terracore ataca con ' + terracoreFuerte[azar5()] : null;
        elementorPC === 'Igneo' ? mensaje.innerHTML = 'Igneo ataca con ' + igneoFuerte[azar5()] : null;
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
    
    switch (elementor){
        case 'Fluxo': 
            if(tipoAtaquePC == 'Débil' && tipoAtaqueJd != 'Fuerte'){mensaje.innerHTML = fluxoDef[0] + (tipoAtaqueJd == 'Medio'? `-${dano[0]}❤️` :  `=❤️`); tipoAtaqueJd == 'Medio'? vidasJd-= dano[0] : vidasJd}
            else if(tipoAtaquePC == 'Débil' && tipoAtaqueJd == 'Fuerte'){mensaje.innerHTML = fluxoDef[1] + `-${dano[0]}❤️`; vidasJd -= dano[0]}
            else if(tipoAtaquePC == 'Medio' && tipoAtaqueJd == 'Débil'){mensaje.innerHTML = fluxoDef[0] + `-${dano[0]}❤️`; vidasJd -= dano[0]}
            else if(tipoAtaquePC == 'Medio' && tipoAtaqueJd == 'Medio'){mensaje.innerHTML = fluxoDef[1] + `-${dano[1]}❤️`; vidasJd -= dano[1]}
            else if(tipoAtaquePC == 'Medio' && tipoAtaqueJd == 'Fuerte'){mensaje.innerHTML = fluxoDef[2] + `-${dano[1]}❤️`; vidasJd -= dano[1]}
            else if(tipoAtaquePC == 'Fuerte' && tipoAtaqueJd == 'Débil'){mensaje.innerHTML = fluxoDef[1] + `-${dano[1]}❤️`; vidasJd -= dano[1]}
            else if(tipoAtaquePC == 'Fuerte' && tipoAtaqueJd != 'Débil'){mensaje.innerHTML = fluxoDef[2]+ (tipoAtaqueJd == 'Medio'? `-${dano[1]}❤️` : `-${dano[2]}❤️`); tipoAtaqueJd == 'Medio'? vidasJd -= dano[1] : vidasJd -= dano[2]}
            break
        case 'Terracore':
            if(tipoAtaquePC == 'Débil' && tipoAtaqueJd != 'Fuerte'){mensaje.innerHTML = terracoreDef[0]+ (tipoAtaqueJd == 'Medio'? `-${dano[0]}❤️` :  `=❤️`); tipoAtaqueJd == 'Medio'? vidasJd-= dano[0] : vidasJd}
            else if(tipoAtaquePC == 'Débil' && tipoAtaqueJd == 'Fuerte'){mensaje.innerHTML = terracoreDef[1]+ `-${dano[0]}❤️`; vidasJd -= dano[0]}
            else if(tipoAtaquePC == 'Medio' && tipoAtaqueJd == 'Débil'){mensaje.innerHTML = terracoreDef[0]+ `-${dano[0]}❤️`; vidasJd -= dano[0]}
            else if(tipoAtaquePC == 'Medio' && tipoAtaqueJd == 'Medio'){mensaje.innerHTML = terracoreDef[1]+ `-${dano[1]}❤️`; vidasJd -= dano[1]}
            else if(tipoAtaquePC == 'Medio' && tipoAtaqueJd == 'Fuerte'){mensaje.innerHTML = terracoreDef[2]+ `-${dano[1]}❤️`; vidasJd -= dano[1]}
            else if(tipoAtaquePC == 'Fuerte' && tipoAtaqueJd == 'Débil'){mensaje.innerHTML = terracoreDef[1]+ `-${dano[1]}❤️`; vidasJd -= dano[1]}
            else if(tipoAtaquePC == 'Fuerte' && tipoAtaqueJd != 'Débil'){mensaje.innerHTML = terracoreDef[2]+ (tipoAtaqueJd == 'Medio'? `-${dano[1]}❤️` : `-${dano[2]}❤️`); tipoAtaqueJd == 'Medio'? vidasJd -= dano[1] : vidasJd -= dano[2]}
            break
        case 'Igneo':
            if(tipoAtaquePC == 'Débil' && tipoAtaqueJd != 'Fuerte'){mensaje.innerHTML = igneoDef[0]+ (tipoAtaqueJd == 'Medio'? `-${dano[0]}❤️` :  `=❤️`); tipoAtaqueJd == 'Medio'? vidasJd-= dano[0] : vidasJd}
            else if(tipoAtaquePC == 'Débil' && tipoAtaqueJd == 'Fuerte'){mensaje.innerHTML = igneoDef[1]+ `-${dano[0]}❤️`; vidasJd -= dano[0]}
            else if(tipoAtaquePC == 'Medio' && tipoAtaqueJd == 'Débil'){mensaje.innerHTML = igneoDef[0]+ `-${dano[0]}❤️`; vidasJd -= dano[0]}
            else if(tipoAtaquePC == 'Medio' && tipoAtaqueJd == 'Medio'){mensaje.innerHTML = igneoDef[1]+ `-${dano[1]}❤️`; vidasJd -= dano[1]}
            else if(tipoAtaquePC == 'Medio' && tipoAtaqueJd == 'Fuerte'){mensaje.innerHTML = igneoDef[2]+ `-${dano[1]}❤️`; vidasJd -= dano[1]}
            else if(tipoAtaquePC == 'Fuerte' && tipoAtaqueJd == 'Débil'){mensaje.innerHTML = igneoDef[1]+ `-${dano[1]}❤️`; vidasJd -= dano[1]}
            else if(tipoAtaquePC == 'Fuerte' && tipoAtaqueJd != 'Débil'){mensaje.innerHTML = igneoDef[2]+ (tipoAtaqueJd == 'Medio'? `-${dano[1]}❤️` : `-${dano[2]}❤️`); tipoAtaqueJd == 'Medio'? vidasJd -= dano[1] : vidasJd -= dano[2]}
            break
        default:
            console.log(elementor)
    }
    console.log(vidasJd);
    let seccion = traer('actions');
    let titulo = document.createElement('p');
    titulo.innerHTML = 'DEFENSA DE TU ELEMENTOR:';
    elementor ? seccion.appendChild(document.createElement('hr')) : null
    elementor ? seccion.appendChild(titulo): null
    elementor ? seccion.appendChild(mensaje): null;
    elementor ? contadorVidasJd.innerHTML = vidasJd : null;

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

//----------------------------------------------------------------------------------------------------------

//Para que esto se ejecute una vez que termina de cargar el html, necesito que window espere al evento 'load'
//Una vez que el html cargue, se iniciará el juego y entonces se implementará la función que llama a los 
//elementos por ID
window.addEventListener('load', iniciarJuego)