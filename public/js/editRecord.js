// Login form handler
async function editRecordFormHandler(event) {
    event.preventDefault();

    // get the information from the login form

    const title = document.querySelector('#recordTitle').value.trim();
    const text = document.querySelector('#information').value.trim();
    // get the post id from the url
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1]
    ;

    // if both fields have content
    if (title && text) {
        // POST to the login route with the user information
        const response = await fetch(`/api/records/update/${id}`, {
            method: 'put',
            body: JSON.stringify({
                title,
                text,
            }),
            headers: {'Content-Type': 'application/json'}
        });
        // when the fetch promise is fulfilled, check the response status; if the response is good, load the dashboard; if there is an error, alert with the status
        if (response.ok) {
            document.location.replace(`/api/records/edit/${id}`);
            alert("Record has been updated!")
        } else {
            let result = await response.json()
            alert(result.message)
        }
    } else {
        alert("Missing Information")
    }
}

document.querySelector('#updateRecord').addEventListener('click', editRecordFormHandler);