var URLArray = [];
var contactArray = [];
var loading = 0;

function initApplication() {
    console.log('Mustang Version 1 Starting....!'); 
}
function loadIndex() {
    // Load the index file
    var indexRequest = new XMLHttpRequest();
    indexRequest.open('GET', 'https://mustang-index.azurewebsites.net/index.json');
    indexRequest.onload = function() {
        console.log("Index JSON:" + indexRequest.responseText);
        document.getElementById("indexID").innerHTML = indexRequest.responseText;
        contactIndex = JSON.parse(indexRequest.responseText);
        URLArray.length = 0;
        for (i=0; i<contactIndex.length; i++) {
            URLArray.push(contactIndex[i].ContactURL);
        }
        console.log("URLArray: " + JSON.stringify(URLArray));
    }
    indexRequest.send();
}

    

//load contact fucntion
function loadContacts() {
    
    //setting contact array length to 0
    contactArray.length = 0;
   
    // settinng number of loaded contact to 0
    loading = 0;

    //if 
    if (URLArray.length > loading) {
        loadnextcontact(URLArray[loading]);
    }
}

async function loadnextcontact(URL) {


    console.log("URL: " + URL);
    
    // creating XMLHttpRequest object
    contactRequest = new XMLHttpRequest();
    contactRequest.open('GET', URL, true); // request, open the url 

    // callback function
    contactRequest.onreadystatechange= function() {

        console.log(contactRequest.responseText);
        var contact;
        contact = JSON.parse(contactRequest.responseText);
        console.log("Contact: " + contact.firstName); // display first name

        // pushing contact to array 
        contactArray.push(contact);
        
        document.getElementById("contactsID").innerHTML = JSON.stringify(contactArray);
        if (contactRequest.readyState == 0){
            document.getElementById("statusID").innerHTML = "Uninitiated: Objects conntains no data";

        }
        else if (contactRequest.readyState == 1){
            document.getElementById("statusID").innerHTML = "Loading: Objects loading";

        }
        else if (contactRequest.readyState == 2){
            document.getElementById("statusID").innerHTML = "Loaded: Objects are loaded";

        }else if (contactRequest.readyState == 3){
            document.getElementById("statusID").innerHTML = "Interactive: User may interract with the object even though its not fully loaded";

        }else if (contactRequest.readyState == 4){
            document.getElementById("statusID").innerHTML = "Complete: Objects has finished intialiizing";

        }
        

        loading++;
        if (URLArray.length > loading) {
            loadnextcontact(URLArray[loading]);
        }
    }

    contactRequest.send(null);
}

function logContacts() {
    console.log(contactArray);
}






