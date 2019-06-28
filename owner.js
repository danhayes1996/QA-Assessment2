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
                if(pet[e] && pet[e][visit]){
                    console.log(pet[e][visit]);
                    createVisit(pet[e][visit], visitsDiv);
                } else {
                    console.log('visit error');
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
    const modBtn = document.createElement('input');
    modBtn.setAttribute('value', "Modify");
    modBtn.setAttribute('type', 'button');
    modBtn.addEventListener('click', (e) => {
        console.log('modify btn click')
    });

    const delBtn = document.createElement('input');
    delBtn.setAttribute('value', "Delete");
    delBtn.setAttribute('type', 'button');
    delBtn.addEventListener('click', (e) => {
        console.log('delete btn click')
    });
    parent.append(modBtn, delBtn);
}

function createVisit({date, description}, parent){
    const visitDiv = document.createElement('div');
    visitDiv.className = 'visit';
    createElement('p', 'Date: ' + date, 'visitEl', visitDiv);
    createElement('p', 'Description: ' + description, 'visitEl', visitDiv);
    parent.append(visitDiv);
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