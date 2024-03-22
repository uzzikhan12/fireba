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

const frb = firebase.initializeApp(firebaseConfig);


var inp = document.getElementById("inp");
var parent = document.getElementById("parent");


firebase
.database()
.ref("todos")
.on("child_added"
, (data) =>{    
    var pera = document.createElement('P');
    pera.setAttribute('class','para');
    var finalText = document.createTextNode(data.val().value);
    pera.appendChild(finalText);

    var editBtn = document.createElement('BUTTON');
    editBtn.setAttribute('class', 'addBtn');
    editBtn.setAttribute('id', data.val().key);
    editBtn.setAttribute('onclick', 'editItems(this)');
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';

    var delBtn = document.createElement("BUTTON");
    delBtn.setAttribute('class', 'addBtn');
    delBtn.setAttribute('id', data.val().key);
    delBtn.setAttribute('onclick', 'delItems(this)');
    delBtn.innerHTML= "<i class='fa fa-trash'></i>";
        
    var btnParent = document.createElement('DIV');
    btnParent.appendChild(editBtn);
    btnParent.appendChild(delBtn);
    pera.appendChild(btnParent);

    parent.appendChild(pera);
    inp.value = "";
});


function addItem(){
    
    var key = firebase.database().ref("todos").push().key;
    
    var obj = {
        value: inp.value,
        key: key
    }

    firebase.database().ref("todos").child(key).set(obj);

}

function editItems(e){
    var newText = prompt("Enter new text" );
    
    editTodo = {
        value : newText,
        key :  e.id
    }

    firebase.database().ref('todos').child(e.id).set(editTodo);
    e.parentElement.parentElement.firstChild.nodeValue = newText;
}

function delItems(a){
    firebase.database().ref("todos").child(a.id).remove();
    var del = a.parentElement.parentElement;
    parent.removeChild(del);
}

function deleteAll(){
    firebase.database().ref('todos').remove();
    parent.innerHTML = "";
}



















