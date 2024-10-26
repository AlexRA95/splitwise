class Usuario {
    constructor(nombre, pathImg) {
        this.nombre = nombre;
        this.gastos = [];
        this.pathImg = pathImg;
    }

    newGasto(titulo,cantidad,fecha){
        this.gastos.push(new Gasto(titulo,cantidad,fecha));
    }

    getNombre(){
        return this.nombre;
    }

    getImg(){
        return this.pathImg;
    }

    totalPagado(){
        let total = 0; 
        this.gastos.forEach(gasto => {
            total += Number(gasto.getMonto());
        });
        return total; 
    }
}


class Gasto {
    constructor(titulo, monto, fecha) {
        this.titulo = titulo;
        this.monto = monto;
        this.fecha = fecha;
    }
    
    getMonto(){
        return this.monto;
    }
}

let Juan = new Usuario('Juan', '../img/usuarios/avatar_a.png');
let Paco = new Usuario('Paco','../img/usuarios/avatar_b.png');
let Pepe = new Usuario('Pepe','../img/usuarios/avatar_c.png');
let usuarios= [Juan,Paco,Pepe];

//Crear parte de formulario
function crearForm() {
    let cont = document.getElementById("formulario");//Zona donde se coloca el formulario
    let form = document.createElement("form");//Elemento form
    form.classList.add("mb-10","d-flex","flex-column");//Añadimos clases al form
    form.setAttribute('id','form');
    let labelUser= document.createElement("label");//Label para elegir el usuario
    labelUser.setAttribute("for","user");
    labelUser.textContent="Elige un usuario:";

    let selectUser = document.createElement("select");//Elemento select de los usuarios
    selectUser.setAttribute("name","user");
    selectUser.setAttribute("id","usuario");

    //Diferentes opciones del select de usuarios
    let optionDefault= document.createElement("option");
    let optionJuan= document.createElement("option");
    let optionPaco= document.createElement("option");
    let optionPepe= document.createElement("option");
    optionDefault.value="none";
    optionDefault.textContent='---';
    optionJuan.value="Juan";
    optionJuan.textContent='Juan';
    optionPaco.value="Paco";
    optionPaco.textContent='Paco';
    optionPepe.value="Pepe";
    optionPepe.textContent='Pepe';

    //Generar label e input de titulo
    let labelTitulo= document.createElement("label");
    labelTitulo.setAttribute("for","titulo");
    labelTitulo.textContent= "Titulo:";
    let inputTitulo = document.createElement("input");
    inputTitulo.setAttribute("type","text");
    inputTitulo.setAttribute("id","titulo");

    //Generar label e input de importe
    let labelImporte= document.createElement("label");
    labelImporte.setAttribute("for","Importe");
    labelImporte.textContent= "Importe:";
    let inputImporte = document.createElement("input");
    inputImporte.setAttribute("type","text");
    inputImporte.setAttribute("id","importe");

    //Generar label e input de fecha
    let labelFecha= document.createElement("label");
    labelFecha.setAttribute("for","fecha");
    labelFecha.textContent= "Fecha:";
    let inputFecha = document.createElement("input");
    inputFecha.setAttribute("type","text");
    inputFecha.setAttribute("id","fecha");

    //Generar boton de enviar
    let enviar = document.createElement("button");
    enviar.classList.add("btn","btn-success");
    enviar.setAttribute('id','enviar');
    enviar.textContent="Enviar";

    selectUser.appendChild(optionDefault);
    selectUser.appendChild(optionJuan);
    selectUser.appendChild(optionPaco);
    selectUser.appendChild(optionPepe);
    form.appendChild(labelUser);
    form.appendChild(selectUser);
    form.appendChild(labelTitulo);
    form.appendChild(inputTitulo);
    form.appendChild(labelImporte);
    form.appendChild(inputImporte);
    form.appendChild(labelFecha);
    form.appendChild(inputFecha);
    form.appendChild(enviar);
    cont.appendChild(form);
}
crearForm();

function checkTitulo(element) {
    let re = new RegExp("^[A-Za-z0-9 ]{1,20}$");
    if (element.value.trim !=="") {
        if(re.test(element.value)){
            cambiarColor(element,true);
        }else{
            cambiarColor(element,false);
        }
    }
}

function checkImporte(element) {
    let re = new RegExp("^(?:1000\.00|[0-9]{1,3}\.[0-9]{2})$");
    if (element.value.trim !=="") {
        if(re.test(element.value)){
            cambiarColor(element,true);
        }else{
            cambiarColor(element,false);
        }
    }
}

function checkFecha(element) {
    const re = /^(?:(?:31\/(?:0[13578]|1[02])\/(?:19|20)\d{2})|(?:30\/(?:0[13-9]|1[0-2])\/(?:19|20)\d{2})|(?:29\/02\/(?:19|20)(?:[02468][048]|[13579][26]))|(?:[0-2][0-9]\/(?:0[1-9]|1[0-2])\/(?:19|20)\d{2}))$/;
    if (element.value.trim !=="") {
        if(re.test(element.value)){
            cambiarColor(element,true);
        }else{
            cambiarColor(element,false);
        }
    }
}

function checkSelectUser(element) {
    if (element.value === "none") {
        cambiarColor(element, false);
    } else {
        cambiarColor(element, true);
    }
}

