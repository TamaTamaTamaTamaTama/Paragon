class ItemFood {
    constructor(name, amount, price) {
        this.name = name;
        this.amount = amount;
        this.price = price;
    }

    getSum()
    {
      return this.amount * this.price;  
    }
}

function getDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = "Paragon" + " " + `${day}-${month}-${year}`;
    document.getElementById("drugi").textContent = currentDate;
}

let Arrayx = [];
let index = 0;


function PopulateTable(x) 
{
    let newtr = document.createElement("tr");
    let oldtr = document.getElementById("Góra");
    let newtdlp = document.createElement("td");
    let newtdname = document.createElement("td");
    let newtdamount = document.createElement("td");
    let newtdprice = document.createElement("td");
    let newtdsum = document.createElement("td");
    let editbutton = document.createElement("button");
    let deletebutton = document.createElement("button");
    newtdlp.textContent = index;
    newtdname.textContent = x.name;
    newtdamount.textContent = x.amount;
    newtdprice.textContent = `${x.price}zł`;
    newtdsum.textContent = `${x.price * x.amount}zł`;
    editbutton.textContent="Edytuj";
    editbutton.classList.add("my-button");
    editbutton.addEventListener("click", () => EditButtonOnClick(x.name));
    deletebutton.textContent="Usuń";
    deletebutton.classList.add("my-button");
    deletebutton.addEventListener("click",() => DeleteButtonOnClick(x.name));

    newtr.appendChild(newtdlp);
    newtr.appendChild(newtdname);
    newtr.appendChild(newtdamount);
    newtr.appendChild(newtdprice);
    newtr.appendChild(newtdsum);
    newtr.appendChild(editbutton);
    newtr.appendChild(deletebutton);
    oldtr.appendChild(newtr);

 index++;
    
}

function PopulateFinalSum() {

    let count = 0;
    Arrayx.forEach(ItemFood => count = count + ItemFood.price * ItemFood.amount);
    let el = document.getElementById("fsum");
    el.textContent = `Suma: ${count}zł`;

}


function CreateButton() {
    
let el = document.getElementById("fsum");
let createbutton = document.createElement("button"); 
let br = document.createElement("br");
el.appendChild(br);
createbutton.textContent="Dodaj nowy produkt";
createbutton.classList.add("my-button");
el.appendChild(createbutton);
createbutton.addEventListener("click", () => {
    let dialog = document.querySelector("dialog");
    if (dialog) dialog.showModal(); 
});

}

function EditButtonOnClick(index) {
    console.log("editing" + index);
}


function DeleteButtonOnClick(index) {
    console.log("delete" + index);
}

let Czekolada = new ItemFood('Czekolada', 10, 30);
let Śmietana = new ItemFood('Śmietana', 100, 500);
Arrayx.push(Czekolada);
Arrayx.push(Śmietana);
console.log(Arrayx);
Arrayx.forEach(ItemFood =>PopulateTable(ItemFood))
PopulateFinalSum();
CreateButton();


let dialog = document.querySelector("dialog");

let closeButton = document.querySelector("dialog button");

closeButton.classList.add("my-button");
closeButton.textContent="Anuluj";
closeButton.addEventListener("click", () => {
  dialog.close();
});



let FormResult = document.getElementById('MyForm').addEventListener('submit', function(event) {
event.preventDefault();

let formData = new FormData(this);
let formObject = {};
formData.forEach(function(value, key) {
    formObject[key] = value;
    handleFormSubmit(formObject);
});

function handleFormSubmit(data) {
    console.log('Form Data: ', data);
}

let Rzecz = new ItemFood (formData.name, formData.amount, formData.price);
Arrayx.push(Rzecz);
PopulateTable(Rzecz);
PopulateFinalSum();

});


window.onload = getDate();

