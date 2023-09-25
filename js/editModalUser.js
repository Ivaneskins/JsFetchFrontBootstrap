
// fill edit modal with user data

async function getEditModal(userId) {  
    console.log('Вызвана функция getEditModal');
    
    await fetch(`http://localhost:8080/admin/rest/${userId}`)
        .then(response => response.json())
        .then(user => {    
            console.log("getEditModal function started...");

            fillModalEditForm(userId);

            let modal = new bootstrap.Modal(document.querySelector('#editModal'));            
            modal.show();            
            
            let deleteModalId =document.getElementById('editModalId').value = user.id; 
            let deleteModalUsername = document.getElementById('editModalUsername').value = user.username;            
            let deleteModalLastName = document.getElementById('editModalLastName').value = user.lastname;            
            let deleteModalAge = document.getElementById('editModalAge').value = user.age;           
            let deleteModalEmail = document.getElementById('editModalEmail').value = user.email; 
            let editModalPassword = document.getElementById('editModalPassword').value = user.password;
          
            console.log("user = " + user.roles);
            rolesToString = '';
            for (let role of user.roles) {
                rolesToString += role.name.replace('ROLE_', '') + " ";                    
            }            
            let deleteModalRole = document.getElementById('editModalRole');
            deleteModalRole.innerHTML = "";

            //получение всех ролей и заполнение данными в edit form
            getAllRoles();          

            let btnDeleteModal = document.getElementById(`edit${user.id}`);  

            btnDeleteModal.addEventListener('click', function(e) {  
                console.log("edit vutton отработал");              
                e.preventDefault();
                editUserById(user.id);                                
                modal.hide();                
            })
        }
        
    )} 

// create HTML code of modal DELETE form
async function fillModalEditForm(userId) {
    let formModal = document.getElementById('formEdit');
    formModal.innerHTML = '';
    formModal.innerHTML = `
    <div class="form-group text-center">
        <label class="font-weight-bold" for="editModalId">Id</label>
        <input type="text" class="form-control" id="editModalId" name="id">
    </div>
    <div class="form-group text-center">
        <label class="font-weight-bold" for="editModalUsername">First name</label>
        <input type="text" class="form-control" id="editModalUsername" name="username">
    </div>
    <div class="form-group text-center">
        <label class="font-weight-bold" for="editModalLastName">Last name</label>
        <input type="text" class="form-control"  id="editModalLastName" name="lastname">
    </div>

    <div class="form-group text-center">
    <label class="font-weight-bold" for="editModalPassword">Password</label>
    <input type="password" class="form-control"  id="editModalPassword" name="password">
</div>

    <div class="form-group text-center">
        <label class="font-weight-bold" for="editModalAge">Age</label>
        <input type="text" class="form-control"  id="editModalAge" name="age">
    </div>

    <div class="form-group text-center">
        <label class="font-weight-bold" for="editModalEmail">Email</label>
        <input type="email" class="form-control"  id="editModalEmail" name="email">
    </div>

    <div class="form-group text-center">
        <label class="font-weight-bold" for="editModalRole">Role</label><br/>
        <select name="roles" class="form-select w-100 p-2" multiple aria-label="multiple select example" id="editModalRole">
            
        </select>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <input type="submit" id="edit${userId}" class="btn btn-primary" value="Edit"/>
        
    </div>`
}