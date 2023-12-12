// Load all existing news
let news = window.localStorage.getItem("news");

if(news !== null) {
    let tbody = document.getElementById("tbody");
    news = JSON.parse(news);
    let trs = "";

    news.forEach(n => {
        trs += `<tr>
                    <td>${n.id}</td>
                    <td><img src="../picture/${n.file}" style="width: 100%;"></td>
                    <td>${n.content}</td>
                    <td>${n.author}</td>
                    <td>${n.date}</td>
                    <td>${n.email}</td>
                    <td>
                        <button class="btn btn-warning" onclick="showUpdateData('${n.id}')"><i class="fa fa-pencil"></i></button>
                        <button class="btn btn-danger" onclick="deleteNews('${n.id}')"><i class="fa fa-trash"></i></button>
                    </td>
                </tr>`
    })

    tbody.innerHTML = trs;
}
else
    news = []
    
// Show name of file after select
$(".custom-file-input").on("change", function () {
    let fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

let id = document.getElementById("id");
let content = document.getElementById("content");
let author = document.getElementById("author");
let date = document.getElementById("date");
let email = document.getElementById("email");
let file = document.getElementById("file");

function add() {
    if(id.value === "" || content.value === "" || author.value === "" || date.value === "" || email.value === "")
        return alert("Please enter complete information");

    if(!isValidEmail(email.value))
        return alert("Please enter a valid email");
    
    if(file.files.length === 0)
        return alert("Please select an image to upload");

    let exist = news.find(n => n.id === id.value)
    if(exist)
        return alert("This ID already exists");

    let formData = new FormData();
    formData.append("id", id.value);
    formData.append("file", file.files[0]);

    fetch("http://localhost:3000/upload-file", {
        method: "post",
        body: formData
    })
    .then(() => {
        alert("Add successfully");
        news.push({
            id: id.value,
            file: id.value + "-" + $('.custom-file-input').val().split("\\").pop(), // id-fileName
            content: content.value,
            author: author.value,
            date: date.value,
            email: email.value
        });
        window.localStorage.setItem("news", JSON.stringify(news));
    })
}

function showUpdateData(id) {
    let selectedNews = news.find(n => n.id === id);
    
    document.getElementById("id").value = selectedNews.id;
    document.getElementById("content").value = selectedNews.content;
    document.getElementById("author").value = selectedNews.author;
    document.getElementById("date").value = selectedNews.date;
    document.getElementById("email").value = selectedNews.email;
    $(".custom-file-label").addClass("selected").html(selectedNews.file);

    document.getElementById("id").setAttribute("disabled", true);
    document.getElementById("btnAdd").setAttribute("disabled", true);
    document.getElementById("btnUpdate").removeAttribute("disabled");
}

function update() {
    if(content.value === "" || author.value === "" || date.value === "" || email.value === "")
        return alert("Please enter complete information");

    if(!isValidEmail(email.value))
        return alert("Please enter a valid email");

    let selectedNews = news.find(n => n.id === id.value);
    selectedNews.content = content.value;
    selectedNews.author = author.value;
    selectedNews.date = date.value;
    selectedNews.email = email.value;

    // admin updates new image
    if(file.files.length !== 0) {
        let formData = new FormData();
        formData.append("id", id.value);
        formData.append("file", file.files[0]);

        fetch("http://localhost:3000/upload-file", {
            method: "post",
            body: formData
        })
        .then(() => {
            alert("Update successfully");
            selectedNews.file = id.value + "-" + $('.custom-file-input').val().split("\\").pop(); // id-fileName
            window.localStorage.setItem("news", JSON.stringify(news));
        })
    }
    else {
        alert("Update successfully");
        window.localStorage.setItem("news", JSON.stringify(news));
    }
}

function deleteNews(id) {
    news = news.filter(n => n.id !== id);
    window.localStorage.setItem("news", JSON.stringify(news));
    alert("Delete successfully");
    location.reload();
}

function reset() {
    location.reload();
}

function isValidEmail(email) {
    return String(email)
    .toLowerCase()
    .match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}