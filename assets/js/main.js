const loadMore = document.getElementById('loadMore');
const pokemonList = document.getElementById('pokemonList');
const maxRecords = 151;
let offset = 0;
const limit = 10;



function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
       const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type} " id="pokemon">
            <span class="number" id="${pokemon.number}">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((types) => `<li class="type ${types}">${types}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"  alt="${pokemon.name}">
            </div>
            <div class="moreInformation "> 
                <ul>
                    <li id="more">
                        +
                    </li>   
                    <ul class="submenu">
                        <li>
                            <span>Height: ${pokemon.height}</span><br>
                            <span>ability: ${pokemon.ability}</span><br>
                            <span>weight: ${pokemon.weight}</span><br>
                            <span>base experience: ${pokemon.base_experience}</span>
                        </li>
                    </ul>
                </ul>
            </div>
        </li>
        `).join('');
        pokemonList.innerHTML += newHtml; 
       
        const menuItems = document.querySelectorAll('li');
        const moreInfor = document.getElementById('more')
        menuItems.forEach(item => {
          const submenu = item.querySelector('.submenu');
            if (submenu) {
                item.addEventListener('click', () => {
                submenu.classList.toggle('visible');
                });
            }
        });
    });
};


loadPokemonItens(offset, limit);


loadMore.addEventListener('click', ()=> {
    offset+=limit;

    //debugger

    const qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit =  maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMore.parentElement.removeChild(loadMore);
    }else {
        loadPokemonItens(offset, limit);
    }

});
