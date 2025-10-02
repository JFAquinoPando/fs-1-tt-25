/* const $ = function (selector) {
    return document.querySelector(selector)
} */

const $ = (selector) => document.querySelector(selector);
const formulario = $("form")


formulario.addEventListener("submit", async function(evento){
    evento.preventDefault();
    const datos = new FormData(formulario)
    const pokemon = datos.get("pokemon")
    
    const peticion = await fetch(`${formulario.action}/${pokemon}`)
  
    if (peticion.ok === false) {
        alert("Error en el nombre")
        return 
    }

    const resultado = await peticion.json()

    const planitilla = `<article class="border border-black rounded-xl">
                    <h1 class="px-4 pt-4">${resultado.name}</h1>
                    <figure class="px-4"><img class="mx-auto hover:scale-125 animate-bounce" src='${resultado.sprites.front_default}' alt='${resultado.name}'></figure>
                    <div class="bg-gray-800 p-4">
                        <div>
                            <strong>Peso (KG):</strong> <span>${resultado.weight}</span>
                        </div>
                        <div>
                            <strong>Altura (metros):</strong> <span>${resultado.height}</span>
                        </div>
                        <div>
                            <strong>Tipo/s:</strong> ${resultado.types.map(tipo => {
                                return `<span>${tipo.name}</span>`
                            }).join(" - ")}
                        </div>
                    </div>
                </article>`
            
    $("#pokedex").insertAdjacentHTML("beforeend", planitilla)

    

});
