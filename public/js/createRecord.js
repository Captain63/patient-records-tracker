// Login form handler
async function createRecordFormHandler(event) {
 

    // get the information from the login form
    const patient_id = document.querySelector('#patientID').value.trim();
    const patient_name = document.querySelector('#patientName').value.trim();
    const title = document.querySelector('#recordTitle').value.trim();
    const text = document.querySelector('#information').value.trim();
    const user_id = document.querySelector('#userID').value.trim();
    
    // if both fields have content
    if (patient_id && patient_name && title&& text && user_id) {
        // POST to the login route with the user information
        const response = await fetch('/api/records/', {
            method: 'post',
            body: JSON.stringify({
                patient_id,
                patient_name,
                title,
                text,
                user_id
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

document.querySelector('#createrecord').addEventListener('click', createRecordFormHandler);