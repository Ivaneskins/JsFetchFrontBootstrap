const table = document.getElementById('tbody');

const deleteModal = document.getElementById('deleteModal');

document.addEventListener("DOMContentLoaded", getData);

$(document).ready(function() {
    let h1Teg = $('#h1Teg');
    h1Teg.text('edit!!!');
    $('#deleteModal').on('show.bs.modal'), function(e) {
    console.log('modal open');
    h1Teg.text('ьщвфд щзут');
};
})

// fetch на rest-адрес для взятия всех пользователей

async function getData() {
    console.log('Вызвана функция getData');
    await fetch('http://localhost:8080/admin/rest/')
        .then(response => response.json())
        .then(data => {
            for(let user of data) {
                let tr = document.createElement('tr');
                let tdUserId = document.createElement('td');
                tdUserId.innerHTML = user.id;
                tr.append(tdUserId);  
                let tdUserName = document.createElement('td');
                tdUserName.innerHTML = user.username;
                tr.append(tdUserName); 
                let tdLastName = document.createElement('td');
                tdLastName.innerHTML = user.lastname;
                tr.append(tdLastName); 
                let tdAge = document.createElement('td');
                tdAge.innerHTML = user.age;
                tr.append(tdAge); 
                let tdEmail = document.createElement('td');
                tdEmail.innerHTML = user.email;
                tr.append(tdEmail);
                let tdRoles = document.createElement('td');   
                
                //проходим по массиву ролей и вставляем в роли
                let temp = ``;
                for (let role of user.roles) {
                    temp += role.name.replace('ROLE_', '') + " ";                    
                }
                tdRoles.innerHTML = temp;
                tr.append(tdRoles); 

                let tdEdit = document.createElement('td');
                tdEdit.innerHTML = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCentered">` +
                `Edit </button>`;
                tr.append(tdEdit);                    

                // let tdDelete = document.createElement('td');
                // tdDelete.innerHTML = "";                
                // tdDelete.innerHTML = `<button type="button" onclick="deleteForm(${user.id},
                //      '${user.username}', '${user.lastname}', '${user.age}', '${user.email}',
                //       '${temp}')"                     
                //       class="btn btn-danger" data-toggle="modal" data-target="#deleteModal"> Delete </button>`;
                // tr.append(tdDelete);
                // table.append(tr);            
                

                // задать кнопка свой ID и накинуть eventListener ниже в коде
                let tdDelete = document.createElement('td');
                tdDelete.innerHTML = `<button type="button"                    
                      class="btn btn-danger" onclick="getUserOnDeleteForm(${user.id})" data-toggle="modal" data-target="#deleteModal"> Delete </button>`;
                tr.append(tdDelete);
                table.append(tr);    
                


            }
            console.log('getData отработала');
        })
        .catch(error => {
            console.error('Произошла ошибка: ', error);
        })
}
// функция заполнения данными на каждую кнопку DELETE
async function getUserOnDeleteForm(userId) {  
    console.log('Вызвана функция getUserOnDeleteForm');
    await fetch(`http://localhost:8080/admin/rest/${userId}`)
        .then(response => response.json())
        .then(data => {     
            let deleteModalId = document.getElementById('deleteModalId').value = data.id;                                 
            let deleteModalUsername = document.getElementById('deleteModalUsername').value = data.username;            
            let deleteModalLastName = document.getElementById('deleteModalLastName').value = data.lastname;            
            let deleteModalAge = document.getElementById('deleteModalAge').value = data.age;           
            let deleteModalEmail = document.getElementById('deleteModalEmail').value = data.email;            
            let deleteModalRole = document.getElementById('deleteModalRole').innerHTML = data.roles;
            deleteModalRole.append(opt);            
        }
    )} 


    deleteModal.addEventListener('submit', async function(e) {
        e.preventDefault();


    })

    async function go(userIdFromGetUserOnDeleteForm) {
        console.log('Запуск go');
        let deleteUser = await fetch(`http://localhost:8080/admin/rest/delete/${userIdFromGetUserOnDeleteForm}`, {
                        method: 'DELETE'
                    });
        let clean = await cleanTable();  
        let xxx = await getData();  
        console.log('go function отработала');        
    }







