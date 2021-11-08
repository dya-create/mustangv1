var URLArray = [];
var contactArray = [];
var loading = 0;
let status = 0;

function initApplication() {
    console.log('Mustang Version 1 Starting....!'); 
}
async function loadIndex() {
    
    //fetch url
    const response = await fetch("https://mustang-index.azurewebsites.net/index.json")

    //fetch text version
    const contactIndex = await response.text() 

    console.log("Index json" + contactIndex);
    document.getElementById("indexID").innerHTML = contactIndex
    

    // fetching json version 
    const responseTwo = await fetch("https://mustang-index.azurewebsites.net/index.json")
    const contactIndexTwo= await responseTwo.json() 

    for (i=0; i<contactIndexTwo.length; i++) {
        URLArray.push(contactIndexTwo[i].ContactURL);
    }
    console.log("ContactURLArray: " + JSON.stringify(URLArray));
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

async function loadNextContact(URL) {
    console.log("URL: " + URL);
    const response = await fetch(URL)
    const contactResponse = await response.text()
    
    contact = JSON.parse(contactResponse)
    console.log(contactResponse)
    console.log("Contact: " + contact.firstName);

    contactArray.push(contact);

    document.getElementById("statusID").innerHTML = "Status : " + status + "%";
    status = status + 6;
    if(status > 100){
        status = 100
    }
    console.log(status)

    document.getElementById("contactsID").innerHTML = JSON.stringify(contactArray)
    console.log(contactArray)

    loading++;

    if (URLArray.length > loading) {
        loadNextContact(URLArray[loading]);
    }

}

// log contacts to console
function logContacts() {
    console.log(contactArray);
}






