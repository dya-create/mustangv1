var contactURLArray = [];
var contactArray = [];
var loadingContact = 0;

function initApplication() {
    console.log('Mustang Lite - Starting!'); 
}

function loadIndex() {
    // Load the index file
    var indexRequest = new XMLHttpRequest();
    indexRequest.open('GET', 'https://hostingjson.azurewebsites.net/index.json');
    indexRequest.onload = function() {
        console.log("Index JSON:" + indexRequest.responseText);
        document.getElementById("indexID").innerHTML = indexRequest.responseText;
        contactIndex = JSON.parse(indexRequest.responseText);
        contactURLArray.length = 0;
        for (i=0; i<contactIndex.length; i++) {
            contactURLArray.push(contactIndex[i].ContactURL);
        }
        console.log("ContactURLArray: " + JSON.stringify(contactURLArray));
    }
    indexRequest.send();
}

//load contact fucntion
function loadContacts() {
    
    //setting contact array length to 0
    contactArray.length = 0;
   
    // settinng number of loaded contact to 0
    loadingContact = 0;

    //if 
    if (contactURLArray.length > loadingContact) {
        loadNextContact(contactURLArray[loadingContact]);
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

        loadingContact++;
        if (contactURLArray.length > loadingContact) {
            loadNextContact(contactURLArray[loadingContact]);
        }
    }

    request.send();
}

function logContacts() {
    console.log(contactArray);
}




