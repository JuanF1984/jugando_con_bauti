const loader = document.getElementById('loader');
const sujetosDiv = document.getElementById('sujetos');
const pictogramasDiv = document.getElementById('pictogramas');
const textoOracionP = document.getElementById('textoOracion');

const sujetos = ['caballo', 'perro', 'gato', 'niño', 'niña','pájaro', 'conejo', 'hamster', 'colibri', 'tortuga'];
const acciones = ['jugar', 'correr', 'dormir', 'comer', 'saltar'];
const lugares = ['bosque', 'parque', 'casa', 'campo', 'playa'];

async function inicializar() {
  const fila = crearBotonesSujetos(sujetos, sujetosDiv);

  await Promise.all([fila]);

  loader.style.display = 'none';
  sujetosDiv.style.display = 'block';
}

async function crearBotonesSujetos(sujetos, contenedor) {
  const fragment = document.createDocumentFragment();
  for (const sujeto of sujetos) {
    const pictogramaUrl = await obtenerPictograma(sujeto);
    if (pictogramaUrl) {
      const button = document.createElement('button');
      button.innerHTML = `<img src="${pictogramaUrl}" alt="${sujeto}" class="sujeto">`;
      button.onclick = () => generarOracion(sujeto, button);
      fragment.appendChild(button);
    }
  }
  contenedor.appendChild(fragment);
}

async function generarOracion(sujeto, botonPresionado) {
  const botones = document.querySelectorAll('.fila-sujetos button');
  botones.forEach(boton => boton.disabled = true);
  scrollToBottom();
  loader.style.display = 'flex';
  pictogramasDiv.style.display = 'none';
  textoOracionP.style.display = 'none';

  pictogramasDiv.innerHTML = '';
  textoOracionP.textContent = '';

  const accion = acciones[Math.floor(Math.random() * acciones.length)];
  const lugar = lugares[Math.floor(Math.random() * lugares.length)];
  const oracionBusqueda = [sujeto, accion, lugar];
  const oracionMostrar = [
    elegirArticulo(sujeto, true),
    sujeto,
    conjugarVerbo(accion, sujeto),
    elegirArticulo(lugar, false),
    lugar
  ];

  try {
    for (const palabra of oracionBusqueda) {
      const pictogramaUrl = await obtenerPictograma(palabra);
      if (pictogramaUrl) {
        const img = document.createElement('img');
        img.src = pictogramaUrl;
        img.alt = palabra;
        img.className = 'pictograma';
        pictogramasDiv.appendChild(img);
      }
    }
    textoOracionP.textContent = oracionMostrar.join(' ');
  } catch (error) {
    console.error('Error al generar la oración:', error);
    textoOracionP.textContent = 'Ocurrió un error al generar la oración. Por favor, inténtalo de nuevo.';
  } finally {
    botones.forEach(boton => boton.disabled = false);
    pictogramasDiv.style.display = 'flex';
    textoOracionP.style.display = 'block';
    loader.style.display = 'none';
  }
}

function conjugarVerbo(verbo, sujeto) {
  const conjugaciones = {
    'jugar': 'juega',
    'correr': 'corre',
    'dormir': 'duerme',
    'comer': 'come',
    'saltar': 'salta'
  };
  return conjugaciones[verbo] || verbo;
}

function elegirArticulo(palabra, esSujeto) {
  if (palabra.toLowerCase().endsWith('a')) {
    return esSujeto ? 'La' : 'en la';
  } else {
    return esSujeto ? 'El' : 'en el';
  }
}

async function obtenerPictograma(palabra) {
  try {
    const response = await fetch(`https://api.arasaac.org/api/pictograms/es/search/${palabra}`);
    const data = await response.json();
    if (data.length > 0) {
      return `https://static.arasaac.org/pictograms/${data[0]._id}/${data[0]._id}_300.png`;
    }
    return null;
  } catch (error) {
    console.error('Error al obtener el pictograma:', error);
    return null;
  }
}

function scrollToBottom() {
  window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
  });
}

window.onload = inicializar;