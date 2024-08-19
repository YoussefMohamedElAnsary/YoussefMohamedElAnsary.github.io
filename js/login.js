let email = document.querySelector("#email");
let password = document.querySelector("#password");
let loginBtn = document.querySelector("#login");

let getEmail = localStorage.getItem("email");
let getPassword = localStorage.getItem("password");

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    console.log("Stored Email:", getEmail);
    console.log("Stored Password:", getPassword);
    console.log("Entered Email:", email.value);
    console.log("Entered Password:", password.value);

    if (email.value === "" || password.value === "") {
        alert("2imla");
    } else {
        if (getEmail && getEmail.trim() === email.value && getPassword === password.value) {
            setTimeout(() => {
                window.location = "index.html";
            }, 1500);
        } else {
            alert("ghalat");
        }
    }
});
