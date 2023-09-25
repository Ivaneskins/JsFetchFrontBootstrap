
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



    //remove user by id with fetch
    async function deleteUserById(userId) {

        console.log('Запуск функции deleteUserById...')
        let deleteUser = await fetch(`http://localhost:8080/admin/rest/delete/${userId}`, {
                        method: 'DELETE'
                    });   
        getAllUsers();
    }

    async function getAllRoles() {
        console.log('Вызвана функция getAllRoles...')
        let allRoles = await fetch(`http://localhost:8080/admin/rest/roles/`)
        .then(response => response.json())
        .then(allRoles => {
            console.log(allRoles);
        })
    }

    



