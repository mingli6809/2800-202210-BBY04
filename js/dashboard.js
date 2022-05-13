"use strict";

document.getElementById("username-text").innerHTML = localStorage.getItem("email");

document.getElementById("allUsers").addEventListener("click", function(){
   window.location = "/adminUsers";
});

document.getElementById("create-user").addEventListener("click", function(){
   window.location = "/createUser";
});