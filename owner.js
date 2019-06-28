function loadOwner(){
    const ownerID = sessionStorage.getItem('ownerID');
    makeRequest('GET', 'http://localhost:9966/petclinic/api/owners/' + ownerID)
        .then((value) =>{
            //console.log(value);
            createPage(value);

        });
}

function createPage(owner){
    //console.log(owner);
    const div = document.getElementById('main');
    const {pets, id, ...other} = owner;
    
    const ownerDiv = document.createElement('div');
    ownerDiv.className = 'owner';
    for(e in other){   
        createElement('p', e + ": " + owner[e], 'ownerElement', ownerDiv);
    }
    div.append(ownerDiv);
    createPets(pets);
}

function createPets(pets){
    const div = document.getElementById('main');
    createElement('p', "Pets: ", 'pets', div);
    for(pet of pets){ 
        const petDiv = document.createElement('div');
        petDiv.className = 'pet';
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
            createElement('p', "Visits: ", 'visitsEl', visitsDiv);
            for(visit in pet[e]){
                createElement('p', visit, 'visitsEl', visitsDiv);
            }
            parent.append(visitsDiv);
        }
        else if(typeof pet[e] === 'object'){
            createElement('p', "type: " + pet[e].name, 'info', parent);
        }else {
            createElement('p', e + ": " + pet[e], 'info', parent);
        }
    }
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

//loadOwner();