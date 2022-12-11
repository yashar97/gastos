//variables
const formulario = document.querySelector('#agregar-gasto');
let gastos = [];
//eventos

//clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = presupuesto;
        this.restante = presupuesto;
    }

    actualizarRestante() {
        const restante = gastos.reduce((acc, element) => acc + Number(element.nuevaCantidad), 0);
        
        const nuevoRestante = this.presupuesto - restante;


        document.querySelector('#restante').textContent = nuevoRestante;

        
    }
}

let presupuesto;

//funciones
eventos();
function eventos() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    //agregamos evento submit al formulario
    formulario.addEventListener('submit', agregarGastos);
}   


function preguntarPresupuesto() {
    const presupuestoUsuario = prompt("Cuánto es tu presupuesto?");
    
    if(presupuestoUsuario === "" || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }


    document.querySelector('#total').textContent = presupuestoUsuario;
    document.querySelector('#restante').textContent = presupuestoUsuario;

    presupuesto = new Presupuesto(presupuestoUsuario);
}


function agregarGastos(e) {
    e.preventDefault();

    const nuevoGasto = document.querySelector('#gasto').value;
    const nuevaCantidad = document.querySelector('#cantidad').value;

    if(nuevoGasto === "" || nuevaCantidad === "" || isNaN(nuevaCantidad) || nuevaCantidad <= 0) {
        mostrarAlerta("Ambos campos son obligatorios", "error");
        return;
    }

    mostrarAlerta("Gasto agregado correctamente", "correcto");
    formulario.reset();

    const gasto = {nuevoGasto, nuevaCantidad, id: Date.now()}

    gastos = [...gastos, gasto];

    imprimirGastos();
    presupuesto.actualizarRestante();
}

function imprimirGastos() {
    limpiarHTML();
    gastos.forEach(element => {
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = "Borrar";
        btnEliminar.setAttribute('id', `eliminar${element.id}`);
        const li = document.createElement('li');
        li.innerHTML = `${element.nuevoGasto} ${element.nuevaCantidad}`;
        li.appendChild(btnEliminar)
        document.querySelector('.list-group').appendChild(li);

        const borrarGasto = document.querySelector(`#eliminar${element.id}`);
        borrarGasto.addEventListener('click', () => {
            eliminarGasto(element.id);
        });
    });


}

function eliminarGasto(id) {
    gastos = gastos.filter(element => element.id !== id);
    imprimirGastos();
    presupuesto.actualizarRestante();
}

function mostrarAlerta(mensaje, tipo) {
    const alerta = document.createElement('p');
    
    if(tipo === "error") {
        alerta.style.color = "red";
    }else {
        alerta.style.color = "green";
    }

    alerta.textContent = mensaje;

    document.querySelector('.contenido-primario').insertBefore(alerta, formulario);

    setTimeout(() => {
        alerta.remove();
    }, 2000);

}

function limpiarHTML() {
    document.querySelector('.list-group').innerHTML = "";
}
