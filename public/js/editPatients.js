// A function to edit a post
async function updatePatientHandler(event) {
    event.preventDefault();

    // Get the user name, user id, email, and password from the form
    let name = document.querySelector('#patientname').value.trim();
    let birth_date = document.querySelector('#birthdate').value.trim();
    let address = document.querySelector('#address').value.trim();
    let email = document.querySelector('#email').value.trim();
    let doctor_name = document.querySelector('#doctorname').value.trim();
    let location_zip = document.querySelector('#locationzip').value.trim();
    let id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    // use the update route to update the post
    const response = await fetch(`/api/patients/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            birth_date,
            address,
            email,
            doctor_name,
            location_zip
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
  
  document.querySelector('#updatePatient').addEventListener('click', updatePatientHandler);