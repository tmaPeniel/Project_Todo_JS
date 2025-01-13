const filters = document.querySelectorAll('button:not(.add-task)');
console.log(filters);
filters.forEach(button=>{
    button.addEventListener("click", ()=>{
        filters.forEach(item=> item.classList.remove('active'));
        button.classList.add('active');
    })
})

const addTask = document.getElementById("add-task");
console.log(addTask);
addTask.addEventListener("click", ()=>{
    window.location.href= "form.html";
})

const editTasks = document.querySelectorAll('.edit');
console.log(editTasks);
editTasks.forEach(item=>{
    item.addEventListener("click", ()=>{
        window.location.href= "form.html";
    })
})