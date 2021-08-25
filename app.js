//selectors
const todobutton = document.getElementsByClassName("todo-button")[0];
const todoinput = document.getElementsByClassName("todo-input")[0];
const todolist = document.getElementsByClassName("todo-list")[0];
const filter=document.getElementsByClassName("filter")[0];

//eventListeners
todobutton.addEventListener("click", additem);
todolist.addEventListener("click",clickcheck);
filter.addEventListener('click',filtertodo);
document.addEventListener('DOMContentLoaded',gettodos);

//functions
function additem(event) {
  event.preventDefault();
  const newdiv = document.createElement("div");
  newdiv.classList.add("todo-div");
  todolist.appendChild(newdiv);
  const todoelement = document.createElement("input");
  todoelement.classList.add("todo-element");
  todoelement.value = todoinput.value;
  //local storage
  Savelocal(todoinput.value);
  newdiv.appendChild(todoelement);
  const completedbtn = document.createElement("button");
  completedbtn.classList.add("todo-check");
  completedbtn.innerHTML = '<i  class="fas fa-check"></i>';
  newdiv.appendChild(completedbtn);
  const todotrash = document.createElement("button");
  todotrash.classList.add("todo-trash");
  todotrash.innerHTML = '<i  class="fas fa-trash"></i>';
  newdiv.appendChild(todotrash);
  todoinput.value="";
}

function clickcheck(event){
const check= event.target;
if(check.classList[0]==="todo-trash"){
    const parentlement= check.parentElement;
    parentlement.classList.add("fall");
    deletetodos(parentlement);
    parentlement.addEventListener('transitionend',function(){
        parentlement.remove();

    });
}
if(check.classList[0]==="todo-check"){
    const check2=check.parentElement;
    
    check2.classList.toggle("completed");
   

}
}

function filtertodo(event){
    const minitodo=todolist.childNodes;
    
    minitodo.forEach(function(todo){
        if(event.target.value=="All"){
            todo.style.display="flex";
            
        }
        
        if(event.target.value=="Completed"){
            if(todo.classList.contains("completed")){
                todo.style.display="flex";
            }
            else{
                todo.style.display="none";
            }
        }
     
        if(event.target.value=="Incomplete"){
            if(todo.classList.contains("completed")){
                todo.style.display="none";
                
            }
            else{
                todo.style.display="flex";
                
            }
        }
     
    });

}

function Savelocal(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];

    }
    else{
        todos= JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function gettodos(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];

    }
    else{
        todos= JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
        const newdiv = document.createElement("div");
        newdiv.classList.add("todo-div");
        todolist.appendChild(newdiv);
        const todoelement = document.createElement("input");
        todoelement.classList.add("todo-element");
        todoelement.value = todo;
       
        
        newdiv.appendChild(todoelement);
        const completedbtn = document.createElement("button");
        completedbtn.classList.add("todo-check");
        completedbtn.innerHTML = '<i  class="fas fa-check"></i>';
        newdiv.appendChild(completedbtn);
        const todotrash = document.createElement("button");
        todotrash.classList.add("todo-trash");
        todotrash.innerHTML = '<i  class="fas fa-trash"></i>';
        newdiv.appendChild(todotrash);

    });

}

function deletetodos(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];

    }
    else{
        todos= JSON.parse(localStorage.getItem("todos"));
    }

    const targetvalue= todo.children[0].value;
    todos.splice(todos.indexOf(targetvalue),1);
    localStorage.setItem("todos",JSON.stringify(todos));

    

}