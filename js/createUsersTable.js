const usersTable = document.getElementById('tbody');

async function getAllUsers() {
    console.log('Вызвана функция getData');
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
                                onclick="getDeleteModal(${user.id})">
                                    Delete
                            </button>
                        </td>
                    </tr>`;
            }  
            usersTable.innerHTML = tableUsersString;
            
        })
            console.log('getData отработала');
}
getAllUsers();
        
