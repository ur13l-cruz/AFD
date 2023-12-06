const estructuraWhile = "while(i<5){i++;};";

function analizadorSintactico(lineas) {
  let partes = [];
  //console.log(lineas);
  lineas.forEach((linea) => {
    if (linea.split("OP = ")[1] != undefined) {
      const [clave, valor] = linea.split("OP = ");
      partes.push({ clave: linea.split("=")[0], valor });
    } else {
      const [clave, valor] = linea.split("=");
      partes.push({ clave, valor: valor.replace(/\r$/, "") });
    }
  });
  //console.log(partes[0].valor.split(" "));
  //console.log(partes[1].valor.split("|"));
  console.log(partes);
}


function leerArchivo() {
  const fs = require("fs");
  const archivo = fs.readFileSync("gramatica_1.txt", "utf-8");
  const lineas = archivo.split("\n");
  return lineas;
}

function main() {
  const lineas = leerArchivo();
  analizadorSintactico(lineas);
}

main();