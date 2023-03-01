const todo = document.querySelector(".to-do");
const addTodo = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector(".todo-filter");

addTodo.addEventListener("click", additem);
todoList.addEventListener("click",deletecheck);
filter.addEventListener("click",filtertodo);

gettodo();

function create(todos){
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");

	const newTodo = document.createElement("li");
	newTodo.classList.add("item");
	newTodo.innerText = todos;
	
	todo.value="";
	todoDiv.appendChild(newTodo);

	const complete = document.createElement("button");
	complete.innerHTML = '<i class = "fas fa-check" ></i>';
	complete.classList.add("complete-btn");
	todoDiv.appendChild(complete);

	const trash = document.createElement("button");
	trash.innerHTML = '<i class = "fas fa-trash" ></i>';
	trash.classList.add("trash-btn");
	todoDiv.appendChild(trash);

	todoList.appendChild(todoDiv);
}

function additem(event) {
	
	event.preventDefault();

	if(todo.value=="")
	{
		alert("Cannot enter a empty todo");
		return;
	}

	settodo(todo.value);
	create(todo.value);

}

function deletecheck(e)
{
	 const item = e.target;

	 if(item.classList[0] === 'trash-btn')
	 	{
	 		const to = 	item.parentElement;
	 		to.classList.add('fall');
	 		deletetodo(to);
	 		to.addEventListener('transitionend',function(){
	 			to.classList.remove('fall');
	 			

	 			to.remove();
	 		})
	 		
	 		
	 	}

	 else if(item.classList[0] === 'complete-btn')
	 	item.parentElement.classList.toggle("completed");
}



function filtertodo(e)
{
	const todos = todoList.childNodes;
	todos.forEach(function(todo){
	switch(e.target.value)
	{
	case "all":
		todo.style.display = 'flex';
		break;
	case "complete":
		if(todo.classList.contains('completed'))
		todo.style.display = 'flex';
		else
		todo.style.display = 'none';
		break;
	case "incomplete":
		if(todo.classList.contains('completed'))
		todo.style.display = 'none';
		else
		todo.style.display = 'flex';
		break;
	}
	});
}
var todos;

function checklocal()
{
	
	if(localStorage.getItem('todos') === null)
		todos = [];
	else
		todos = JSON.parse(localStorage.getItem('todos'));
}

function settodo(todo)
{
	checklocal();

	todos.push(todo);
	localStorage.setItem('todos',JSON.stringify(todos));
}

function gettodo(todo)
{
	checklocal();

	todos.map((todo)=>{

		create(todo);
	})

}

function deletetodo(to)
{
	checklocal();
	const i = todos.indexOf(to.children[0].innerText);
	todos.splice(i,1);
	localStorage.setItem('todos',JSON.stringify(todos));

}