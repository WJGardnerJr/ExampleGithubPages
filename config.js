const firebaseConfig = {
    apiKey: "AIzaSyB9PJ5VAQqc5hIiy6PtcVA6u6uy1dmTnCs",
    authDomain: "demo3-21aab.firebaseapp.com",
    projectId: "demo3-21aab",
    storageBucket: "demo3-21aab.appspot.com",
    messagingSenderId: "18589819505",
    appId: "1:18589819505:web:bda677fceeb8134fc8b1d0",
    measurementId: "G-HQHRDH2DHT"
  };

  firebase.initializeApp(firebaseConfig);

  auth = firebase.auth();
  db = firebase.firestore();

  function signUp(){
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    auth.createUserWithEmailAndPassword(email,password)
    .then((userCredential) => {
        var user = userCredential.user;
        alert("Signed Up" + user.email);
    })
  }

  function login(){
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        var user = userCredential.user;
        alert("Logged in" + user.email);
    }
  }