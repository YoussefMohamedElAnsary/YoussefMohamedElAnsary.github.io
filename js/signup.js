let fname = document.querySelector("#firstname")
let lname = document.querySelector("#lastname")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let registerBtn = document.querySelector("#sign_up")

registerBtn.addEventListener("click", function (e) {
    e.preventDefault()
    console.log("Button clicked");

    if (fname.value === "" || lname.value === "" || email.value === "" || password.value === "") {
        alert("Please enter all details")
    }
    else {
        localStorage.setItem("fname", fname.value)
        localStorage.setItem("lname", lname.value)
        localStorage.setItem("email", email.value)
        localStorage.setItem("password", password.value)


        setTimeout(() => {
            window.location = "login.html"
        }, 1500)
    }

})

