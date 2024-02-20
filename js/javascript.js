//Get the IDs you want to deal with
var LogInEmailAddress = document.getElementById('LogInEmailAddress');
var LogInPassword = document.getElementById('LogInPassword');
var SignUpEmailAddress = document.getElementById('SignUpEmailAddress');
var SignUpPassword = document.getElementById('SignUpPassword');
var SignUpName = document.getElementById('SignUpName');
var AllSignUps = [];

//We need the full path so as to move to the home page after login.
var pathparts = location.pathname.split('/');
var baseURL = '';
for (var i=0 ; i < pathparts.length-1 ; i++){
    baseURL += '/' + pathparts[i];
}


var userName = localStorage.getItem('requiredUserName');
if (userName) {
    document.getElementById('userName').innerHTML = "Welcome, " + userName + "!";
    document.getElementById('quoteIntro').innerHTML = `Welcome to our Bookmark Hub, where
     every click is a step closer to a world of curated knowledge and inspiration.
      Here, your bookmarks aren't just links; they're gateways to the treasures of the web,
       waiting to be explored and cherished. Let's navigate the vast sea of information
        together, one bookmark at a time.`
}



if (localStorage.getItem('users') == null){
    AllSignUps = [];
}
else {
    AllSignUps = JSON.parse(localStorage.getItem('users'));
}

//To check if inputs are empty (ALL REQUIRED)
function notFullDataToSignUp() {
    if (SignUpName.value == "" || SignUpEmailAddress.value == "" || SignUpPassword.value == "") {
        return true;
    }
    else {
        return false;
    }
}

//To check if inputs are empty (ALL REQUIRED)
function notFullDataToLogIn() {
    if (LogInEmailAddress.value == "" || LogInPassword.value == "") {
        return true;
    }
    else {
        return false;
    }
}

//To check if the email address already exists before
function EmailAddressAlreadyExisted() {
    for (var i = 0; i < AllSignUps.length; i++) {
        if (AllSignUps[i].email.toLowerCase() == SignUpEmailAddress.value.toLowerCase()) {
            return true;
        }
    }
    return false;
}


function signUp() {
    if (notFullDataToSignUp()) {
        document.getElementById('checkSignUp').innerHTML = '<p class="text-danger m-2">All inputs are required</p>';
        return false;
    }
    var signUp = {
        name: SignUpName.value,
        email: SignUpEmailAddress.value,
        password: SignUpPassword.value,
    }
    if (EmailAddressAlreadyExisted()) {
        document.getElementById('checkSignUp').innerHTML = '<p class="text-danger m-2 display-6">Email Address is already existed!</p>';

    }
    else {
        AllSignUps.push(signUp);
        localStorage.setItem('users', JSON.stringify(AllSignUps));
        document.getElementById('checkSignUp').innerHTML = '<p class="text-success m-2 display-6">Registered successfully.</p>';

    }
}

function logIn() {
    if (notFullDataToLogIn()) {
        document.getElementById('checkLogIn').innerHTML = '<p class="text-danger m-2">All inputs are required</p>';
        return false;
    }
    var email = LogInEmailAddress.value;
    var password = LogInPassword.value;
    for (var i = 0; i < AllSignUps.length; i++) {
        if (AllSignUps[i].email.toLowerCase() == email.toLowerCase() && AllSignUps[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('requiredUserName', AllSignUps[i].name);
            if (baseURL == '/') {
                location.replace('https://' + location.hostname + '/home.html');
            } else {
                location.replace(baseURL + '/home.html');
            }
        }
        else {
            document.getElementById('checkLogIn').innerHTML = '<p class="p-2 text-danger">Incorrect Email or Password, please try again.</p>';
        }
    }
}


function logOut() {
    localStorage.removeItem('requiredUserName');
}



// ----------------------------------------------------
// FOR BOOKMARKERRRR


var bookmarks=[];

function checkName(name) {
    if (name == null || name == "") {
        return false;
    }
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].sitename === name)
            return false;
    }
    return true;
}

function checkUrl(url) {
    if (url == null || url == "") {
        return false;
    }
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].siteurl === url)
            return false;
    }
    return true;
}

function display(){
    var cartoona="";
    for(var i=0 ; i < bookmarks.length ; i++){
        cartoona += `<tr class="text-center">
            <td class="fw-bold text-secondary display-5">${bookmarks[i].sitename}</td>
            <td>
                <a href="${bookmarks[i].siteurl}"  target=”_blank”>
                <button class="btn btn-info text-white m-3 p-3">Visit</button>
                </a>
            </td>
            <td>
                <button onclick="DeleteThisBookmark(${i})" class="btn btn-danger text-white m-3 p-3">Delete!</button>
            </td>   
        </tr>`;
        
    }
    document.getElementById('table_body').innerHTML = cartoona;
}

var siteName = document.querySelector("#name");
var siteUrl = document.querySelector("#url");

function submit(){
    if(checkName(siteName.value) && checkUrl(siteUrl.value))
    {
        var bookmark = {
            sitename : siteName.value,
            siteurl : siteUrl.value
        }

        bookmarks.push(bookmark);
        clear();
        display();
    }
    else
    {
        if (!checkName(siteName.value)) {
            showNameError("This Bookmark Name already exists in the bookmarks list.");
        }
        if (!checkUrl(siteUrl.value)) {
            showNameError("This Bookmark Name already exists in the bookmarks list.");
        }
        if (siteName.value == null || siteName.value == "") {
            showNameError("Name is required.");
        }
        if (siteUrl.value == null || siteUrl.value == "") {
            showUrlError("URL is required.");
        }
    }
    
}

function DeleteThisBookmark(bookmark){
    bookmarks.splice(bookmark , 1);
    display();
}

function clear() {
    for (var i = 0 ; i < bookmarks.length ; i++){
        bookmarks[i].value ="";
    }
}
