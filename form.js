const cancel= document.querySelector('.button-cancel')
cancel.addEventListener("click", ()=>{
    window.location.href= "index.html";
})

document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('task-form');
    const paramUrl = new URLSearchParams(window.location.search);
    const taskId = paramUrl.get('id'); 

    if (taskId) {

        // Si ID, dans l'URL alors modification de tache
        try {
            const response = await fetch(`http://localhost:3000/0/${taskId}`);
            if (!response.ok) throw new Error('Tâche non trouvée');

            const task = await response.json();

            document.getElementById('nameName').value = task.TaskName;
            document.getElementById('descriptionName').value = task.TaskDescription;
            document.getElementById('categoryName').value = task.TaskCategory;
            const [date, time] = task.TaskDate.split(' ');
            document.getElementById('dateName').value = date;
            document.getElementById('timeName').value = time;
            document.getElementById('priorityName').value = task.TaskProperty;
            document.getElementById('fullfillmentName').value = task.TaskAchievement;
        } catch (error) {
            console.error('Erreur lors de la récupération de la tâche :', error);
        }
    }

    // Si pas d'Id dans l'URl alors céation de tache
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page

        const task = {
            TaskName: document.getElementById('nameName').value.trim(),
            TaskDescription: document.getElementById('descriptionName').value.trim(),
            TaskCategory: document.getElementById('categoryName').value.trim(),
            TaskDate: document.getElementById('dateName').value + ' ' + document.getElementById('timeName').value,
            TaskProperty: document.getElementById('priorityName').value,
            TaskAchievement: document.getElementById('fullfillmentName').value,
        };

        try {
            let response;

            if (taskId) {
                // Si modification
                response = await fetch(`http://localhost:3000/0/${taskId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(task),
                });
            } else {
                // Si non, creation
                response = await fetch('http://localhost:3000/0', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(task),
                });
            }

            if (response.ok) {
                console.log(taskId ? 'Tâche mise à jour avec succès' : 'Tâche ajoutée avec succès');
                form.reset();
                window.location.href = 'index.html';
            } else {
                console.error('Erreur lors de l’envoi des données :', response.statusText);
            }
        } catch (error) {
            console.error('Erreur de connexion au serveur :', error);
        }
    });
});