// Selectors 
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo")

// Event Listener
document.addEventListener('DomContentloaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click',  deleteCheck);
filterOption.addEventListener('click',  filterTodo);



// Finctions

function addTodo(e){
// Prevent form from submitting
    e.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item')
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    // ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);
    // coppleted button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);
// tresh button
const trashButton = document.createElement('button')
trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
trashButton.classList.add('trash-btn');
todoDiv.appendChild(trashButton);
todoList.appendChild(todoDiv);
// Clear todoInput value
todoInput.value = ""

}
function deleteCheck(e){
    const item = e.target;
    // delete todo
    if (item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
        
       
    }
    // Check mark
    if (item.classList[0] === "completed-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("complet");
    }
    
    }

   function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch (e.target.value){
            case "all":
                todo.style.display = "flex"
                break;
                case "completed":
                    if (todo.classList.contains("complet")){
                        todo.style.display = "flex";
                    }else{
                        todo.style.display = "none";
                    }
                    break;
                    case "uncopleted":
                        if (!todo.classList.contains('complet')){
                            todo.style.display = "flex";
                        }else{
                            todo.style.display = "none";
                        }
        }
    });
   }


function saveLocalTodos(todo){
    // CHECK---Hey do I already have thing in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos(){
    
    // CHECK hey Do I already have thing in there
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
todos.forEach(function(todo){
    console.log("whats wrong");
    
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item')
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);
    // ADD TODO TO LOCALSTORAGE
   
    // coppleted button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);
// tresh button
const trashButton = document.createElement('button')
trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
trashButton.classList.add('trash-btn');
todoDiv.appendChild(trashButton);
todoList.appendChild(todoDiv);
});
}

function removeLocalTodos(todo){
    // CHECK hey do i already have thing in there
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innertext;
todos.splice(todos.indexOf(todoIndex), 1);
localStorage.setItem("todos", JSON.stringify(todos));

}