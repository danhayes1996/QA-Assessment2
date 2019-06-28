const ownersDiv = document.getElementById('owners');
function displayOwners() {

    makeRequest('GET', 'http://localhost:9966/petclinic/api/owners')
        .then(value => displayOwners1(value));


}

function displayOwners1(value) {

    for (let owner of value) {
        const oDiv = document.createElement('div');
        oDiv.setAttribute('firstName', 'lastName');
        oDiv.className = 'card m-4 p-2';
        oDiv.addEventListener('click', () => handleOwnerClicked(owner));


        let fName = document.createElement('h4');
        fName.innerText = owner.firstName;

        let lName = document.createElement('h4');
        lName.innerText = owner.lastName;

        let tel = document.createElement('h6');
        tel.innerText = "Phone No: " + owner.telephone;

        oDiv.append(fName, lName, tel);
              
        ownersDiv.append(oDiv);

    }
}

function handleOwnerClicked(owner) {
    console.log('Owner CLICKED!', owner);
    sessionStorage.setItem('ownerID', owner.id);


    window.location = 'owner.html';
    return false;
}

displayOwners();