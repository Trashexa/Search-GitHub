const APIURL = 'https://api.github.com/users/	';

const main = document.getElementById('main');
const form = document.getElementById('form');
const buscar = document.getElementById('buscar');

async function getUsuario(nombreUsuario){
	try{
		const {data} = await axios(APIURL + nombreUsuario)

		crearTarjetaUsuario(data);
		getRepos(nombreUsuario);
	} catch (err){
		if (err.response.status == 404) {
			crearTarjetaError('No hay un perfil con ese nombre de Usuario');
		}
	}
}

async function getRepos(nombreUsuario) {
  try {
    const { data } = await axios(APIURL + nombreUsuario + '/repos?sort=created');
    addReposToCard(data);
  } catch (err) {  
      crearTarjetaError('Hubo un problema al obtener los repositorios.');
    }
  }


function crearTarjetaUsuario(usuario){
	const usuarioID = usuario.name || usuario.login;
	const usuarioBio = usuario.bio ? `<p>${usuario.bio}</p>`:'';
	const tarjetaHTMl = `
	<div class= "tarjeta">
		<div>
			<img src="${usuario.avatar_url}" alt="${usuario.name}" class="avatar">
		</div>
		<div class="usuario.info">
				<h2>${usuarioID}</h2>
				${usuarioBio}
			<ul>
				<li>${usuario.followers} <strong>Seguidores</strong></li>
				<li>${usuario.following} <strong>Siguiendo</strong></li>
				<li>${usuario.public_repos} <strong>Repositorios</strong></li>
			</ul>

			<div id="repos"></div>
		</div>
	</div>
	`;
	main.innerHTML = tarjetaHTMl;
}

function crearTarjetaError(msg){
	const tarjetaHTMl= `
		<div class="tarjeta">
			<h1>${msg}</h1>
		</div>
	`
	main.innerHTML = tarjetaHTMl;
}

function addReposToCard(repos) {
	const reposE1 = document.getElementById('repos');

	repos
		.slice(0, 5)
		.forEach(repo =>{
			const repoE1 = document.createElement('a');
			repoE1.classList.add('repo');
			repoE1.href = repo.html_url;
			repoE1.target = '_blank';
			repoE1.innerText = repo.name;

			reposE1.appendChild(repoE1);
		})
}

form.addEventListener('submit', (e)=>{
	e.preventDefault()

	const usuario = buscar.value;

	if(usuario){
		getUsuario(usuario)

		buscar.value= '';
	}
})