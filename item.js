class ItemFood {
    constructor(name, amount, price, id) {
        this.name = name;
        this.amount = amount;
        this.price = price;
        this.id = id;
    }

    getSum() {
        return this.amount * this.price;
    }
}

function getDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentDate = `Paragon ${day}-${month}-${year}`;
    document.getElementById("drugi").textContent = currentDate;
}

let Arrayx = [];
let index = 0;

function PopulateTable(x) {
    const newtr = document.createElement("tr");
    const tableBody = document.getElementById("Góra");

    const newtdlp = document.createElement("td");
    const newtdname = document.createElement("td");
    const newtdamount = document.createElement("td");
    const newtdprice = document.createElement("td");
    const newtdsum = document.createElement("td");
    const editbutton = document.createElement("button");
    const deletebutton = document.createElement("button");

    x.id = index; 
    newtdlp.textContent = index;
    newtdname.textContent = x.name;
    newtdamount.textContent = x.amount;
    newtdprice.textContent = `${x.price}zł`;
    newtdsum.textContent = `${x.getSum()}zł`;

    editbutton.textContent = "Edytuj";
    editbutton.classList.add("my-button");
    editbutton.addEventListener("click", () => EditButtonOnClick(x.id));

    deletebutton.textContent = "Usuń";
    deletebutton.classList.add("my-button");
    deletebutton.addEventListener("click", () => DeleteButtonOnClick(x.id));

    newtr.appendChild(newtdlp);
    newtr.appendChild(newtdname);
    newtr.appendChild(newtdamount);
    newtr.appendChild(newtdprice);
    newtr.appendChild(newtdsum);
    newtr.appendChild(editbutton);
    newtr.appendChild(deletebutton);

    tableBody.appendChild(newtr);

    index++;
    PopulateFinalSum();
}

function PopulateFinalSum() {
    const totalSum = Arrayx.reduce((sum, item) => sum + item.getSum(), 0);
    const el = document.getElementById("fsum");
    el.textContent = `Suma: ${totalSum}zł`;
}

function CreateButton() {
    const el = document.getElementById("drugi");
    const createbutton = document.createElement("button");
    createbutton.textContent = "Dodaj nowy produkt";
    createbutton.classList.add("my-button");

    createbutton.addEventListener("click", () => {
        const dialog = document.querySelector("dialog");
        if (dialog) dialog.showModal();
    });

    el.appendChild(createbutton);
}

function EditButtonOnClick(id) {
    console.log(`Editing item with ID: ${id}`);
}

function DeleteButtonOnClick(id) {
   
    Arrayx = Arrayx.filter(item => item.id !== id);

    
    Arrayx.forEach((item, i) => item.id = i);
    index = 0;

    MassivePopulateTable();
  
    
}

function MassivePopulateTable() {
    const tableBody = document.getElementById("Góra");

  
    tableBody.innerHTML = `
        <tr>
            <th id="1">LP</th>
            <th id="2">NAZWA</th>
            <th id="3">ILOŚĆ</th>
            <th id="4">CENA</th>
            <th id="5">SUMA</th>
        </tr>`;

  
    Arrayx.forEach(item => PopulateTable(item));

  
    PopulateFinalSum();
}

function InitializePage() {
  
    getDate();
    CreateButton();

    const Czekolada = new ItemFood('Czekolada', 10, 30);
    const Śmietana = new ItemFood('Śmietana', 100, 500);
    Arrayx.push(Czekolada, Śmietana);

    MassivePopulateTable();
}

document.getElementById('MyForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    const newItem = new ItemFood(
        formData.get("named"),
        parseInt(formData.get("amountd"), 10),
        parseFloat(formData.get("priced"))
    );

    Arrayx.push(newItem);
    PopulateTable(newItem);

 
    const dialog = document.querySelector("dialog");
    if (dialog) dialog.close();
});


const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("dialog button");
closeButton.classList.add("my-button");
closeButton.textContent = "Anuluj";
closeButton.addEventListener("click", () => {
    if (dialog) dialog.close();
});


InitializePage();

