// Search bar logic

// Display search bar on relevant pages
document.querySelector("#search").classList.remove("hide");

// Tag search bar
const searchBar = document.querySelector("#search-bar");

// Creates array of all searchable fields from patient records
const searchArray = Array.from(document.querySelectorAll(".userPatientsContainer"));

for (let i = 0; i < searchArray.length; i++) {
    // Creates empty strings property to hold retrieved values for All search
    searchArray[i].strings = [];

    for (let j = 0; j < searchArray[i].children.length; j++) {
        // Retrives inner text of each field under each record container
        const string = searchArray[i].children[j].innerText.toLowerCase();

        // Pushes string to strings array property
        searchArray[i].strings.push(string);

        for (let y = 0; y < searchArray[i].children[j].classList.length; y++) {
            // Iterates through classList of divs beneath record seeking "patient-name" class
            if (searchArray[i].children[j].classList[y] === "patient-name") {
                // Assigns patientName property to corresponding container
                searchArray[i].patientName = searchArray[i].children[j].innerText.toLowerCase();
            }

            // Iterates through classList of divs beneath record seeking "record-subject" class
            if (searchArray[i].children[j].classList[y] === "record-subject") {
                // Assigns recordSubject property to corresponding container
                searchArray[i].recordSubject = searchArray[i].children[j].innerText.toLowerCase();
            }
        }
    }

    // Combines individual strings into combined searchString value for each record for easy referencing under displayResults
    searchArray[i].searchString = searchArray[i].strings.join(" ");
}

// Function for filtering out non-matching results on page
const displayResults = (array, property, query) => {
    // Finds list items that DON'T match
    // Swap to textValue property if doing the simple example
    const matchArray = array.filter(item => item[property].includes(query));

    // Finds list items that DON'T match
    const noMatchArray = array.filter(item => !item[property].includes(query));

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

const searchQuery = (event) => {

    // Captures string entered into input
    const query = event.target.value.toLowerCase();

    const category = document.querySelector("#search #categories").value;

    if (category === "All") {

        displayResults(searchArray, "searchString", query);

    } else if (category === "Patient Name") {

        displayResults(searchArray, "patientName", query);
        
    } else if (category === "Record Subject") {

        displayResults(searchArray, "recordSubject", query);

    }
}

// Assigns event listener each time key is entered into input
searchBar.addEventListener("keyup", searchQuery);