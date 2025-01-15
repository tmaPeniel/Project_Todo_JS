export async function getTasks() {
    try{
        const response= await fetch('http://localhost:3000/0');
        if(!response.ok){
            throw new Error ('Erreur lors de la récupération des tâches');
        }

        const tasks = await response.json();
        displayTasks(tasks)

    }catch (error){
        console.log("Erreur : ", error)
    }  
}

function displayTasks(tasks){
    const taskList = document.getElementById('task-list');
    //Si il n'y a pas de données
    if(tasks.length === 0){
        const emptyRow = document.createElement('tr');
        const emptyCell = document.createElement('td');
        emptyCell.colSpan = 7;
        emptyCell.classList.add('empty-message');
        emptyCell.textContent = 'No tasks found';
        emptyRow.appendChild(emptyCell);
        taskList.appendChild(emptyRow)
        return
    }

    tasks.forEach(task=>{
        const taskLine = document.createElement('tr');

        const nameTask = document.createElement('td')
        nameTask.textContent = task.TaskName;

        const description = document.createElement('td')
        description.textContent = task.TaskDescription;

        const category = document.createElement('td')
        category.textContent = task.TaskCategory;

        const date = document.createElement('td')
        date.textContent = task.TaskDate;

        const property = document.createElement('td')
        property.textContent = task.TaskProperty;

        const achievement = document.createElement('td')
        achievement.textContent = task.TaskAchievement;

        const button = document.createElement('td');
        button.classList.add("button");

        const editButton = document.createElement('a');
        editButton.setAttribute('href', '#');
        editButton.classList.add('edit');
        editButton.addEventListener('click', ()=>{
            window.location.href=`form.html?id=${task.id}`
        })

        const editIcon= document.createElement('i');
        editIcon.className='bx bxs-edit';

        editButton.appendChild(editIcon);
        
        const deleteButton = document.createElement('a');
        deleteButton.setAttribute('href', '#');
        deleteButton.classList.add('delete');

        const deleteIcon= document.createElement('i');
        deleteIcon.className='bx bxs-trash';

        deleteButton.appendChild(deleteIcon);

        button.appendChild(editButton);
        button.appendChild(deleteButton);

        //Ajout de td au tr
        taskLine.appendChild(nameTask);
        taskLine.appendChild(description);
        taskLine.appendChild(category);
        taskLine.appendChild(date);
        taskLine.appendChild(property);
        taskLine.appendChild(achievement);
        taskLine.appendChild(button);

        //Ajout du tr au tbody
        taskList.appendChild(taskLine);
    })   

}

