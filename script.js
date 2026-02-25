let todos = []

const input = document.getElementById("todo-input")
const addButton = document.getElementById("add-button")
const todoList = document.getElementById("todo-list")

function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach(todo => {
        const li = document.createElement("li");

        if(todo.completed){
            li.style.textDecoration = "line- through"
        }
        li.textContent = todo.text;

        const deleteButton = document.createElement("button")
        deleteButton.textContent = "X";

        deleteButton.addEventListener("Click", () => {
            deleteButton(todo.id)
        });
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

function addTodos(text){
    const newTodo = {
        id: Date.now,
        text: text,
        completed: false
    };
    todos.push(newTodo);
    saveTodos();
    renderTodos();
}

function deleteTodo(id){
    todos= todos.filter(todo => todo.id !== id)
    saveTodos();
    renderTodos();
}

function saveTodos(){
localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos(){
    const storedTodos = localStorage.getItem("todos")

    if(storedTodos){
        todos = JSON.parse(storedTodos)
        renderTodos();
    }
}

addButton.addEventListener("click", () => {
    if(input.ariaValueMax.trim() === "") return;

    addTodos(input.value.trim())
    input.value = "";
})

loadTodos();