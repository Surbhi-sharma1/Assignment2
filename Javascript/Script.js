const load = document.getElementById("LoadButton");
var jsonData;

fetch("http://127.0.0.1:8000/JSON/Data.json")
    .then((jsonResponse) => jsonResponse.json())
    .then((data) => jsonData = data);

// Add event listerner to load button
LoadButton.addEventListener("click", function () {
    if (LoadButton.innerHTML == "Load Data") {
        LoadButton.innerHTML = "Refresh Data";
    }
    return loadData();
});

function loadData() {
    // Get tableArea reference defined in Index.html
    tableArea = document.getElementById('TableArea');

    // Check if table already added, remove it
    let existingTable = document.getElementById('Table');
    if (typeof (existingTable) != 'undefined' && existingTable != null) {
        existingTable.parentNode.removeChild(existingTable);
    }

    // Create new table element
    var table = document.createElement('Table');
    table.id = "Table";

    // Create header Row
    var newHeader = table.insertRow();
    for (const [key, value] of Object.entries(jsonData[0])) {
        var cell = newHeader.insertCell();
        var text = document.createTextNode(key);
        cell.appendChild(text);
    }

    // Fill table with rows and columns
    for (var i = 0; i < jsonData.length; i++) {

        // Create row element
        var newRow = table.insertRow();
        newRow.id = i;

        // Create columns for a row
        for (const [key, value] of Object.entries(jsonData[i])) {
            // Create cell element
            var newCell = newRow.insertCell();

            // Add text element in cell
            var text = document.createTextNode(value.length > 0 ? value : "-");
            newCell.appendChild(text);
        }

        // Add edit button
        var cell1 = newRow.insertCell();
        var editButton = document.createElement('Button1');
        editButton.innerHTML = "Edit";
        editButton.id = "button1" + i;
        editButton.classList.add("editButton");
        cell1.appendChild(editButton);

        editButton.addEventListener('click', function (event) {
            if (event.target.innerHTML == "Edit") {
                event.target.innerHTML = "Save";
                return editData(event);
            } else {
                event.target.innerHTML = "Edit";
                return saveData(event);
            }
        });

        // Add delete button
        var cell2 = newRow.insertCell();
        var deleteButton = document.createElement('Button2');
        deleteButton.id = "button2" + i;
        deleteButton.innerHTML = 'Delete';
        cell2.appendChild(deleteButton);

        deleteButton.addEventListener('click', function (event) {
            if (event.target.innerHTML == "Cancel") {
                event.target.innerHTML = "Delete";
                return cancel(event);
            } else {
                return deleteData(event);
            }

        });
    }
    // Add table in table area to display content
    tableArea.appendChild(table);
}

// Function to Delete Data.
function deleteData(event) {
    var rowToDelete = event.target.parentNode.parentNode;
    rowToDelete.parentNode.removeChild(rowToDelete);
}

// Function to Edit Data.
function editData(event) {
    var tr = event.target.parentNode.parentNode;
    let indexOfRow = tr.id;
    console.log(`Index: ${indexOfRow}`);
    let button2 = document.getElementById("button2" + indexOfRow);
    button2.innerHTML = "Cancel";
    tr.contentEditable = true;
}

// Function to Sava Data
function saveData(event) {
    var tr = event.target.parentNode.parentNode;
    tr.contentEditable = false;
    let indexOfRow = tr.id;
    let button2 = document.getElementById("button2" + indexOfRow);
    button2.innerHTML = "Delete";
}
// Revert the changes back into the row.
function cancel(event) {
    var tr = event.target.parentNode.parentNode;
    tr.contentEditable = false;
    let indexOfRow = tr.id;
    let button2 = document.getElementById("button1" + indexOfRow);
    button2.innerHTML = "Edit";
}