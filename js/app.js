const url = (pageNumber) => {
    return `https://reqres.in/api/users?page=${pageNumber}`
} 

const peopleContainer = document.querySelector('[data-js="js-people-container"]')
const personLoreContainer = document.querySelector('[data-js="js-person-lore"]')

const prevAndNextButtonsContainer = document.querySelector('#prev-and-next-nuttons-container')

let pages = 1

const copyContentDetials = personId => {
    fetch(url()).then(response => {
        return response.json()
    }).then(peopleInformations => {
        const data = peopleInformations.data
        const idFound = data[personId - 1]
        const firstName = idFound.first_name
        const lastName = idFound.last_name
        const email = idFound.email
        
        const dataArray = [personId, firstName, lastName, email].join(', ')
        return navigator.clipboard.writeText(dataArray)
    })
}

const fetchMoreResults = (page) => {
    fetch(`${url(page)}`).then(response => {
        return response.json()
    }).then(peopleInformations => {
            peopleContainer.innerHTML = peopleInformations.data.map((person) => {
            const id = person.id
            const firstName = person.first_name
            const lastName = person.last_name
            const email = person.email
            const avatar = `https://reqres.in/img/faces/${id}-image.jpg`

            return `<li class="person-profile" data-user="${id}">
                <img src="${avatar}" class="person-image"></img>
                <div class="person-lore" data-js="js-person-lore">
                    <h1 data-id="person-id">${id}</h1>
                    <h1 class="person-name">${firstName} ${lastName}</h1>
                    <h1 class="person-email">${email}</h1>
                </div>
                <div class="buttons">
                    <button type="button" class="more-details" onclick="copyContentDetials(${id})">
                        <span class="text">Copy user details</span>
                        <i class="material-icons icon">check</i>
                    </button>
                </div>
            </li>`
        }).join('')

        let pages = 1
        if(peopleInformations.page != peopleInformations.total_pages) {
            pages++
            prevAndNextButtonsContainer.innerHTML = `<button id="next" onclick="fetchMoreResults(${pages})">See more people</button>`
        } else {
            prevAndNextButtonsContainer.innerHTML = `<button id="prev" onclick="fetchMoreResults(${--pages})">Previous</button>`
        }
    })
}

const fecthUserData = () => {
    fetch(url(1))
    .then(response => {
        return response.json()
    }).then(peopleInformations => {

        console.log(peopleInformations.total_pages)
        console.log(peopleInformations)
        console.log(peopleInformations.page != peopleInformations.total_pages)

        peopleContainer.innerHTML = peopleInformations.data.map((person) => {
            const id = person.id
            const firstName = person.first_name
            const lastName = person.last_name
            const email = person.email
            const avatar = `https://reqres.in/img/faces/${id}-image.jpg`

            return `<li class="person-profile" data-user="${id}">
                <img src="${avatar}" class="person-image"></img>
                <div class="person-lore" data-js="js-person-lore">
                    <h1 data-id="person-id">${id}</h1>
                    <h1 class="person-name">${firstName} ${lastName}</h1>
                    <h1 class="person-email">${email}</h1>
                </div>
                <div class="buttons">
                    <button type="button" class="more-details" onclick="copyContentDetials(${id})">
                        <span class="text">Copy user details</span>
                        <i class="material-icons icon">check</i>
                    </button>
                </div>
            </li>`
        })
        
        let pages = 1
        if(peopleInformations.page != peopleInformations.total_pages) {
            pages++
            prevAndNextButtonsContainer.innerHTML = `<button id="next" onclick="fetchMoreResults(${pages})">See more people</button>`
        } else {
            prevAndNextButtonsContainer.innerHTML = `<button id="prev" onclick="fetchMoreResults(${--pages})">Previous</button>`
        }
    })
}

fecthUserData()