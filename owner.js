function loadOwner(){
    const ownerID = sessionStorage.getItem('ownerID');
    makeRequest('GET', 'http://localhost:9966/petclinic/api/owners/' + ownerID)
        .then((value) =>{
            console.log(value);
            createPage(value);

        });
}

function createPage(owner){
    //console.log(owner);
    const div = document.getElementById('main');
    const {pets, id, firstName, lastName, ...other} = owner;
    
    const ownerDiv = document.createElement('div');
   createElement('h4', firstName + " " + lastName, 'card-header', ownerDiv);
    ownerDiv.className = "card m-4 p-2";
    for(e in other){   
        createElement('p', e + ": " + owner[e], 'ownerElement', ownerDiv);
    }
    div.append(ownerDiv);
    createPets(pets);
}

function createPets(pets){
    const div = document.getElementById('main');
    
    for(pet of pets){ 
        const petDiv = document.createElement('div');
        createElement('h4', pet.name, "card-header", petDiv);
        petDiv.className = "card m-4 p-2";
        createPet(pet, petDiv);
        
        div.append(petDiv);
    }
    //console.log(pets);
}

function createPet(currentPet, parent){
    const {id, owner, ...pet} = currentPet;
    for(e in pet){
        if(Array.isArray(pet[e])){
            const visitsDiv = document.createElement('div');
            visitsDiv.className = 'visits';
            createElement('h5', "Visits: ", 'card-header', visitsDiv);
            for(visit in pet[e]){
                if(pet[e] && pet[e][visit]){
                    createVisit(pet[e][visit], visitsDiv);
                }
            }
            parent.append(visitsDiv);
        }
        else if(typeof pet[e] === 'object'){
            createElement('p', "type: " + pet[e].name, 'info', parent);
        }else {
            createElement('p', e + ": " + pet[e], 'info', parent);
        }
    }

    //btns
    createButton('Modify', (e) => console.log('modify btn click'), parent);
    createButton('Delete', (e) => console.log('delete btn click'), parent);
}

function createVisit({date, description}, parent){
    const visitDiv = document.createElement('div');
    visitDiv.className = "card m-4 p-2";
    createElement('p', 'Date: ' + date, 'visitEl', visitDiv);
    createElement('p', 'Description: ' + description, 'visitEl', visitDiv);
    parent.append(visitDiv);
}

function createButton(text, func, parent){
    const btn = document.createElement('input');
    btn.setAttribute('value', text);
    btn.setAttribute('type', 'button');
    btn.addEventListener('click', func);
    parent.append(btn);
}

function createElement(tag, text, className, parent){
    const e = document.createElement(tag);
    e.innerText = text;
    e.className = className;
    if(parent){
        parent.append(e);
    }
    return e;
}