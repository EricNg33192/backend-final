function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(email === "admin@gmail.com" && password === "admin")
        window.location.href = "admin.html";
    else
        alert("Your email or password is not correct!");
}