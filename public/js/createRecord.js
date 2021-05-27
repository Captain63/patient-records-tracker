// Login form handler
async function createPatientRecordFormHandler(event) {
    event.preventDefault();

    // get the information from the login form

    const title = document.querySelector('#recordTitle').value.trim();
    const text = document.querySelector('#information').value.trim();
    // get the post id from the url
    const patient_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1]
    ;
    const patient_name = document.querySelector('#patientDisplayName').textContent;
    
    // if both fields have content
    if (title&& text) {
        // POST to the login route with the user information
        const response = await fetch('/api/records/', {
            method: 'post',
            body: JSON.stringify({
                patient_id,
                patient_name,
                title,
                text,
            }),
            headers: {'Content-Type': 'application/json'}
        });
        // when the fetch promise is fulfilled, check the response status; if the response is good, load the dashboard; if there is an error, alert with the status
        if (response.ok) {
            document.location.replace(`/api/patients/${patient_id}`);
        } else {
            let result = await response.json()
            alert(result.message)
        }
    } else {
        alert("Missing Information")
    }
}

document.querySelector('#createrecord').addEventListener('click', createPatientRecordFormHandler);