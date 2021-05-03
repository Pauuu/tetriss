const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
const singInBtn = document.getElementById("signInBtn");
const singOutBtn = document.getElementById("singOutBtn");

signInBtn.onclick = () => auth.signInWithRedirect(provider);

signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user => {
    if (user) {
        signedIn.hidden = false;
        signedOut.hidden = true;
        userDetails.innerHTML = `<h3> Hola ${user.displayName}!`;
    
    } else {
        signedIn.hidden = true;
        signedOut.hidden = false;
        userDetails.innerHTML = `¿Quien eres?`;
    }
});
