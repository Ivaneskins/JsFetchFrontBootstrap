
// fill users table
async function getAllUsers() {
    console.log('Вызвана функция getAllUsers');
    const usersTable = document.getElementById('tbody');
    await fetch('http://localhost:8080/admin/rest/')
        .then(response => response.json())
        .then(allUsers => {
            let tableUsersString = '';            

            for(let user of allUsers) {
                let rolesToString = '';
                for (let role of user.roles) {
                    rolesToString += role.name.replace('ROLE_', '') + " ";                    
                }

                tableUsersString += 
                    `<tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.lastname}</td>
                        <td>${user.age}</td>
                        <td>${user.email}</td>
                        <td>${rolesToString}</td>
                        <td>
                            <button type="button" class="btn btn-info" id="${'#editModal' + user.id}"
                                onclick="getEditModal(${user.id})">
                                    Edit
                            </button>
                        </td>
                    
                        <td>
                            <button type="button" class="btn btn-danger" id="${'#deleteModal' + user.id}"
                                onclick="getUserOnDeleteForm(${user.id})">
                                    Delete
                            </button>
                        </td>
                    </tr>`;
            }  
            usersTable.innerHTML = tableUsersString;            
        })
            console.log('getAllUsers отработала');
}

    //remove user by id 
async function deleteUserById(userId) {

    console.log('Запуск функции deleteUserById...')
    let deleteUser = await fetch(`http://localhost:8080/admin/rest/delete/${userId}`, {
                    method: 'DELETE'
                });   
    getAllUsers();
}

    //get all roles from the table Roles 
async function getAllRoles(idOfSelectRoles) {        
    console.log('Вызвана функция getAllRoles...')
    let allRoles = await fetch(`http://localhost:8080/admin/rest/roles/`)
    .then(response => response.json())
    .then(allRoles => {
        let editRolesContent = '';
        for(let role of allRoles) {
            editRolesContent += `<option value=${role.id}> ${role.name} </option> <br>`;
        }            
        let selectRoles = document.getElementById(`${idOfSelectRoles}`);            
        selectRoles.innerHTML = editRolesContent;       
    })       
}

// PATCH user 
async function editUserById(userId) {

    let editForm = document.getElementById('formEdit');
    let formData = new FormData(editForm);
    let userData = Object.fromEntries(formData.entries());

    let roles = reformatRolesToSaveInObject(userData);
    userData.roles = roles;
    console.log('JSONuserData= ' + JSON.stringify(userData));

    console.log('Запуск функции editUserById...')
    let deleteUser = await fetch(`http://localhost:8080/admin/rest/edit/`, {
                    method: 'PATCH', 
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(userData)
                });   
    getAllUsers();
}

// POST create new user

async function addNewUser() {
    let newUserForm = document.getElementById('newUserForm');
    let newUserFormData = new FormData(newUserForm);
    let userData = Object.fromEntries(newUserFormData.entries());    

    userData.roles = reformatRolesToSaveInObject(userData);
    console.log('JSONNew userData= ' + JSON.stringify(userData));


    let addNewUser = await fetch(`http://localhost:8080/admin/rest/`, {
        method: 'POST', 
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(userData)
    });   
}





    



