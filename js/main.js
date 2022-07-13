const prel = document.querySelector('#prel')
const app = document.querySelector('#app')
const leftPlace = '<div class="leftPlace"></div>'
const rightPlace = '<div class="rightPlace"></div>'
app.insertAdjacentHTML('afterbegin', leftPlace + rightPlace);

function progres_bar(i) {
    prel.style.width = (i * 100) + 'px'

    prel.style.backgroundColor = "yellow"
}

function view(res) {

    let html = "<div>"

    for (let ob of res) {
        html += "<div  class='leftItem'>" + ob.name + "<input type='checkbox' name='info' value=" + ob.url + "></div>"
    }
    html += "</div>"

    document.querySelector(".leftPlace").innerHTML = html

    document.querySelectorAll("input[name='info']").forEach(el => el.addEventListener('click', listener))
}


res = []

async function planets() {

    try {
        for (let i = 1; i < 10; i++) {
            let response = await axios.get("https://swapi.dev/api/planets/" + i + "/")
            res.push(response.data)
            progres_bar(i)
        }

        prel.style.display = "none"
        
        view(res)

    } catch (error) {
        console.error(error)
    }
}


function viewInfo(obj) {

    let residents = obj.residents !== 'undefined' ? createSubDataDiv(obj.residents) : obj.residents

    let films = obj.films !== 'undefined' ? createSubDataDiv(obj.films) : obj.films

    return `<div>
    <span>climate: ${obj.climate}</span>
    <span>created: ${obj.created}</span><br/>
    <span>diameter: ${obj.diamete}</span><br/>
    <span>edited: ${obj.edited}</span><br/>
    <div class="bigContent">films: ${films}</div>
    <span>gravity: ${obj.gravity}</span><br/>
    <span>name: ${obj.name}</span><br/>
    <span>orbital_period: ${obj.orbital_period}</span><br/>
    <span>population: ${obj.population}</span><br/>
    <div class="bigContent">residents: ${residents}</div>
    <span>rotation_period: ${obj.rotation_period}</span><br/>
    <span>surface_water: ${obj.surface_water}</span><br/>
    <span>terrain: ${obj.terrain}</span><br/>
    <span>url: ${obj.url}</span><br/>
    </div>`
}


function listener() {

    let url = this.value

    document.querySelectorAll("input[name='info']").forEach(el => {
        if (el != this) {
            el.checked = false
        }
    })

    let obj = res.find(el => el.url === url)

    document.querySelector(".rightPlace").innerHTML = viewInfo(obj)
}


function createSubDataDiv(arr) {

    let div = "<div class='subBigClass'>"
    let index = arr.length

    for (let ar of arr) {
        index--
        if (index == 0) {
            div += "<span>" + ar + "</span>"
        } else {
            div += "<span>" + ar + "</span><br/>"
        }
    }
    div += "</div>"
    return div
}

planets()