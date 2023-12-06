
const estructuraWhile = "while(i<5){i++;}";
let estructura = "";
let gramatica = "";

function iniciarAnalisis() {
  document.getElementById("contInicio").classList.add("d-none");
  document.getElementById("contAnalisis").classList.remove("d-none");
  document.getElementById("contPrincipal").classList.remove("d-flex", "justify-content-center", "align-items-center");
}

function resetAnalizador() {
  //recargar la pagina
  location.reload();
}

function cargarEjemplo() {
  let divGramatica = document.getElementById("gramatica");
  divGramatica.innerHTML = "";
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".txt";
  input.click();
  input.onchange = () => {
    document.getElementById("gramatica").innerHTML = "";
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const contenido = reader.result;
      estructura = contenido;
      const lineas = contenido.split("\n");
      analizar();
      lineas.forEach((linea) => {
        const p = document.createElement("p");
        p.textContent = linea;
        divGramatica.appendChild(p);
      });
    };
  };
}

function buscarGramatica(prod) {
  let valores = [];
  let gram = [];
  let k = 0;
  /*for (let i = 0; i < prod.length; i++) {
    valores[i] = prod[i];
  }
  for (let j = 0; j < gramatica.length; j++) {
    if (gramatica[j] != ' ') {
      console.log(gramatica[j]);
      if (gramatica[j] === "=") {
        gram[k] = gramatica[j-1];
        k++;
      }
    }
    
  }*/
  let j = 0;
  let linea = "";
  for (let i = 0; i < gramatica.length; i++) {
    if (gramatica[i] !== " ") {
      if (gramatica[i] !== "\n") {
        if (gramatica[i] === "\r") {
          gram[j] = linea;
          linea = "";
          j++;
        } else {
          linea += gramatica[i];
        }
      }
    }
  }
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    
  }
  //return valores;
}

function analizar() {
  let estructuraSinEspacios = "";
  let gramaticaSinEspacios = "";
  for (let i = 0; i < estructura.length; i++) {
    if (estructura[i] !== " " && estructura[i] !== "\n" && estructura[i] !== "\t") {
      estructuraSinEspacios += estructura[i];
    }
  }
  buscarGramatica(estructuraSinEspacios);
  console.log("cotiene while: ", isWhile(estructuraSinEspacios));
  console.log("cotiene if: ", isCondicional(estructuraSinEspacios));
}

function isWhile(estructura) {
  let j = 0;
  for (let i = 0; i < estructura.length; i++) {
    if (estructura[i] == "w" || estructura[i] == "W") {
      //console.log(estructuraSinEspacios[i]);
      j++;
    }
    if (estructura[i] == "h" || estructura[i] == "H") {
      //console.log(estructuraSinEspacios[i]);
      j++;
    }
    if (estructura[i] == "i" || estructura[i] == "I") {
      //console.log(estructuraSinEspacios[i]);
      j++;
    }
    if (estructura[i] == "l" || estructura[i] == "L") {
      //console.log(estructuraSinEspacios[i]);
      j++;
    }
    if (estructura[i] == "e" || estructura[i] == "E") {
      //console.log(estructuraSinEspacios[i]);
      j++;
    }
    if (estructura[i] == "(") {
      break;
    }
  }
  if (j == 5) {
    return true;
  } else {
    return false;
  }
}

function isCondicional(estructura) {
  let condicion = "";
  let i = 0;
  let is;
  for (let j = 0; j < estructura.length; j++) {
    //const element = array[j];
    if (estructura[j] == "(") {
      i++;
    }
  }
}


function cargarGramatica() {
  //crear un archivo input de tipo file, dar click y leer el archivo
  //crear un input de tipo file
  document.getElementById("btnCargarEjemplo").disabled = false;
  let divGramatica = document.getElementById("gramatica");
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".txt";
  input.click();
  input.onchange = () => {
    document.getElementById("gramatica").innerHTML = "";
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const contenido = reader.result;
      gramatica = contenido;
      const lineas = contenido.split("\n");      
      lineas.forEach((linea) => {
        const p = document.createElement("p");
        p.textContent = linea;
        divGramatica.appendChild(p);
      });
    };
  };

}

function analizadorSintactico(lineas) {
  /*let partes = [];
  lineas.forEach((linea) => {
    partes.push(linea.split("=")[0]);
  });
  console.log(partes);*/
}


function leerArchivo() {
  /*const fs = require("fs");
  const archivo = fs.readFileSync("gramatica_1.txt", "utf-8");
  const lineas = archivo.split("\n");
  return lineas;*/
}

function main() {
  const lineas = leerArchivo();
  analizadorSintactico(lineas);
}

main();

