// 1. define global variables
// 2. create class with constructor
// 3. create method: add task 
// 4. create method: remove task
// 5. create method: update task
// 6. create getter to get list

const possiblyExistingLocalStorageData =
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

    removeTask(id) {
        // const index = this._items.findIndex((item) => item.id === id)
        // this.items.splice(index, 1)
    }

    filterTasks() {
        filteredTasks = this._items.filter(task => task.text.includes(inputField.value))
    }

    toggleCompleted(id) {
        const item = this._items.find(i => i.id === id)
        const index = this._items.findIndex(i => i.id === id)
        this._items.complete = !this._items.complete
        this._items.splice(index, 1, item)
        // filterTasks()
        localStorage.setItem("items", JSON.stringify(this._items))
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

function updateTask(listElement, task) {
    listElement.addEventListener('keyup', (event) => {
        task.text = listElement.textContent
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
        let listElement = document.createElement('li')
        listElement.textContent = task.text
        listElement.setAttribute('contenteditable', 'true')
        todoList.append(listElement)
        preventDefaultEnterKeyBehaviour(listElement)
        updateTask(listElement, task)
    })
}

renderListAndAddEventListeners(shinyNewList);

formSelector.addEventListener('submit', (event) => {
    const task = new Task(inputField.value, Math.random() * 10000000000000000, false)
    shinyNewList.addTask(event, task)
    renderListAndAddEventListeners(shinyNewList)
    inputField.value = ''
    console.log(shinyNewList.items)
})

console.clear()
console.log(shinyNewList)
