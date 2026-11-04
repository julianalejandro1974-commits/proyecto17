
// Array donde se almacenarán las tareas
let tareas = [];

// Obtener elementos del HTML
const entradaTarea = document.getElementById("entradaTarea");
const botonAgregar = document.getElementById("botonAgregar");
const listaTareas = document.getElementById("listaTareas");
const contador = document.getElementById("contador");
const mensajeVacio = document.getElementById("mensajeVacio");


// FUNCIÓN PARA AGREGAR UNA TAREA
function agregarTarea() {

    const descripcion = entradaTarea.value.trim();

    // Evitar agregar tareas vacías
    if (descripcion === "") {
        alert("Por favor, escribe una tarea.");
        return;
    }

    // Crear un objeto para la nueva tarea
    const nuevaTarea = {
        id: Date.now(),
        descripcion: descripcion,
        completada: false
    };

    // Agregar la tarea al array
    tareas.push(nuevaTarea);

    // Limpiar el campo de texto
    entradaTarea.value = "";

    // Actualizar la lista
    renderizarTareas();
}


// FUNCIÓN PARA MARCAR O DESMARCAR UNA TAREA
function cambiarEstado(id) {

    tareas = tareas.map(tarea => {

        if (tarea.id === id) {
            return {
                ...tarea,
                completada: !tarea.completada
            };
        }

        return tarea;
    });

    renderizarTareas();
}


// FUNCIÓN PARA ELIMINAR UNA TAREA
function eliminarTarea(id) {

    tareas = tareas.filter(tarea => tarea.id !== id);

    renderizarTareas();
}


// FUNCIÓN PARA MOSTRAR LAS TAREAS
function renderizarTareas() {

    // Limpiar la lista antes de volver a dibujarla
    listaTareas.innerHTML = "";

    // Ordenar: pendientes primero y completadas al final
    const tareasOrdenadas = [
        ...tareas.filter(tarea => !tarea.completada),
        ...tareas.filter(tarea => tarea.completada)
    ];

    // Recorrer todas las tareas
    tareasOrdenadas.forEach(tarea => {

        // Crear elemento de lista
        const elemento = document.createElement("li");

        elemento.className = "tarea";

        // Si está completada, agregar la clase correspondiente
        if (tarea.completada) {
            elemento.classList.add("completada");
        }

        // Crear contenedor del contenido
        const contenido = document.createElement("div");
        contenido.className = "contenido-tarea";

        // Crear checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarea.completada;

        checkbox.addEventListener("change", () => {
            cambiarEstado(tarea.id);
        });

        // Crear descripción
        const descripcion = document.createElement("span");
        descripcion.className = "descripcion";
        descripcion.textContent = tarea.descripcion;

        // Crear botón eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.className = "boton-eliminar";
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", () => {
            eliminarTarea(tarea.id);
        });

        // Agregar elementos al contenedor
        contenido.appendChild(checkbox);
        contenido.appendChild(descripcion);

        elemento.appendChild(contenido);
        elemento.appendChild(botonEliminar);

        // Agregar tarea a la lista
        listaTareas.appendChild(elemento);
    });

    // Actualizar contador
    contador.textContent = `${tareas.length} tareas`;

    // Mostrar mensaje cuando no existan tareas
    if (tareas.length === 0) {
        mensajeVacio.classList.remove("oculto");
    } else {
        mensajeVacio.classList.add("oculto");
    }
}


// EVENTO DEL BOTÓN AGREGAR
botonAgregar.addEventListener("click", agregarTarea);


// PERMITIR AGREGAR TAREAS CON ENTER
entradaTarea.addEventListener("keydown", function (evento) {

    if (evento.key === "Enter") {
        agregarTarea();
    }

});


// Mostrar lista inicial
renderizarTareas();
