document.addEventListener("DOMContentLoaded", function () {
    cargarElementos();
});

document.getElementById("elementoForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita que la página se recargue

    const nombre = document.getElementById("nombre").value;
    
    if (!nombre.trim()) {
        alert("El nombre es obligatorio");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/elementos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre })
        });

        if (response.ok) {
            document.getElementById("mensaje").innerText = "Elemento agregado correctamente";
            document.getElementById("nombre").value = ""; // Limpiar el campo
            cargarElementos(); // Recargar lista
        } else {
            document.getElementById("mensaje").innerText = "Error al agregar el elemento";
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        document.getElementById("mensaje").innerText = "Error en la conexión con el servidor";
    }
});

async function cargarElementos() {
    try {
        const response = await fetch("http://localhost:3000/api/elementos");
        const elementos = await response.json();
        
        const lista = document.getElementById("listaElementos");
        lista.innerHTML = "";

        elementos.forEach(elemento => {
            const item = document.createElement("li");
            item.textContent = elemento.nombre;
            
            const btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";
            btnEditar.onclick = () => editarElemento(elemento.id, elemento.nombre);
            
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.onclick = () => eliminarElemento(elemento.id);
            
            item.appendChild(btnEditar);
            item.appendChild(btnEliminar);
            lista.appendChild(item);
        });
    } catch (error) {
        console.error("Error al cargar elementos:", error);
    }
}

async function eliminarElemento(id) {
    try {
        await fetch(`http://localhost:3000/api/elementos/${id}`, {
            method: "DELETE"
        });
        cargarElementos();
    } catch (error) {
        console.error("Error al eliminar el elemento:", error);
    }
}

function editarElemento(id, nombreActual) {
    const nuevoNombre = prompt("Editar nombre:", nombreActual);
    if (nuevoNombre && nuevoNombre.trim() !== "") {
        actualizarElemento(id, nuevoNombre);
    }
}

async function actualizarElemento(id, nombre) {
    try {
        await fetch(`http://localhost:3000/api/elementos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre })
        });
        cargarElementos();
    } catch (error) {
        console.error("Error al actualizar el elemento:", error);
    }
}
