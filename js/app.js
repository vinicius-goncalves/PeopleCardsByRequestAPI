//
// ! How the ReqresAPI only have two examples pages, I made the app with this logic that you can see
// 

const peopleContainer = document.querySelector('[data-js="js-people-container"]')
const personLoreContainer = document.querySelector('[data-js="js-person-lore"]')
const prevAndNextButtonsContainer = document.querySelector('#prev-and-next-nuttons-container')
const loaderContainer = document.querySelector('#loader-container')

window.addEventListener('load', () => {
    setTimeout(() => {
        loaderContainer.style.display = 'none'
    }, 1.5 * 1000)
})

const url = (searchPage) => {
    return `https://reqres.in/api/users?page=${searchPage}`
}

const copyContentDetails = (id, first_name) => {
    const dataArray = [id, first_name].join(', ')
    return navigator.clipboard.writeText(dataArray)
}

const insertIntoHTML = dataReceived => {
    
    peopleContainer.innerHTML = dataReceived.data.map((person) => {

        const { id, first_name, last_name, email } = person
        const peopleDetails = [id, first_name, last_name, email].join(', ')

        const avatar = `https://reqres.in/img/faces/${id}-image.jpg`

        return `<li class="person-profile" data-user="${id}">
                <img src="${avatar}" class="person-image"></img>
                <div class="person-lore" data-js="js-person-lore">
                    <h1 data-id="person-id">${id}</h1>
                    <h1 class="person-name">${first_name} ${last_name}</h1>
                    <h1 class="person-email">${email}</h1>
                </div>
                <div class="buttons">
                    <button type="button" class="more-details" onclick="navigator.clipboard.writeText('${peopleDetails}')">
                        <span class="text">Copy user details</span>
                        <i class="material-icons icon">check</i>
                    </button>
                </div>
            </li>`
    })

    const totalPagesVerify = dataReceived.page != dataReceived.total_pages
    prevAndNextButtonsContainer.innerHTML = 
    `${totalPagesVerify 
        ? 
        `<button id="next" onclick="fetchMoreResults(2)">See more people</button>` 
        : 
        `<button id="next" onclick="fetchMoreResults(1)">Previous</button>`}`

}

const fetchMoreResults = async (pageIndex) => {
    document.documentElement.scrollTop = 0

    const responseRequest = await fetch(url(pageIndex))
    const dataReceived = await responseRequest.json()

    insertIntoHTML(dataReceived)
}

const fecthUserData = async (pageIndex) => {

    const responseRequest = await fetch(url(pageIndex))
    const dataReceived = await responseRequest.json()

    insertIntoHTML(dataReceived)
}

fecthUserData(1)