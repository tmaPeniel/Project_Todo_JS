const cancel= document.querySelector('.button-cancel')
cancel.addEventListener("click", ()=>{
    window.location.href= "index.html";
})

const form = document.getElementById('task-form');
form.addEventListener('submit', addTask);


async function addTask(event) {
    event.preventDefault();

    const taskName = document.getElementById('nameName');
    const name = taskName.value.trim();

    const taskDescription = document.getElementById('descriptionName');
    const description = taskDescription.value.trim();

    const taskCategory = document.getElementById('categoryName');
    const category = taskCategory.value.trim();

    const taskDate = document.getElementById('dateName');
    const date = taskDate.value;

    const taskTime = document.getElementById('timeName');
    const time = taskTime.value;

    const dueDate= date+" "+time;

    const taskProperty = document.getElementById('priorityName');
    const property = taskProperty.value;

    const taskFullfillment = document.getElementById('fullfillmentName');
    const fullfillment = taskFullfillment.value;

    if (!name || !description || !category || !date || !time) {
        alert("Veuillez remplir tous les champs requis.");
        return;
    }

        const task={
            TaskName: name,
            TaskDescription: description,
            TaskCategory: category,
            TaskDate: dueDate,
            TaskProperty: property,
            TaskAchievement: fullfillment
        }
        try{
            const response = await fetch('http://localhost:3000/0', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            })
            if(response.ok){
                console.log('Tâche ajoutée avec succès au serveur');
                form.reset();
                window.location.href = 'index.html';
            } else {
                console.error('Erreur lors de l’ajout de la tâche au serveur', response.statusText);
            }
        } catch (error){
            console.error("Erreur de connexion au serveur :", error);
        }
}

document.addEventListener('DOMContentLoaded', async () => {

    // Récupération de l'URL
    const paramUrl= new URLSearchParams(window.location.search);
    const taskId= paramUrl.get('id');

    if(taskId){

        try{
            const response = await fetch(`http://localhost:3000/0/${taskId}`);
            if(!response.ok) throw new Error ('Tâche non trouvé');

            const task = await response.json();
            document.getElementById('nameName').value = task.TaskName;
            document.getElementById('descriptionName').value = task.TaskDescription;
            document.getElementById('categoryName').value = task.TaskCategory;
            const [date, time] = task.TaskDate.split(' ');
            document.getElementById('dateName').value = date;
            document.getElementById('timeName').value = time;
            document.getElementById('priorityName').value = task.TaskProperty;
            document.getElementById('fullfillmentName').value = task.TaskAchievement;

        } catch (error){
            console.error("Erreur lors de la récupération de la tâche :", error);
        }
    }
})

const formUpdate = document.getElementById('task-form');
formUpdate.addEventListener('submit', async (event) => {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get('id');

    const task = {
        TaskName: document.getElementById('nameName').value.trim(),
        TaskDescription: document.getElementById('descriptionName').value.trim(),
        TaskCategory: document.getElementById('categoryName').value.trim(),
        TaskDate: document.getElementById('dateName').value + ' ' + document.getElementById('timeName').value,
        TaskProperty: document.getElementById('priorityName').value,
        TaskAchievement: document.getElementById('fullfillmentName').value
    };

    try {
        const response = await fetch(`http://localhost:3000/0/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        if (response.ok) {
            console.log('Tâche mise à jour avec succès');
            window.location.href = 'index.html';
        } else {
            console.error('Erreur lors de la mise à jour de la tâche');
        }
    } catch (error) {
        console.error("Erreur de connexion au serveur :", error);
    }
});