// A function to delete a post
async function deleteRecordHandler(event) {
    event.preventDefault();

    // get the post id from the url
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
        ];
    // delete the post with an async function
    const response = await fetch(`/api/records/delete/${id}`, {
        method: 'DELETE'
      });
    // if the delete action is successful, redirect to the dashboard page, otherwise display the error
    if (response.ok) {
        document.location.replace('/');
        // otherwise, display the error
      } else {
        alert(response.statusText);
      }
  }
  
  document.querySelector('#deleteRecord').addEventListener('click', deleteRecordHandler);