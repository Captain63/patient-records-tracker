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
const searchArray = Array.from(document.querySelectorAll(".userPatientsContainer"));

console.log(searchArray);

for (let i = 0; i < searchArray.length; i++) {
    searchArray[i].strings = [];
    for (let j = 0; j < searchArray[i].children.length; j++) {
        const string = searchArray[i].children[j].innerText.toLowerCase();
        searchArray[i].strings.push(string);
    }
    searchArray[i].searchString = searchArray[i].strings.join(" ");
}

console.log(searchArray);

const searchQuery = (event) => {

    // Captures string entered into input
    const query = event.target.value.toLowerCase();

    // Finds list items that DON'T match
    // Swap to textValue property if doing the simple example
    const matchArray = searchArray.filter(item => item.searchString.includes(query));

    // Finds list items that DON'T match
    const noMatchArray = searchArray.filter(item => !item.searchString.includes(query));

    // console.log(matchArray);
    // console.log(noMatchArray);

    // Displays those that do match
    matchArray.forEach(item => {
        item.classList.add("show");
        item.classList.remove("hide");
    })

    // Hides those that don't match
    noMatchArray.forEach(item => {
        item.classList.add("hide");
        item.classList.remove("show");
    })
}

// Assigns event listener each time key is entered into input
searchBar.addEventListener("keyup", searchQuery);