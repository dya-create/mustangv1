var URLArray = [];
var contactArray = [];
var loading = 0;

function initApplication() {
    console.log('Mustang Version 1 Starting....!'); 
}

function loadIndex() {
    // Load the index file
    var indexRequest = new XMLHttpRequest();
    indexRequest.open('GET', 'https://hostingjson.azurewebsites.net/index.json');
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
        loadNextContact(URLArray[loading]);
    }
}

function loadNextContact(URL) {
    console.log("URL: " + URL);
    
    // creating XMLHttpRequest object
    request = new XMLHttpRequest();
    request.open('GET', URL); // request, open the url 

    // callback function
    request.onload = function() {

        // return data as string
        console.log(request.responseText);
        var contact;
        contact = JSON.parse(request.responseText);
        console.log("Contact: " + contact.firstName); // display first name

        // pushing contact to array 
        contactArray.push(contact);
        document.getElementById("contactsID").innerHTML = JSON.stringify(contactArray);

        loading++;
        if (URLArray.length > loading) {
            loadNextContact(URLArray[loading]);
        }
    }

    request.send();
}

function logContacts() {
    console.log(contactArray);
}




