"use script";

function GET(url, callback) {

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            callback(this.responseText);

        } else {
            console.log(this.status);
        }
    }
    xhr.open("GET", url);
    xhr.send();
}

GET("/nav", (response) => {
    let doc = document.querySelector(".header");
    doc.innerHTML = response;
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        navMenu.classList.toggle("active")
        
    })

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }))
    
    window.addEventListener("load", function(){
        console.log("running");
        let landingPage = "http://localhost:8000/";
        let loginPage = "http://localhost:8000/login_landing";
        let signupPage = "http://localhost:8000/createuser";
        if (window.location.href == landingPage  || window.location.href == loginPage || window.location.href == signupPage ) {
            document.querySelector(".logout").style.display = "none";
            document.querySelector(".profilePage").style.display = "none";
        }
    })
})

GET("/footer", (res)=>{
    let doc = document.querySelector(".footer");
    doc.innerHTML = res;
})


   



