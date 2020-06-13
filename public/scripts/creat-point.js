function populatesUFs() {
    const ufselect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( const state of states ) {
            ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`  
        }
    })
}

populatesUFs()


function getCities(event) {
    const cityselect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const cityInput = document.querySelector("input[name=city]")

    const Ufvalue = event.target.value
    const Cityvalue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${Ufvalue}/municipios`
    
    
    cityselect.innerHTML = "<option value>Selecione a Cidade</option>"    
    cityselect.innerHTML = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for( const city of cities ) {
            cityselect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`  
        }

        cityselect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) 

    // Itens de coleta
    // pegar todos li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items]")

let SelectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    // adcionar ou remover classe com javascript
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

  // verificar se existem items selecionados, se sim,
    //pegar itens selecionados
    const alreadySelected  = SelectedItems.findIndex( item => {
        const itemFound = item == itemId //isso retorna verdadeiro ou falso
        return itemFound
    })

  
    //se já estiver selecionado, tirar da selecao
    if( alreadySelected >= 0) {
        const filteredItems = SelectedItems.filter( item => {
            const itemIsDifferente = item != itemId
            return itemIsDifferente
        })

        SelectedItems = filteredItems
    } else {
        //se não tiver selecionado, add a selecao
        SelectedItems.push(itemId)
    }
    //atualizar  o campo escondido com os dados selecionados
    collectedItems.value = SelectedItems
}