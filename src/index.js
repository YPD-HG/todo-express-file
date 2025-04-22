let inputButton = document.querySelector('#inputButton')
let inputField = document.querySelector('#inputField')

async function postData() {
    let input = inputField.value
    if (input !== '') {
        let res = await fetch("http://localhost:3000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ todo: input })
        })
        let data = await (res.json())
        todoFrontend(data);
    }
}

function createTodo(data) {
    let todoDiv = document.createElement('div')
    let todoCheck = document.createElement("input");
    todoCheck.setAttribute("type", "checkbox");
    let textContentElement = document.createElement('span')
    textContentElement.textContent = data
    let delBtn = document.createElement('button')
    delBtn.textContent = "Delete"

    todoDiv.appendChild(todoCheck)
    todoDiv.appendChild(textContentElement)
    todoDiv.appendChild(delBtn)
    var inputSpan = document.querySelector("#todo-elements");
    inputSpan.appendChild(todoDiv)
    inputSpan.style.display = "flex"
    inputSpan.style.flexDirection = "column"
    todoDiv.style.display = "grid"
    todoDiv.style.gridTemplateColumns = "150px 150px 150px"
    todoDiv.style.gridAutoFlow = "column"
    todoDiv.style.justifyContent = "center"
    todoDiv.style.margin = "15px"
    textContentElement.style.wordBreak = "break-word"; // bonus for very long strings

    let textData = textContentElement.textContent
    delBtn.addEventListener('click', async () => {
        const res = await fetch("http://localhost:3000/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ textData })
        })
        let data = await res.json();
        let data_obj = JSON.parse(data);
        todoFrontend(data_obj);
    })
}

function emptyDiv() {
    let contentDiv = document.querySelector("#todo-elements")
    contentDiv.innerHTML = ""
}

function todoFrontend(array) {
    let length = array.length
    emptyDiv()
    for (let i = 0; i < length; i++) {
        createTodo(array[i].todo)
    }
}

inputButton.addEventListener('click', async () => {
    await postData();
    // await getData();
    // createTodo()
    console.log("***")
    document.querySelector("#inputField").value = ""
})


