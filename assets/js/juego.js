const miModulo=(() => {
    'use strict'

    let deck = [];
    const tipos = ["C", "H", "D", "S"],
          especiales = ["A", "J", "Q", "K"];
    //Referencias de HTML
    const botonPedir = document.querySelector("#btnPedir"),
          botonDetener = document.querySelector("#btnDetener"),
          botonNuevoJuego = document.querySelector("#btnNuevo");

    const divCartasJugadores = document.querySelectorAll(".divCartas");
    const todosSmall = document.querySelectorAll("small");
    /*let puntosJugador = 0,
        puntosComputadora = 0;*/
    let puntosJugadores = [];
    //Esta función inicializa el juego
    const iniciaJuego = ( numJugadores=2 )=>{
        deck = crearDeck();
        puntosJugadores=[];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
            
        }
        // document.querySelector("small").innerText = 0;
        // const todosSmall = document.querySelectorAll("small");
        // todosSmall[1].innerText = 0;
        todosSmall.forEach(elem => elem.innerText=0);
        divCartasJugadores.forEach(elem=>elem.innerHTML='');
        botonPedir.disabled = false;
        botonDetener.disabled = false;
        
    }
    //Esta función crea una nueva baraja
    const crearDeck = () => {

        deck = [];
        for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
        }
        for (let especial of especiales) {
        for (let tipo of tipos) {
            deck.push(especial + tipo);
        }
        }

        
        return _.shuffle(deck);;
    };

    
    // Esta función me permite elegir una carta.
    const pedirCarta = () => {
        if (deck.length === 0) {
        throw "no hay mas cartas en el mazo";
        }
        return deck.pop();
    };
    //valor carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return isNaN(valor) ? (valor === "A" ? 11 : 10) : parseInt(valor);//(puntos = valor * 1);
    };
    // Turno : 0 = primer jugador y el último será la computadora
    const acumularPuntos = (carta,turno)=>{
        puntosJugadores[turno] = puntosJugadores[turno]  + valorCarta(carta);
        todosSmall[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta,turno) =>{
        const newCarta = document.createElement("img");
        newCarta.classList.add("cartas");
        newCarta.src = `assets/cartas/${carta}.png`;
        divCartasJugadores[turno].append(newCarta);
    }
    const determinarGanador = ()=> {
        const [ puntosMinimos , puntosComputadora] = puntosJugadores;
        setTimeout(() => {
            if (puntosMinimos === puntosComputadora) {
                alert("Ni Dios Ganó");
            } else if (puntosMinimos > 21) {
                alert("Computadora Gana");
            } else if (puntosComputadora > 21) {
                alert("Jugador gana");
            } else {
                alert("Computadora gana");
            }
            }, 100);
    }

    //turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
        const carta = pedirCarta();
        puntosComputadora = acumularPuntos(carta,puntosJugadores.length-1);
        console.log('lospuntos de la compu',puntosComputadora);
        
        crearCarta(carta,puntosJugadores.length-1);

        } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

        determinarGanador();

    };

    // Eventos
    botonPedir.addEventListener("click", () => {
        const carta = pedirCarta();
        const puntosJugador=acumularPuntos(carta,0);
       
        crearCarta(carta,0);



        if (puntosJugador > 21) {

        console.warn('te has pasado');
        botonPedir.disabled = true;
        botonDetener.disabled = true;
        turnoComputadora(puntosJugador);

        } else if (puntosJugador === 21) {

        const mensaje = document.createElement("h2");
        mensaje.innerHTML = "21 genial";
        divCartasJugador.append(mensaje);
        botonPedir.disabled = true;
        botonDetener.disabled = true;
        turnoComputadora(puntosJugador);

        }
    });

    //Evento Detener
    botonDetener.addEventListener("click", () => {

        botonPedir.disabled = true;
        botonDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });
    //Evento NuevoJuego
    // botonNuevoJuego.addEventListener("click", () => {

    //     iniciaJuego();

    // }); 
    return {
        nuevoJuego:iniciaJuego,
    };
})();
