let pagina = 1
const $botonAnterior = document.querySelector('#btnAnterior')
const $botonSiguiente = document.querySelector('#btnSiguiente')

$botonSiguiente.addEventListener('click', () =>{
  if(pagina < 1000){
    pagina = pagina + 1
    cargarPeliculas()
  }
})

$botonAnterior.addEventListener('click', () =>{
  if(pagina > 1){
    pagina = pagina - 1
    cargarPeliculas()
  }
})


const cargarPeliculas = async () => {

  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=1e84ad088abbfb830873caa56c30c93d&language=es-MX&page=${pagina}`)
    console.log(response)

    if (response.status === 200) {
      const datos = await response.json()

      let peliculas = ''
      datos.results.forEach(pelicula => {
        peliculas = peliculas + `
        <div class='pelicula'>
          <img class='poster' src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="" />
          <h3 class='titulo'> ${pelicula.title} </h3>
        </div>
        `
      })

      document.querySelector('#contenedor').innerHTML = peliculas

    } else if (response.status === 401) {
      console.log('error en la digitacion de la clave')
    } else if (response.status === 404) {
      console.log('la pelicula que buscas no existe')
    } else {
      console.log('hubo un error diferente')
    }


  }
  catch (err) {
    console.log(err)
  }
}

cargarPeliculas()