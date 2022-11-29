const form = document.getElementById('todo-form');
const todoInput = document.getElementById("todo");
const todoList = document.querySelector('.list-group');
const formGroup = document.querySelector(".form-group");
const firstCardBody = document.querySelectorAll('.card-body')[0];
const secondCardBody = document.querySelectorAll('.card-body')[1];
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('#clear-todos');

eventListeners();
function eventListeners() {  // Tüm eventler listenerler
    form.addEventListener('submit', addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearBtn.addEventListener('click', clearAllTodos);
}

function loadAllTodosToUI() {
    let todos = gettodosfromStorage();
    todos.forEach((item)=>{
        addTodotoUI(item);
    })
}

function addTodo(e){
    const newTodo = todoInput.value.trim();
    if(newTodo){
        addTodotoUI(newTodo);
        addTodotoStorage(newTodo);
        showAlert("success", "Todo Əlavə Olundu.")
    }
    else{
        showAlert("danger", `Xana Boş Buraxila Bilməz!`);
    }



    e.preventDefault();

}

function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    formGroup.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 2000);


}


function addTodotoUI(newTodo) {
    // String degerini list item olarak UI'ya eklenecek.
    /*
        <li class="list-group-item d-flex justify-content-between">
                    Todo 1
                    <a href="#" class="delete-item">
                        <i class="bi bi-trash"></i>
                    </a>
        </li>
    */

    //List item olusturma
    const listItem = document.createElement('li');
    //Link Olusturma
    const link = document.createElement("a");
    link.href = '#';
    link.className = "delete-item";
    link.innerHTML = `<i class="bi bi-trash"></i>`;
    listItem.className = `list-group-item d-flex justify-content-between`;
    
    // Text Not Ekleme
    listItem.textContent = newTodo; 
    listItem.appendChild(link);


    todoList.appendChild(listItem);

    todoInput.value = '';
}
function gettodosfromStorage() { // Storagedan Todolari Almaq
    let todos = [];
    let getElfromLocalStorage = JSON.parse(localStorage.getItem("todos"));
    if(getElfromLocalStorage) {
        todos = getElfromLocalStorage;
    }
    return todos;
}
function addTodotoStorage(newtodo) {
    let todos = gettodosfromStorage();
    todos.push(newtodo);
    localStorage.setItem("todos", JSON.stringify(todos));

}

//========Silmevvvvvvvv

//vvvvvvvLocalStorageden Silmevvvvvvvvv
function deleteTodofromStorage(deletetodo) {
    let todos = gettodosfromStorage();
    
    todos.forEach((item,index)=>{
        if(item===deletetodo){
            todos.splice(index,1); //Arrayden degeri Silebilirsiniz.....
        }
    })
    
    localStorage.setItem('todos', JSON.stringify(todos));
}


//vvvvvvvSehifeden Silmevvvvvvvvv
function deleteTodo(e) {
    if (e.target.className == "bi bi-trash"){
        e.target.parentElement.parentElement.remove();
        deleteTodofromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Todo Silindi...");
    }
}

//vvvvvvvFILTRLEMEvvvvvvvvv
function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll('.list-group-item');

    listItems.forEach(listItem=>{
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue)=== -1){
            listItem.setAttribute("style", "display: none !important");
        }
        else{
            listItem.setAttribute("style", "display: block");
        }
    })
}

function clearAllTodos() {
    if(confirm("Hamısını silmək istədiyinizə əminsinizmi?")){
        // todoList.innerHTML = ""; // YAVAS isliyir

        while(todoList.firstElementChild!=null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem('todos');
    }
}