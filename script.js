const todoContainer = document.getElementById("todo-container");
const paginationContainer = document.getElementById("pagination");
const todosPerPage = 10;
let currentPage = 1;

// Function to fetch todos from API
const fetchTodos = async (page) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${todosPerPage}`
  );
  const todos = await response.json();
  return todos;
};

const renderTodos = (todos) => {
  todoContainer.innerHTML = "";
  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo";
    todoDiv.innerText = todo.title;
    todoContainer.appendChild(todoDiv);
  });
};

// Function to create pagination buttons
const createPaginationButtons = (totalTodos) => {
  paginationContainer.innerHTML = ""; // Clear previous buttons
  const totalPages = Math.ceil(totalTodos / todosPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.className = "page-button";
    button.innerText = i;
    button.addEventListener("click", () => handlePageClick(i));
    paginationContainer.appendChild(button);
  }
};

// Handle page click
const handlePageClick = async (page) => {
  currentPage = page;
  const todos = await fetchTodos(currentPage);
  renderTodos(todos);
};

// Initial render
const init = async () => {
  const totalTodosResponse = await fetch(
    "https://jsonplaceholder.typicode.com/todos"
  );
  const totalTodos = await totalTodosResponse.json();
  createPaginationButtons(totalTodos.length);

  const todos = await fetchTodos(currentPage);
  renderTodos(todos);
};

init();
