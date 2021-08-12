var firebaseConfig = {
    apiKey: "AIzaSyACyz7ZHmovMkxB1qMn0F_C2f23s4krKvo",
    authDomain: "huyflix.firebaseapp.com",
    projectId: "huyflix",
    storageBucket: "huyflix.appspot.com",
    messagingSenderId: "406397445504",
    appId: "1:406397445504:web:6a88b4f839e08a92160d65",
    measurementId: "G-34BR7DT5NN"
};

var uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        signInSuccessWithAuthResult: function (authResult) {
            if (authResult.user) {
                handleSignedInUser(authResult.user);
            }
            return false;
        },
        signInFailure: function (error) {

        }
    },

    autoUpgradeAnonymousUsers: true
};
var ui
$(function () {
    firebase.initializeApp(firebaseConfig);
    ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
    firebase.auth().onAuthStateChanged(function (user) {
        user ? handleSignedInUser(user) : handleSignedOutUser();
        $("#login-spinner").addClass("d-none")
    });
});

function handleSignedInUser(user) {
    $(".user").removeClass("d-none")
    $(".guest").addClass("d-none")

    $("#name").text(user.displayName);
    $("#email").text(user.email);
    $("#phone").text(user.phoneNumber);
    if (user.photoURL) {
        $(".avatar").attr("src",user.photoURL);
    } else {
        $(".avatar").attr("src","/images/user.svg");
    }
    $('#modal-login').modal('hide');
}
function handleSignedOutUser() {
    ui.start("#firebaseui-auth-container", uiConfig);
    $(".user").addClass("d-none")
    $(".guest").removeClass("d-none")
}
