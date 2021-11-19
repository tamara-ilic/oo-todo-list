// 1. define global variables
// 2. create class with constructor
// 3. create method: add task 
// 4. create method: remove task
// 5. create method: update task
// 6. create getter to get list

let possiblyExistingLocalStorageData =
  JSON.parse(localStorage.getItem("items")) || [];
let filteredTasks = []

class List {
    constructor(name, id, items, active) {
        this._name = name
        this._id = id
        this._items = items
        this._active = active
    }

    addTask(event, task) {
        event.preventDefault()
        this._items.unshift(task)
    }

    save() {
        localStorage.setItem("items", JSON.stringify(this._items))
    }

    removeTask(id) {
        // const index = this._items.findIndex((item) => item.id === id)
        // this.items.splice(index, 1)
        // localStorage.setItem("todos", JSON.stringify(todos));
    }

    filterTasks() {
        filteredTasks = this._items.filter(task => task.text.includes(inputField.value))
    }

    toggleCompleted(id) {
        // TODO: should look for .checked in <input type="checkbox"> instead of below
        const item = this._items.find(i => i.id === id)
        const index = this._items.findIndex(i => i.id === id)
        this._items.complete = !this._items.complete
        this._items.splice(index, 1, item)
        // filterTasks()
    }

    get items() {
        return this._items
    }
}

class Task {
    constructor(text, id, complete) {
        this._text = text
        this._id = id
        this._complete = complete
    }

    get text() {
        return this._text
    }

    set text(newText) {
        this._text = newText
    }
}

const todoList = document.querySelector('#todo-list')
const inputField = document.querySelector('#task-input')
const formSelector = document.querySelector('#task-form')
const shinyNewList = new List(
    'shiny new list',
    null,
    possiblyExistingLocalStorageData,
    true 
)

console.log('shinyNewList is: ', shinyNewList)
renderListAndAddEventListeners(shinyNewList);

function updateTask(listElement, task) {
    listElement.addEventListener('keyup', (event) => {
        task.text = listElement.textContent
        shinyNewList.save()
        console.log(task)
        console.log(shinyNewList)
    })
}

function preventDefaultEnterKeyBehaviour(listElement) {
    listElement.addEventListener('keydown', (event) => {
        if (event.which === 13) {
            event.preventDefault()
            inputField.focus()
        }
    })
}

function renderListAndAddEventListeners(list) {
    todoList.innerHTML = ''
    const listItems = list.items
    listItems.forEach((task) => {
        let listRow = document.createElement('div')
        listRow.setAttribute('class', 'task-row')
        todoList.append(listRow)
        let checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        listRow.append(checkbox)
        let listElement = document.createElement('li')
        console.log('task: ', task);
        console.log('task.text: ', task._text);
        listElement.textContent = task._text
        listElement.setAttribute('contenteditable', 'true')
        listRow.append(listElement)
        // TODO: fix button as it's not visible
        let deleteButton = document.createElement('button')
        deleteButton.setAttribute('value', 'delete')
        listRow.append(deleteButton)
        preventDefaultEnterKeyBehaviour(listElement)
        updateTask(listElement, task)
    })
}

renderListAndAddEventListeners(shinyNewList);

formSelector.addEventListener('submit', (event) => {
    const task = new Task(inputField.value, Math.random() * 10000000000000000, false)
    shinyNewList.addTask(event, task)
    shinyNewList.save()
    renderListAndAddEventListeners(shinyNewList)
    inputField.value = ''
    console.log(shinyNewList.items)
})

// console.clear()
console.log(shinyNewList)
