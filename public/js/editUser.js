// A function to edit a post
async function updateUserHandler(event) {
    event.preventDefault();

    // Get the user name, user id, email, and password from the form
    let name = document.querySelector('#name').value.trim();
    let email = document.querySelector('#email').value.trim();
    let password = document.querySelector('#password').value.trim();
    let address = document.querySelector('#locationzip').value.trim();
    let location_zip = document.querySelector('#locationzip').value.trim();
    let id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    // use the update route to update the post
    const response = await fetch(`/api/users/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            email,
            password,
            address, 
            location_zip,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    });
    // if the edit action is successful, redirect to the dashboard page, otherwise display the error
    if (response.ok) {
        document.location.replace('/');
        // otherwise, display the error
        } else {
        alert(response.statusText);
        }
    }
  
  document.querySelector('#updateUser').addEventListener('click', updateUserHandler);