//reformat roles from field to object for saving in rest app
function reformatRolesToSaveInObject(userData) {

    let roles = [];
    switch (userData.roles) {
        case '1' : {roles[0] = {
            'id' : 1,
            'name' : 'ROLE_USER'
            }                        
            break;
        }
        case '2' : {roles[0] = {
            'id' : 2,
            'name' : 'ROLE_ADMIN'
            }                        
            break;
        }
        case '3' : {roles[0] = {
            'id' : 3,
            'name' : 'ROLE_OTHER'
            }                        
            break;
        }   
        default : console.log("default branch");            
    }
    return roles;
}

function cleanNewUserForm() {
    let userName = document.getElementById('userName').value = '';
    let lastName = document.getElementById('lastName').value = '';
    let age = document.getElementById('age').value = '';
    let Email = document.getElementById('email').value = '';
    let password = document.getElementById('password').value = '';
}


