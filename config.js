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
        alert("Signed Up " + user.email);
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/email-already-in-use':
          alert(`Email address ${this.state.email} already in use.`);
          break;
        case 'auth/invalid-email':
          alert(`Email address ${this.state.email} is invalid.`);
          break;
        case 'auth/operation-not-allowed':
          alert(`Error during sign up.`);
          break;
        case 'auth/weak-password':
          alert('Password is not strong enough. Add additional characters including special characters and numbers.');
          break;
        case 'auth/wrong-password':
          alert("Password incorrect. Please re-enter password.");
          break;
        default:
          alert(error.message);
          break;
      }
    });
  }

  function logIn(){
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        var user = userCredential.user;
        alert("Logged in " + user.email);
    })
  }

  function set(){
    var Studentname = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var id = document.getElementById('id').value;
    var semester = document.getElementById('semester').value;
    var Class = document.getElementById('class').value;
    var grade = document.getElementById('grade').value;
    var UserID = auth.currentUser.uid;

    db.collection('users').doc(UserID).set({
      Studentname: Studentname,
      age: age,
      id: id,
      semester: firebase.firestore.FieldValue.arrayUnion({ semester: semester, Class: Class, grade:
      grade })
      })//if the data is successfully added to the database
      .then(function() {
      console.log("Document successfully written to the database.");
      })//if the data is not successfully added to the database
      .catch(function(error) {
      console.error("Error writing document: ", error);
      });
  }

  function update() {
    var Studentname = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var id = document.getElementById('id').value;
    var semester = document.getElementById('semester').value;
    var Class = document.getElementById('class').value;
    var grade = document.getElementById('grade').value;
    var UserID = auth.currentUser.uid;
//updating the database by adding a new semester data to the semester array field and will not adda new field if it does not exist
    db.collection('users').doc(UserID).update({
      Studentname: Studentname,
      age: age,
      id: id,
      semester: firebase.firestore.FieldValue.arrayUnion({ semester: semester, Class: Class, grade:
      grade })
      })
  .then(function() {
    console.log("Document successfully updated!");
  }
  )
.catch(function(error) {
  console.error("Error updating document: ", error);
  });
}

function show() {
  var UserID = auth.currentUser.uid;
  //querying the database
  db.collection('users').doc(UserID).get()
  .then(function(doc) {
      if (doc.exists) { //if the document exists in the database then display the data
      document.getElementById('nameDisplay').innerHTML = doc.data().Studentname;
      document.getElementById('ageDisplay').innerHTML = doc.data().age;
      document.getElementById('idDisplay').innerHTML = doc.data().id;
  //getting the semester data from the database
  var semesterData = doc.data().semester;
  var semesterDisplay = "";
  //looping through the semester data and displaying it
      for (var i = 0; i < semesterData.length; i++) {
      semesterDisplay += "Semester: " + semesterData[i].semester + ", Class: " +
      semesterData[i].Class + ", Grade: " + semesterData[i].grade + "<br>";
      }
      document.getElementById('semesterDisplay').innerHTML = semesterDisplay;
      } 
      else {
        console.log("No such document!");
       }
       })
      .catch(function(error) {
         console.log("Error getting document:", error);
          });
      }

  function deleteData() {
  var UserID = auth.currentUser.uid;
  //deleting the document from the database
  db.collection('users').doc(UserID).delete().then(function() {
  console.log("Document successfully deleted!");
  }).catch(function(error) {
  console.error("Error removing document: ", error);
  });
  }