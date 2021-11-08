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

async function loadnextcontact(URL){

    console.log("URL: "+ URL);
    //request = new XMLHttpRequest();
    // fetch url
    const response = await fetch(URL)
    const contact = await response.json();
    
    //var string = contact.text();
    console.log(contact);
   
     
    console.log("Contact: " + contact.firstName);
    contactArray.push(contact)

    contactArray.push(contact);
    document.getElementById("contactsID").innerHTML = JSON.stringify(contactArray);

    loading++;

    if (URLArray.length > loading){
        loadnextcontact(URLArray[loading]);
    }
}

function logContacts() {
    console.log(contactArray);
}





