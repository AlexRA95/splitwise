class Usuario {
    constructor(nombre, pathImg) {
        this.nombre = nombre;
        this.gastos = [];
        this.pathImg = pathImg;
    }

    // Completar con los métodos necesarios
}


class Gasto {
    constructor(titulo, monto, fecha) {
        this.titulo = titulo;
        this.monto = monto;
        this.fecha = fecha;
    }
    // Completar con los métodos necesarios
}



//Crear parte de formulario
function crearForm() {
    let cont = document.getElementById("formulario");//Zona donde se coloca el formulario
    let form = document.createElement("form");//Elemento form
    form.classList.add("mb-10");//Añadimos clases al form
    let labelUser= document.createElement("label");//Label para elegir el usuario
    labelUser.setAttribute("for","user");
    labelUser.textContent="Elige un usuario:";

    let selectUser = document.createElement("select");//Elemento select de los usuarios
    selectUser.setAttribute("name","user");
    selectUser.setAttribute("id","usuario");

    let optionDefault= document.createElement("option");
    let optionJuan= document.createElement("option");
    let optionPaco= document.createElement("option");
    let optionPepe= document.createElement("option");
    /*
    <label for="cars">Choose a car:</label>
    <select name="cars" id="cars" form="carform">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
    </select>
    */
    form.appendChild(labelUser,selectUser);
    cont.appendChild(form);
}

crearForm();