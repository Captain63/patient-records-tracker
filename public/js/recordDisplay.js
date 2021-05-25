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

// Search bar logic

// Tag search bar
const searchBar = document.querySelector("#search-bar");

// Creates array of all searchable fields from patient records
const searchNames = Array.from(document.querySelectorAll(".search.name"));

// Adds a new property .textValue to each item that's lower case for easy comparison with search query
searchNames.forEach(item => {
    item.textValue = item.textContent.toLowerCase();
})


const search = (event) => {
    // Captures string entered into input
    const query = event.target.value.toLowerCase();

    // Finds list items that match
    const matchArray = searchNames.filter(item => item.textValue.includes(query));

    // Finds list items that DON'T match
    const noMatchArray = searchNames.filter(item => !item.textValue.includes(query));

    console.log(matchArray);
    console.log(noMatchArray);

    // Displays those that do match -- has opposite class to 
    matchArray.forEach(item => {
        // References container for each search item
        item.closest(".userPatientsContainer").classList.add("show");
        item.closest(".userPatientsContainer").classList.remove("hide");
    })

    // Hides those that don't match
    noMatchArray.forEach(item => {
        item.closest(".userPatientsContainer").classList.add("hide");
        item.closest(".userPatientsContainer").classList.remove("show");
    })
}

// Attach search function to searchBar as event listener for each key press
searchBar.addEventListener("keyup", search);