function checkAllFields() {
    checkTitulo(document.getElementById('titulo'));
    checkImporte(document.getElementById('importe'));
    checkFecha(document.getElementById('fecha'));
    checkSelectUser(document.getElementById('usuario'));

    let allFieldsValid = true;
    
    // Verifica si todos los campos tienen la clase "bien"
    let fields = ['titulo', 'importe', 'fecha','usuario'];
    fields.forEach((fieldId) => {
        let field = document.getElementById(fieldId);
        if (!field.classList.contains('bien')) {
            allFieldsValid = false;
        }
    });

    if (allFieldsValid) {
        //Todos los campos son correctos
        //Buscamos al usuario concreto y le añadimos el gasto
        usuarios.forEach(user => {
            if (user.getNombre() === document.getElementById('usuario').value) {
                user.newGasto(document.getElementById('titulo').value,document.getElementById('importe').value,document.getElementById('fecha').value);
            }
        });

        newResumen(document.getElementById('usuario').value,document.getElementById('importe').value,document.getElementById('fecha').value);
        fields.forEach((fieldId) => {
            let field = document.getElementById(fieldId);
            field.setAttribute('class','');
            document.getElementById('form').reset();
        });
        cuantoHaPagado();
        
    } else {
        //Si todos los campos no son validos se manda un alert de que algun campo es incorrecto
        alert("Algun campo introducido no es valido");
    }
}

function cambiarColor(elemento,tipo) {
    if (tipo) {
        elemento.setAttribute('class','bien');
    }else{
        elemento.setAttribute('class','mal');
    }
}

document.getElementById('enviar').addEventListener('click',checkAllFields);

document.getElementById('enviar').addEventListener('click', function(event) {
    event.preventDefault();
});

function newResumen(nombre,importe,fecha) {
    let resumen = document.getElementById('resumen');
    //Creamos el elemento card
    let card = document.createElement('div');
    card.classList.add('card', 'mb-12', 'espacio');
    //Creamos una row de bs5
    let row = document.createElement('div');
    row.classList.add('row', 'g-0');
    //Creamos una nueva col para almacenar la imagen
    let colImg = document.createElement('div');
    colImg.classList.add('col-2');
    //Creamos la imagen del usuario
    let img = document.createElement('img');
    usuarios.forEach(user => {
        if (user.getNombre()===nombre) {
            img.src = user.getImg();
        }})
    img.classList.add('img-fluid', 'rounded-start');
    colImg.appendChild(img);

    // Crear la columna para alamcenar la informacion del pago
    let colContent = document.createElement('div');
    colContent.classList.add('col-10');
    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Crear el título y el texto de la tarjeta
    let title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = nombre;

    let text = document.createElement('p');
    text.classList.add('card-text');
    text.textContent = 'Pagó ' + importe + '€ el ' + fecha;

    //Montamos la tarjeta de resumen
    cardBody.appendChild(title);
    cardBody.appendChild(text);
    colContent.appendChild(cardBody);
    row.appendChild(colImg);
    row.appendChild(colContent);
    card.appendChild(row);
    resumen.appendChild(card);
}

function genCuenta(nombre) {
    let cuenta = document.getElementById('cuenta');
    // Crear el contenedor principal (card)
    let card = document.createElement('div');
    card.classList.add('card', 'mb-12', 'espacio');

    // Crear la fila (row)
    let row = document.createElement('div');
    row.classList.add('row', 'g-0');

    // Crear la columna para la imagen (col-md-2)
    let colImg = document.createElement('div');
    colImg.classList.add('col-md-2');

    // Crear el elemento de imagen
    let img = document.createElement('img');
    usuarios.forEach(user => {
        if (user.getNombre()===nombre) {
            img.src = user.getImg();
        }})
    img.classList.add('img-fluid', 'rounded-start');
    colImg.appendChild(img);

    // Crear la columna para el contenido (col-md-10)
    let colContent = document.createElement('div');
    colContent.classList.add('col-md-10');

    // Crear el cuerpo de la tarjeta (card-body)
    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Crear el título de la tarjeta (h5)
    let title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = nombre; 

    // Creamos el elemento donde almacenaremos cuanto se le debe o debe el usuario
    let text = document.createElement('p');
    text.classList.add('card-text');
    text.setAttribute('id',nombre);

    // Montamos la tarjeta de Cuenta
    cardBody.appendChild(title);
    cardBody.appendChild(text);
    colContent.appendChild(cardBody);
    row.appendChild(colImg);
    row.appendChild(colContent);
    card.appendChild(row);
    cuenta.appendChild(card); 
}

genCuenta('Juan');
genCuenta('Paco');
genCuenta('Pepe');

function cuantoHaPagado() {
    //Ha pagado XX€ se le debe XX€.
    usuarios.forEach(user => {
        let deber = document.getElementById(user.getNombre());
        deber.textContent=cuantoDebe(user.getNombre());
    });
    //Obtenemos cuanto debe o le deben a cada usuario 
}

function cuantoDebe(nombre) {
    let totalGlobal = 0;
    let pagadoUser=0;
    let debe=0;
    let mensaje="";
    //Obtenemos la cantidad total que han pagado los otros usuarios y la que ha pagado el usuario
    usuarios.forEach(user => {
        if (user.getNombre()===nombre) {
            pagadoUser+= user.totalPagado();
        }else{
            totalGlobal += user.totalPagado();
        }
    });
        // Calculamos el promedio que debería haber pagado cada usuario
        let promedioPorUsuario = totalGlobal / usuarios.length;

        // Calculamos cuánto debe o cuánto se le debe al usuario
        debe = pagadoUser - promedioPorUsuario;
    
        if (debe > 0) {
            mensaje = 'Ha pagado ' + pagadoUser + '€ se le debe ' + debe.toFixed(2) + '€';
        } else {
            mensaje = 'Ha pagado ' + pagadoUser + '€ y debe ' + Math.abs(debe).toFixed(2) + '€';
        }
    
        return mensaje;
}

cuantoHaPagado();