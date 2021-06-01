// Login form handler
async function recordDisplayFormHandler(event) {
    event.preventDefault();


        // POST to the login route with the user information
        const response = await fetch('/api/records/:patient_id', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });
        // when the fetch promise is fulfilled, check the response status; if the response is good, load the dashboard; if there is an error, alert with the status
        if (response.ok) {
            document.location.replace('/records/:id');
        } else {
            let result = await response.json()
            alert(result.message)
        }
}

document.querySelector('#recordDisplay').addEventListener('submit', recordDisplayFormHandler);