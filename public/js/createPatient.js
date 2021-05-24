// Login form handler
async function createPatientFormHandler(event) {
 

    // get the information from the login form
    const name = document.querySelector('#patientName').value.trim();
    const birth_date = document.querySelector('#birth_date').value.trim();
    const email = document.querySelector('#paitentEmail').value.trim();
    const address = document.querySelector('#patientAddress').value.trim();
    const location_zip = document.querySelector('#location_zip').value.trim();
    const doctor_id = document.querySelector('#doctor_id').value.trim();
    
    // if both fields have content
    if (name && birth_date && email && address && location_zip && doctor_id) {
        // POST to the login route with the user information
        const response = await fetch('/api/patients/', {
            method: 'post',
            body: JSON.stringify({
                name,
                birth_date,
                email,
                address,
                location_zip,
                doctor_id
            }),
            headers: {'Content-Type': 'application/json'}
        });
        // when the fetch promise is fulfilled, check the response status; if the response is good, load the dashboard; if there is an error, alert with the status
        if (response.ok) {
            document.location.replace('/');
        } else {
            let result = await response.json()
            alert(result.message)
        }
    }
}

document.querySelector('#createpatient').addEventListener('click', createPatientFormHandler);