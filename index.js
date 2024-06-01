import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champions-de922-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const messageListInDB = ref(database, "messageList")

const publishEl = document.getElementById("btn")
const inputEl = document.getElementById("inputbox")
const El = document.querySelector(".endorsementsection > ul")

publishEl.addEventListener("click", () => {
    if (inputEl.value === '') {
        console.log("No content written")
    } else {
        let input = inputEl.value
        addItemToDB(input)
        inputEl.value = ''
    }
})

onValue(messageListInDB, function (snapshot) {
    if (snapshot.exists()) {
        let Messages = Object.entries(snapshot.val())
        El.innerHTML = ''
        for (let i = 0; i < Messages.length; i++) {
            let currentMessage = Messages[i]
            let messageID = currentMessage[0]
            let messageValue = currentMessage[1]
            appendMessage(messageValue)
        }
    } else {
        El.innerHTML = "Nothing to show here yet..."
    }
})

function appendMessage(message) {
    let li = document.createElement("li")
    li.textContent = message
    El.append(li)
}

function addItemToDB(item) {
    push(messageListInDB, item)
}




