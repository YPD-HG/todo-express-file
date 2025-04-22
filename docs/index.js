// 🔹 Select DOM elements
let inputButton = document.querySelector('#inputButton');
let inputField = document.querySelector('#inputField');

// 🔹 POST request: Send new todo to backend
async function postData() {
    let input = inputField.value;

    if (input !== '') {
        let res = await fetch("http://localhost:3000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ todo: input }) // Send input as JSON
        });

        let data = await res.json(); // Wait for JSON response
        todoFrontend(data); // Update frontend with new list
    }
}

// 🔹 Create and display a single todo element on the page
function createTodo(data) {
    // Create HTML elements
    let todoDiv = document.createElement('div');
    let todoCheck = document.createElement("input");
    let textContentElement = document.createElement('span');
    let delBtn = document.createElement('button');

    // Set element properties
    todoCheck.setAttribute("type", "checkbox");
    textContentElement.textContent = data;
    delBtn.textContent = "Delete";

    // Append child elements to main todo container
    todoDiv.appendChild(todoCheck);
    todoDiv.appendChild(textContentElement);
    todoDiv.appendChild(delBtn);

    // Append to the DOM under #todo-elements
    let inputSpan = document.querySelector("#todo-elements");
    inputSpan.appendChild(todoDiv);

    // Styling the container and layout
    inputSpan.style.display = "flex";
    inputSpan.style.flexDirection = "column";
    todoDiv.style.display = "grid";
    todoDiv.style.gridTemplateColumns = "150px 150px 150px";
    todoDiv.style.gridAutoFlow = "column";
    todoDiv.style.justifyContent = "center";
    todoDiv.style.margin = "15px";
    textContentElement.style.wordBreak = "break-word"; // Handle long text

    // 🔸 Delete functionality
    let textData = textContentElement.textContent;

    delBtn.addEventListener('click', async () => {
        const res = await fetch("http://localhost:3000/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ textData }) // Send the text to be deleted
        });

        let data = await res.json();
        let data_obj = JSON.parse(data);
        todoFrontend(data_obj); // Refresh the frontend list
    });
}

// 🔹 Utility: Clear all displayed todos
function emptyDiv() {
    let contentDiv = document.querySelector("#todo-elements");
    contentDiv.innerHTML = "";
}

// 🔹 Display all todos from an array
function todoFrontend(array) {
    emptyDiv(); // Clear current view

    for (let i = 0; i < array.length; i++) {
        createTodo(array[i].todo); // Add each todo item
    }
}

// 🔹 Main: On button click, send input data and clear input field
inputButton.addEventListener('click', async () => {
    await postData(); // Send and update UI
    document.querySelector("#inputField").value = ""; // Clear input
});
