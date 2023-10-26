let n = new Array();
let Q = new Array();
let e1 = new Array();
let cadena = "";
let nodoInit = "";
let nodoFinal = "";
let datos = [];


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
        n.push(headers[i]);
      }
    }

    thead.appendChild(tr);
    table.appendChild(thead);

    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].split(",");
      const row = document.createElement("tr");
      if (cells[0] != "" && cells[0] != "\r") {
        e1.push(cells[0]);
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
    
    let cadenaDiagrama2 = `dinetwork {node [shape=circle fontsize=16] edge [length=100, color=gray, fontcolor=black] ${cadena}}`;

    let parsedData = vis.parseDOTNetwork(cadenaDiagrama2);
    var container = document.getElementById("mynetwork");
    var data = {
      nodes: parsedData.nodes,
      edges: parsedData.edges,
    };
    var options = {
      autoResize: true,
    };
    var network = new vis.Network(container, data, options);
  };

  reader.readAsText(file);
  document.getElementById("btnValidarCadena").disabled = false;
  document.getElementById("inputValidarCadena").disabled = false;
}

function validarCadena() {
  valueInputValidarCadena = document.getElementById("inputValidarCadena").value;
  //alert(valueInputValidarCadena);
  /*console.log("nodo inicial", nodoInit);
  console.log("nodo final", nodoFinal);*/
  //console.log("cadena final", cadena);
  console.log(datos);
  //alert(cadena);
}

