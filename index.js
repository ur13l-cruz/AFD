let cadena = "";
let nodoInit = "";
let nodoFinal = "";
let data;
/*
let Q;
let Σ;
let q0;
let F;*//*
let AFD = {
  estados,
  alfabeto,
  transiciones,
  estadosinicial,
  estadofinal
}*/
let t1 = new Array();
let t2 = new Array();
let Q;
let Σ;
let inputNodoInicial;
let inputF;

document.getElementById("csvFile").addEventListener("change", handleFileSelect);

function handleFileSelect(event) {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const content = e.target.result;
    const rows = content.split("\n");

    const table = document.getElementById("csvData");
    table.innerHTML = "";

    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    const headers = rows[0].split(",");
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = "";
    tr.appendChild(th);
    for (let i = 0; i < headers.length; i++) {
      if (headers[i] != "" && headers[i] != "\r") {
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = headers[i];
        tr.appendChild(th);
      }
    }

    thead.appendChild(tr);
    table.appendChild(thead);

    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].split(",");
      const row = document.createElement("tr");
      if (cells[0] != "" && cells[0] != "\r") {
        if (cells[0].includes("->")) {
          if (cells[0].includes("*")) {
            nodoInit = cells[0].split("*")[1];
          } else {
            nodoInit = cells[0].split("->")[1];
          }
        }
        if (cells[0].includes("*")) {
          nodoFinal = cells[0].split("*")[1];
        }
      }
      for (let j = 0; j < cells.length; j++) {
        if (cells[j] != "" && cells[j] != "\r") {
          const cell = document.createElement("td");
          let tempInit;
          let tempNodo;
          cell.textContent = cells[j];
          row.appendChild(cell);
          if (j > 0) {
            if (cells[j].includes("->")) {
              if (cells[j].includes("*")) {
                tempNodo = cells[j].split("*")[1];
              } else {
                tempNodo = cells[j].split("->")[1];
              }
            } else if (cells[j].includes("*")) {
              tempNodo = cells[j].split("*")[1];
            } else {
              tempNodo = cells[j];
            }

            if (cells[0].includes("->")) {
              if (cells[0].includes("*")) {
                tempInit = cells[0].split("*")[1];
              } else {
                tempInit = cells[0].split("->")[1];
              }
            } else if (cells[0].includes("*")) {
              tempInit = cells[0].split("*")[1];
            } else {
              tempInit = cells[0];
            }

            cadena += `${tempInit}->${tempNodo}[label="${headers[j]}"];`;
          }
        }
      }
      table.appendChild(row);
    }
    if (nodoInit == nodoFinal) {
      cadena += `${nodoInit}[color=yellow]`;
    } else {
      cadena += `${nodoInit}[color=green]${nodoFinal}[color=red]`;
    }

    hacerDiagrama(cadena);
  };

  reader.readAsText(file);
  document.getElementById("btnValidarCadena").disabled = false;
  document.getElementById("inputValidarCadena").disabled = false;
}

function hacerDiagrama(cadena) {
  let cadenaDiagrama2 = `dinetwork {node [shape=circle fontsize=16] edge [length=100, color=gray, fontcolor=black] ${cadena}}`;

  let parsedData = vis.parseDOTNetwork(cadenaDiagrama2);
  var container = document.getElementById("mynetwork");
  data = {
    nodes: parsedData.nodes,
    edges: parsedData.edges,
  };
  var options = {
    autoResize: true,
  };
  //console.log(data);
  var network = new vis.Network(container, data, options);
}

function generarTabla() {
  if (
    Q.length != 0 &&
    Σ.length != 0 &&
    inputNodoInicial.length != 0 &&
    inputF.length != 0
  ) {
    let k = 0;
    const table = document.getElementById("csvData");
    table.innerHTML = "";

    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = "";
    tr.appendChild(th);
    for (let i = 0; i < Σ.length; i++) {
      if (Σ[i] != "" && Σ[i] != "\r") {
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = Σ[i];
        tr.appendChild(th);
      }
    }
    thead.appendChild(tr);
    table.appendChild(thead);
    let tempInit;
    for (let i = 0; i < Q.length; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < Σ.length + 1; j++) {
        if (j < 1) {
          const cell = document.createElement("td");
          cell.textContent = Q[i];
          tempInit = Q[i];
          row.appendChild(cell);
        } else {
          const cell = document.createElement("td");
          cell.textContent = document.getElementById(`inputTransicion${k}`).value;
          row.appendChild(cell);
          cadena += `${tempInit}->${document.getElementById(`inputTransicion${k}`).value}[label="${Σ[j-1]}"];`;
          
          k++;
        }
      }
      table.appendChild(row);
    }
    if (inputNodoInicial == inputF){
      cadena += `${inputNodoInicial}[color=yellow]`;
    } else {
      cadena += `${inputNodoInicial}[color=green]${inputF}[color=red]`;
    }

    hacerDiagrama(cadena);
    document.getElementById("btnValidarCadena").disabled = false;
  document.getElementById("inputValidarCadena").disabled = false;
  } else {
    alert("ingrese todos los valores requeridos");
  }
}

/*function generarDiagrama() {
  var table = document.getElementById("csvData");

  // Array para almacenar los valores
  var allValues = [];

  // Recorre las filas de la tabla
  for (var i = 1; i < table.rows.length; i++) {
    var row = table.rows[i];
    var rowValues = [];
    for (var j = 0; j < row.cells.length; j++) {
      var cell = row.cells[j];
      var input = cell.querySelector('input[type="text"]');
      if (input) {
        var inputValue = input.value;
        rowValues.push(inputValue);
      } else {
        var cellValue = cell.textContent;
        rowValues.push(cellValue);
      }
    }
    allValues.push(rowValues);
  }
}*/


function generarTransiciones() {
  Q = document.getElementById("inputQ").value.split(",");
  Σ = document.getElementById("inputΣ").value.split(",");
  inputNodoInicial = document.getElementById("inputNodoInicial").value;
  inputF = document.getElementById("inputF").value;
  let tabT = document.getElementById("tabT");
  let cont = 0;
  if (
    Q.length != 0 &&
    Σ.length != 0 &&
    inputNodoInicial.length != 0 &&
    inputF.length != 0
  ) {
    for (let i=0; i < Q.length; i++) {
      for (let j=0; j < Σ.length; j++) {
        let div = document.createElement("div");
        let p = document.createElement("p");
        let inputT = document.createElement("input");
        p.textContent = "δ (" + Q[i] + "," + Σ[j]+") = ";
        div.appendChild(p);
        inputT.id = "inputTransicion"+cont;
        inputT.style.width = "40px";
        div.appendChild(inputT);
        cont++;
        tabT.appendChild(div);
      }
    }
    document.getElementById("btnGenerarTablaT").disabled = false;
  } else {
    alert("ingrese todos los valores requeridos (Q,Σ,q0,F)");
  }
}

function validarCadena() {
  //ver data de la libreria, para poder sacar las transiciones
  valueInputValidarCadena = document.getElementById("inputValidarCadena").value;
  let setAlfa = new Set(Σ);
  let setEstados = new Set(Q);
  console.log(setEstados);
  //podria quedar en 2 for para buscar
  for (let letra of valueInputValidarCadena) {
    if (!setAlfa.has(letra)) {
      alert("Simbolo no valido");
    }
  }
}
