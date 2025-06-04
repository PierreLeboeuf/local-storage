
const div = document.querySelector("#div");
let taskList = document.querySelector("#taskList");
const ajouter = document.querySelector("#addBtn");
let taskInput = document.querySelector("#taskInput");
const effacer = document.querySelector("#clearBtn");
let tasks = [];

let savedName = localStorage.getItem('tasks');
////------------------------------------------------------------------
// JE RECUPERE LA DONNEE DEPUIS LE LOCALSTORAGE
////------------------------------------------------------------------
if (savedName) {
    tasks = JSON.parse(savedName);
    render(tasks);
}


////------------------------------------------------------------------
// Fonction pour ajouter dans local storage
////------------------------------------------------------------------
function addTask() {
    let taskInputValue = taskInput.value.trim();
    if (taskInputValue !== "") {
        tasks.push(taskInputValue); // AJOUT DANS LE TABLEAU VIDE TASKS
        render(tasks); // APPEL DE LA FONCTION POUR CREER LA LISTE (li)
        taskInput.value = ""; // EFFACER LE CHAMP

        localStorage.setItem('tasks', JSON.stringify(tasks)); // AJOUTER DANS LE LOCAL STORAGE
    }
    // console.log(tasks);
}

////------------------------------------------------------------------
// Appuyer sur le bouton entrer pour ajouter
////------------------------------------------------------------------
document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask()
    }
})

////------------------------------------------------------------------
// Cliquer sur le bouton ajouter pour ajouter
////------------------------------------------------------------------

ajouter.addEventListener("click", () => {
    addTask();
})

////------------------------------------------------------------------
// Appuyer sur le bouton supprimer pour tout effacer
////------------------------------------------------------------------

document.addEventListener("keydown", function (e) {

    // console.log(e.key);
    if (e.key === "Delete") {
        tasks = [];
        localStorage.removeItem('tasks') // SUPPRIMER DANS LE LOCAL STORAGE
        render(tasks); // APPEL DE LA FONCTION POUR CREER LA LISTE (li)
    }
})

////------------------------------------------------------------------
// Fonction permettant de créer la liste, le bouton supprimer, et de supprimer l'élément de la liste a l'appuie du bouton
////------------------------------------------------------------------


function render(liste) {
    taskList.innerHTML = "";
    div.innerHTML = "";
    for (let i = 0; i < liste.length; i++) {
        let task = liste[i];

        let list = document.createElement("li");
        list.textContent = task;

        //REMPLACE LE li PAR UN champ texte EN DOUBLE CLICK
        // list.addEventListener("dblclick", () => {
        //     let champText = document.createElement("input");
        //     list.replaceWith(champText);
        //     champText.value = task; // garde la valeur du li dans le champ texte

        //     //REMPLACE LE champ texte PAR UN li EN APPUYANT SUR ENTREE
        //     document.addEventListener("keydown", function (e) {
        //         if (e.key === "Enter") {
        //             champText.replaceWith(list);
        //             list.textContent = champText.value;
        //         }
        //     })
        //     // list.innerHTML = champText.value;
        //     // taskList.append(champText);
        // })

        // AJOUT DU BOUTON SUPPRIMER
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.title = "Supprimer";

        deleteButton.addEventListener("click", () => {
            liste.splice(i, 1);
            localStorage.setItem('tasks', JSON.stringify(liste));
            render(liste);
        });

        list.append(deleteButton); // Ajoute le bouton au li
        taskList.append(list);

        // console.log(tasks.length);
    };

    let p = document.createElement("p");
    p.textContent = `${tasks.length} tâches restantes`;
    div.append(p);
}


// function deleteBtn(){
//         // AJOUT DU BOUTON SUPPRIMER
//         let deleteButton = document.createElement("button");
//         deleteButton.textContent = "❌";
//         deleteButton.title = "Supprimer";

//         deleteButton.addEventListener("click", () => {
//             liste.splice(i, 1);
//             localStorage.setItem('tasks', JSON.stringify(liste));
//             render(liste);
//         });

//         list.append(deleteButton); // Ajoute le bouton au li
// }

////------------------------------------------------------------------
// Même fonction mais avec ForEach
////------------------------------------------------------------------

// function render(liste) {
//     taskList.innerHTML = "";


//     liste.forEach((task, index) => {
//         let list = document.createElement("li");
//         list.textContent = task;

//         let deleteButton = document.createElement("button");
//         deleteButton.textContent = "❌";
//         deleteButton.title = "Supprimer";

//         deleteButton.addEventListener("click", () => {
//             liste.splice(index, 1);
//             localStorage.setItem('tasks', JSON.stringify(liste));
//             render(liste);
//         });

//         list.append(deleteButton); // Ajoute le bouton au li
//         taskList.append(list);
//     });
// }
