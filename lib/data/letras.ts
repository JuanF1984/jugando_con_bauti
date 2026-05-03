export type ItemLetra = {
  letra: string;
  slug?: string;
  palabra: string;
  imagen: string;
  palabraAlt?: string;  // alternate word shown when profile is "otro"
  imagenAlt?: string;   // alternate image shown when profile is "otro"
  audio?: string;
};

export function getSlug(item: ItemLetra): string {
  return item.slug ?? item.letra.toLowerCase();
}

export const letras: ItemLetra[] = [
  { letra: "A", palabra: "avión",      imagen: "/img/letra/avion.png" },
  { letra: "B", palabra: "bauti",      imagen: "/img/letra/bauti.jpeg",  palabraAlt: "barco",  imagenAlt: "/img/letra/barco.png" },
  { letra: "C", palabra: "casa",       imagen: "/img/letra/casa.png" },
  { letra: "D", palabra: "dinosaurio", imagen: "/img/letra/dinosaurio.png" },
  { letra: "E", palabra: "elefante",   imagen: "/img/letra/elefante.jpg" },
  { letra: "F", palabra: "fantasma",   imagen: "/img/letra/fantasma.jpg" },
  { letra: "G", palabra: "gato",       imagen: "/img/letra/gato.jpg" },
  { letra: "H", palabra: "helado",     imagen: "/img/letra/helado.jpg" },
  { letra: "I", palabra: "iguana",     imagen: "/img/letra/iguana.jpg" },
  { letra: "J", palabra: "jirafa",     imagen: "/img/letra/jirafa.jpg" },
  { letra: "K", palabra: "koala",      imagen: "/img/letra/koala.jpg" },
  { letra: "L", palabra: "luna",       imagen: "/img/letra/luna.jpg" },
  { letra: "M", palabra: "mamá",       imagen: "/img/letra/mama.webp",  palabraAlt: "manzana", imagenAlt: "/img/letra/manzana.jpg" },
  { letra: "N", palabra: "naranja",    imagen: "/img/letra/naranja.jpg" },
  { letra: "Ñ", slug: "enie", palabra: "ñandú", imagen: "/img/letra/%C3%B1andu.jpg" },
  { letra: "O", palabra: "oso",        imagen: "/img/letra/oso.jpg" },
  { letra: "P", palabra: "papá",       imagen: "/img/letra/papa.jpg",   palabraAlt: "perro",  imagenAlt: "/img/letra/perro.jpg" },
  { letra: "Q", palabra: "queso",      imagen: "/img/letra/queso.jpg" },
  { letra: "R", palabra: "rana",       imagen: "/img/letra/rana.jpg" },
  { letra: "S", palabra: "serpiente",  imagen: "/img/letra/serpiente.jpg" },
  { letra: "T", palabra: "tortuga",    imagen: "/img/letra/tortuga.jpg" },
  { letra: "U", palabra: "uva",        imagen: "/img/letra/uva.jpg" },
  { letra: "V", palabra: "vaca",       imagen: "/img/letra/vaca.jpg" },
  { letra: "W", palabra: "waffle",     imagen: "/img/letra/wafle.jpg" },
  { letra: "X", palabra: "xilófono",   imagen: "/img/letra/xilofono.jpg" },
  { letra: "Y", palabra: "yoyo",       imagen: "/img/letra/yoyo.jpg" },
  { letra: "Z", palabra: "zapatillas", imagen: "/img/letra/zapatilla.jpg" },
];
