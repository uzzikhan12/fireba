import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { ref,set,getDatabase,push,onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyB4VMfh6wGDx4cDBjV65GKJj2nD_MSNq-c",
    authDomain: "public-b37bc.firebaseapp.com",
    databaseURL: "https://public-b37bc-default-rtdb.firebaseio.com",
    projectId: "public-b37bc",
    storageBucket: "public-b37bc.appspot.com",
    messagingSenderId: "684317424182",
    appId: "1:684317424182:web:891159f1feb383636fb697",
    measurementId: "G-G9MKZQ9B8T"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
const auth = getAuth();

var userName = document.getElementById("userName");
var email = document.getElementById("email");
var password = document.getElementById("password");

var model = {};

window.signUp = function (e){
    e.preventDefault();
    model.email = email.value;
    model.userName = userName.value;
    model.password = password.value;
    console.log(model);

    createUserWithEmailAndPassword(auth,model.email,model.password)
    .then(function(res){
        console.log(res.user.uid,"Success response");
        model.id = res.user.uid;
        var reference = ref(database , `user/${model.id}`);
        set(reference,model)
        .then(function(dbRes){
            window.location="../todoApp/todo.html";
        })
        .catch(function(dbErr){
            alert(dbErr.message);
        });

        email.value = "";
        password.value = "";
        userName.value = "";
    })
    .catch(function(err){
        console.log(err, "Error response");
        alert(err.message);
    });
};
