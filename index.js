let cadena = "";
let nodoInit = "";
let nodoFinal = "";
let data;
let afdTransiciones = new Array();
let t1 = new Set();
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
          t1.add(
            tempInit
          )
          let obj = {}
          obj[Σ[j-1]] = document.getElementById(`inputTransicion${k}`).value;
          t2.push(obj)
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
  valueInputValidarCadena = document.getElementById("inputValidarCadena").value;
  t1 = [...t1];
  let a = new Set();
  let c = new Array();
  let d = [];
  for (let nodo of data.edges) {
    a.add(nodo.from)
}

  for (let nodo of data.edges) {
    c.push({
        [nodo.label]: nodo.to
    });
} 
a = [...a];

let result = new Array();
let groupedArray = [];
for (let i = 0; i < c.length; i += 2) {
  groupedArray.push([c[i], c[i + 1]]);
}
for (let i = 0; i < a.length; i++) {
  const j = i % groupedArray.length;
  result[a[i]] = groupedArray[j];
}

let currentState = inputNodoInicial;
for (const symbol of valueInputValidarCadena) {
  if (!Σ.includes(symbol)) {
    alert("cadena invalida");
  }
  console.log("symbol", symbol)
  let symbolTemp;
  for(let i=0;i < result[currentState].length;i++) {
    if (result[currentState][i][symbol] != undefined) {
      symbolTemp = result[currentState][i][symbol];
    } 
  }
  console.log("nodo", symbolTemp);
  if (symbolTemp === undefined) {
    alert("Cadena invalida");
  }

  currentState = symbolTemp;
}

if (currentState == inputF) {
  alert("Cadena valida");
} else {
  alert("Cadena invalida");
}
}
