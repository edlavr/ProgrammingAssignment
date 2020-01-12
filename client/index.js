"use strict";

let adder = document.getElementById("btnNew"),
    loginAlert = document.getElementById("loginAlert"),
    signOut = document.getElementById("sign-in"),
    quoteInput = document.getElementById("quoteInput"),
    UserUid = document.getElementById("uidOfUser"),
    firebaseUIAuthContainer = document.getElementById("firebaseui-auth-container"),
    nameInput = document.getElementById("nameInput");

signOut.addEventListener("click", () => {

  firebase.auth().signOut().
  then(() => {

  }, error => {

    alert(`problem: ${error}`);

  });
  firebaseUIAuthContainer.style.display = "block";
  loginAlert.className = "alert alert-success";
  loginAlert.innerHTML = "You have successfully signed out!";

});


const firebaseConfig = {
  "apiKey": "AIzaSyBS1uQsLLtYhKT_e_Tv57xRnvy0dtBc3Jc",
  "authDomain": "programming-first.firebaseapp.com",
  "databaseURL": "https://programming-first.firebaseio.com",
  "projectId": "programming-first",
  "storageBucket": "programming-first.appspot.com",
  "messagingSenderId": "529288420169"
};

if (!firebase.apps.length) {

  firebase.initializeApp(firebaseConfig);

}


const uiConfig = {
      "signInSuccessUrl": "/",
      "signInOptions": [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ]
    },
    ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start("#firebaseui-auth-container", uiConfig);

const initApp = function () {

  firebase.auth().onAuthStateChanged(user => {

    if (user) {

      // User is signed in.
      const {displayName} = user,
          {email} = user,
          {emailVerified} = user,
          {photoURL} = user,
          {uid} = user,
          {phoneNumber} = user,
          {providerData} = user;

      user.getIdToken().then(accessToken => {

        document.getElementById("sign-in-status").textContent = "Signed in";
        document.getElementById("sign-in").textContent = "Sign out";
        document.getElementById("account-details").textContent = JSON.stringify({
          displayName,
          email,
          emailVerified,
          phoneNumber,
          photoURL,
          uid,
          accessToken,
          providerData
        }, null, "  ");

      });

      const nameInput = document.getElementById("nameInput");

      nameInput.innerText += displayName;

      const userPhoto = photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";


      if (UserUid.value === uid) {

        adder.style.display = "none";
        loginAlert.className = "alert alert-info";
        loginAlert.innerHTML = "You already have a random number assigned!";

      } else {

        loginAlert.className = "alert alert-success";
        loginAlert.innerHTML = "You have successfully signed in!";

      }

      adder.addEventListener("submit", async event => {
        event.preventDefault();
        adder.style.display = "none";
        quoteInput.value = quoteInput.value || "Nothing";
        try {

          const response = await fetch(
              "/add",
              {
                "method": "POST",
                "headers": {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                "body": `randomNumber=${Math.floor(Math.random() * 100000000)}&username=${displayName}&quote=${quoteInput.value.toLowerCase()}&photo=${userPhoto}&uid=${uid}`
              }
          );

          if (!response.ok) {

            alert(Error(`problem adding ${response.code}`));

          }

        } catch (error) {

          alert(`problem: ${error}`);

        }


      });
      firebaseUIAuthContainer.style.display = "none";

    } else {

      signOut.style.display = "none";
      adder.style.display = "none";
      nameInput.style.display = "none";
      // User is signed out.
      document.getElementById("sign-in-status").textContent = "Signed out";
      document.getElementById("sign-in").textContent = "Sign in";
      document.getElementById("account-details").textContent = "null";

    }

  }, error => {

    alert(`problem: ${error}`);

  });

};

window.addEventListener("load", () => {

  initApp();

});


const tbl = document.getElementById("tbl");
let counter = 0;

document.addEventListener("DOMContentLoaded", async () => {

  let response = await fetch("/list"),
      body = JSON.parse(await response.text());

  for (let i = 0; i < body.length; i++) {

    try {

      if (body[i].uid) {

        UserUid.value = body[i].uid;

      }

    } catch (e) {
      alert(`problem: ${e}`);
    }

  }
  body = body.sort(SortByID);
  for (let e = 0; e < 10; e++) {

    renderHTML(body);
    counter++;

  }


});

const btn = document.getElementById("btn");

btn.addEventListener("click", async () => {

  const response = await fetch("/list");
  let body = JSON.parse(await response.text());

  body = body.sort(SortByID);
  for (let e = 0; e < 10; e++) {

    renderHTML(body);
    counter++;
    if (counter === body.length) {

      btn.style.display = "none";

    }


  }

});


document.getElementById("btnone").addEventListener("click", async () => {

  const response = await fetch("/list");
  let body = JSON.parse(await response.text()),
      tempCounter = counter;

  counter = 0;
  tbl.innerHTML = "<thead>\n" +
      "    <tr>\n" +
      "      <th>#</th>\n" +
      "      <th>Number</th>\n" +
      "      <th>Person</th>\n" +
      "      <th>Comment</th>\n" +
      "      <th>Photo</th>\n" +
      "    </tr>\n" +
      "    </thead>";
  body = body.sort(SortByID);
  for (let e = 0; e < tempCounter; e++) {

    renderHTML(body);
    counter++;

  }


});


const searchButton = document.getElementById("searchName");

searchButton.addEventListener("click", async () => {

  event.preventDefault();
  const searchInput = document.getElementById("searchInput").value || "a name because of empty request",
      modalBody = document.getElementById("modalBody"),
      response = await fetch(`/list/usernames/${searchInput.toLowerCase()}`);

  try {

    const body = JSON.parse(await response.text());

    modalBody.innerHTML = `<div class='container'>Number ${Object.values(body)[0]}. It is ${Object.values(body)[1]} who said ${Object.values(body)[2]}</div>`;
    modalBody.innerHTML += `<div class='container'><img alt="profile-pic" src='${Object.values(body)[3]}' width='100%'></div>`;

  } catch (error) {

    modalBody.innerHTML = `Could not find ${searchInput}`;

  }

});


function renderHTML (data) {

  let htmlData = "";

  htmlData += "<tr>";
  htmlData += `<td>${counter + 1}</td>`;
  try {

    for (let i = 0; i < 3; i++) {

      htmlData += `<td>${Object.values(data[counter])[i]}</td>`;

    }

  } catch (e) {

    return null;

  }
  htmlData += `<td> <img src='${Object.values(data[counter])[3]}' alt="profile-pic" width='50px'> </td>`;
  htmlData += "</tr>";

  tbl.insertAdjacentHTML("beforeend", htmlData);

}

/**
 * @return {number}
 */
function SortByID (x, y) {

  return y.randomNumber - x.randomNumber;

}
