'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const todoData = localStorage.storage ? JSON.parse(localStorage.storage) : [];

const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';
    headerInput.value = '';


    todoData.forEach(function(item, index){
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
        '<div class ="todo-buttons">' + 
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
        '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        };

        const buttonTodoCompleted = li.querySelector('.todo-complete');
        const buttonRemove = li.querySelector('.todo-remove');

        buttonRemove.addEventListener('click', function(){
        todoData.splice(index, 1);
        render();
        })

        buttonTodoCompleted.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        })
        localStorage.setItem("storage", JSON.stringify(todoData))
    });

};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    if (headerInput.value.trim() === '' ) {
        return;
    }

    const newTodo = {
        value: headerInput.value,
        completed: false
    };

    todoData.push(newTodo);
    render();
    
})


render();




