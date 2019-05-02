const todoForm = document.querySelector(".js_todoForm");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".js_todoList");

const TODOS_LIST = "todos";



let todos = [];

function deleteTodo(event) {
    const btn = event.target;
    const li = btn.parentElement;
    todoList.removeChild(li);
    const cleanTodos = todos.filter(function(todo) {
        return todo.id !== parseInt(li.id);
    });
    todos = cleanTodos;
    saveTodos();
}

function saveTodos() {
    localStorage.setItem(TODOS_LIST, JSON.stringify(todos));
}

function paintTodo(text) {
   const li = document.createElement("li");
   const delBtn = document.createElement("button");
   const span = document.createElement("span");
   const newId = todos.length + 1;
   delBtn.innerText = "x";
   delBtn.addEventListener("click", deleteTodo)
   span.innerText = text;
   li.appendChild(span);
   li.appendChild(delBtn);
   li.id = newId;
   todoList.appendChild(li);
   const todoObj = {
       text: text,
       id: newId
    };
   todos.push(todoObj);
   saveTodos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue);
    todoInput.value = "";
}

function loadTodos() {
    const loadedTodos = localStorage.getItem(TODOS_LIST);
    if(loadedTodos !== null) {
        const parsedTodos = JSON.parse(loadedTodos);
        parsedTodos.forEach(function(todo) {
            paintTodo(todo.text);
        });
    }
}

function init() {
    loadTodos();
    todoForm.addEventListener("submit", handleSubmit);
}

init();