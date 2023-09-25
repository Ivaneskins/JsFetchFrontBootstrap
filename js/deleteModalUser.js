
// fill delete modal with user data

async function getUserOnDeleteForm(userId) {  
    console.log('Вызвана функция getUserOnDeleteForm');
    
    await fetch(`http://localhost:8080/admin/rest/${userId}`)
        .then(response => response.json())
        .then(user => {    
            console.log("getUserOnDeleteForm function started...");

            fillModalForm(userId);


            let modal = new bootstrap.Modal(document.querySelector('#deleteModal'));
            // let modal = new bootstrap.Modal();
            modal.show();            
            
            let deleteModalId =document.getElementById('deleteModalId').value = user.id; 
            let deleteModalUsername = document.getElementById('deleteModalUsername').value = user.username;            
            let deleteModalLastName = document.getElementById('deleteModalLastName').value = user.lastname;            
            let deleteModalAge = document.getElementById('deleteModalAge').value = user.age;           
            let deleteModalEmail = document.getElementById('deleteModalEmail').value = user.email; 
          
            console.log("user = " + user.roles);
            rolesToString = '';
            for (let role of user.roles) {
                rolesToString += role.name.replace('ROLE_', '') + " ";                    
            }            
            let deleteModalRole = document.getElementById('deleteModalRole');
            deleteModalRole.innerHTML = "";
            let opt = document.createElement('option');
            opt.text = rolesToString;
            deleteModalRole.appendChild(opt);             

            let btnDeleteModal = document.getElementById(user.id);  

            btnDeleteModal.addEventListener('click', function(e) {                
                e.preventDefault();
                deleteUserById(user.id);                                
                modal.hide();                
            })
        }
        
    )} 




async function fillModalForm(userId) {
    let formModal = document.getElementById('formDelete');
    formModal.innerHTML = '';
    formModal.innerHTML = `
    <div class="form-group text-center">
    <label class="font-weight-bold" for="deleteModalId">Id</label>
    <input type="text" disabled class="form-control" id="deleteModalId">
</div>
<div class="form-group text-center">
    <label class="font-weight-bold" for="deleteModalUsername">First name</label>
    <input type="text" disabled class="form-control" id="deleteModalUsername" name="username">
</div>
<div class="form-group text-center">
    <label class="font-weight-bold" for="deleteModalLastName">Last name</label>
    <input type="text" disabled class="form-control"  id="deleteModalLastName" name="lastname">
</div>

<div class="form-group text-center">
    <label class="font-weight-bold" for="deleteModalAge">Age</label>
    <input type="text" disabled class="form-control"  id="deleteModalAge" name="age">
</div>

<div class="form-group text-center">
    <label class="font-weight-bold" for="deleteModalEmail">Email</label>
    <input type="email" disabled class="form-control"  id="deleteModalEmail" name="email">
</div>

<div class="form-group text-center">
    <label class="font-weight-bold" for="deleteModalRole">Role</label><br/>
    <select name="roles" disabled class="form-select w-100 p-2" multiple aria-label="multiple select example" id="deleteModalRole">
        
    </select>
</div>
<div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    <input type="submit" id="${userId}" class="btn btn-danger" value="Delete"/>
    
</div>`
}