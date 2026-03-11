// Cargar datos guardados
let proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];

mostrarProyectos();

function guardarDatos(){
    localStorage.setItem("proyectos", JSON.stringify(proyectos));
}

/* =========================
   CRUD PROYECTOS
========================= */

function crearProyecto(){

    let nombre = document.getElementById("nombreProyecto").value.trim();

    if(nombre === ""){
        alert("Ingrese un nombre");
        return;
    }

    proyectos.push({
        nombre: nombre,
        miembros: [],
        tareas: []
    });

    guardarDatos();
    document.getElementById("nombreProyecto").value="";
    mostrarProyectos();
}

function editarProyecto(index){

    let nuevoNombre = prompt("Nuevo nombre del proyecto", proyectos[index].nombre);

    if(nuevoNombre){
        proyectos[index].nombre = nuevoNombre;
        guardarDatos();
        mostrarProyectos();
    }
}

function eliminarProyecto(index){

    if(confirm("¿Eliminar proyecto?")){
        proyectos.splice(index,1);
        guardarDatos();
        mostrarProyectos();
    }

}

/* =========================
   MOSTRAR PROYECTOS
========================= */

function mostrarProyectos(){

    let contenedor = document.getElementById("listaProyectos");

    contenedor.innerHTML="";

    proyectos.forEach((proyecto,index)=>{

        contenedor.innerHTML+=`

        <div class="proyecto">

        <h3>${proyecto.nombre}</h3>

        <button onclick="editarProyecto(${index})">
        Editar
        </button>

        <button onclick="eliminarProyecto(${index})">
        Eliminar
        </button>

        <button onclick="agregarMiembro(${index})">
        Agregar miembro
        </button>

        <button onclick="agregarTarea(${index})">
        Agregar tarea
        </button>

        <h4>Miembros</h4>
        <ul id="miembros${index}"></ul>

        <h4>Tareas</h4>
        <ul id="tareas${index}"></ul>

        </div>

        `;

        mostrarMiembros(index);
        mostrarTareas(index);

    });

}

/* =========================
   CRUD MIEMBROS
========================= */

function agregarMiembro(index){

    let nombre = prompt("Nombre del miembro");

    if(!nombre) return;

    nombre = nombre.trim();

    let miembros = proyectos[index].miembros;

    if(miembros.includes(nombre)){
        alert("El miembro ya existe");
        return;
    }

    miembros.push(nombre);

    guardarDatos();

    mostrarMiembros(index);
}

function editarMiembro(pIndex,mIndex){

    let nuevo = prompt("Nuevo nombre", proyectos[pIndex].miembros[mIndex]);

    if(nuevo){
        proyectos[pIndex].miembros[mIndex] = nuevo;
        guardarDatos();
        mostrarMiembros(pIndex);
    }

}

function eliminarMiembro(pIndex,mIndex){

    proyectos[pIndex].miembros.splice(mIndex,1);

    guardarDatos();

    mostrarMiembros(pIndex);
}

function mostrarMiembros(index){

    let lista = document.getElementById("miembros"+index);

    lista.innerHTML="";

    proyectos[index].miembros.forEach((miembro,mIndex)=>{

        lista.innerHTML+=`

        <li>

        ${miembro}

        <button onclick="editarMiembro(${index},${mIndex})">
        Editar
        </button>

        <button onclick="eliminarMiembro(${index},${mIndex})">
        Eliminar
        </button>

        </li>

        `;

    });

}

/* =========================
   CRUD TAREAS
========================= */

function agregarTarea(index){

    let proyecto = proyectos[index];

    if(proyecto.miembros.length===0){
        alert("Debe agregar miembros primero");
        return;
    }

    let titulo = prompt("Título de la tarea");

    if(!titulo) return;

    let responsables = proyecto.miembros.join(", ");

    let responsable = prompt(
        "Responsable\nMiembros disponibles:\n"+responsables
    );

    if(!proyecto.miembros.includes(responsable)){
        alert("El responsable no pertenece al proyecto");
        return;
    }

    proyecto.tareas.push({
        titulo: titulo,
        responsable: responsable,
        estado: "Pendiente"
    });

    guardarDatos();

    mostrarTareas(index);
}

function editarTarea(pIndex,tIndex){

    let nuevoTitulo = prompt(
        "Editar título",
        proyectos[pIndex].tareas[tIndex].titulo
    );

    if(nuevoTitulo){
        proyectos[pIndex].tareas[tIndex].titulo = nuevoTitulo;
        guardarDatos();
        mostrarTareas(pIndex);
    }

}

function eliminarTarea(pIndex,tIndex){

    proyectos[pIndex].tareas.splice(tIndex,1);

    guardarDatos();

    mostrarTareas(pIndex);
}

function mostrarTareas(index){

    let lista = document.getElementById("tareas"+index);

    lista.innerHTML="";

    proyectos[index].tareas.forEach((tarea,tIndex)=>{

        lista.innerHTML+=`

        <li>

        <strong>${tarea.titulo}</strong>
        - Responsable: ${tarea.responsable}
        - Estado: ${tarea.estado}

        <button onclick="editarTarea(${index},${tIndex})">
        Editar
        </button>

        <button onclick="eliminarTarea(${index},${tIndex})">
        Eliminar
        </button>

        </li>

        `;

    });

}