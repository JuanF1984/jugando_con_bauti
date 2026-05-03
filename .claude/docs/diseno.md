# Jugando con Bauti — Brief de diseño y estructura

Este documento es la fuente de verdad para el rediseño y migración del sitio a Next.js 15 + TypeScript + Tailwind. Es referencia viva: cuando se sumen juegos o se ajuste el sistema, este archivo se actualiza primero.

## Contexto y propósito

Sitio de juegos educativos. Empezó como herramienta para acompañar los primeros pasos del lenguaje de un chico autista. Hoy el sitio sigue creciendo en dos direcciones: los juegos originales (letras, números, memoria, oraciones, asociación) que pueden seguir sirviendo a otros chicos en esa etapa, y juegos nuevos para etapas más avanzadas que se irán sumando.

El sitio se estructura por **tipo de contenido**, no por edad. Cada categoría puede crecer adentro con juegos de complejidad variable.

## Principios de diseño

El público incluye chicos en proceso de adquisición de lenguaje, algunos con neurodivergencia. Eso impone restricciones que aplican a todo el sitio:

- Estímulo visual contenido. Un solo color saturado por pantalla (el del juego activo), todo lo demás en tonos calmos.
- Animaciones solo como respuesta a acción del usuario. Nada se mueve solo.
- Sin sonidos automáticos al cargar páginas.
- Áreas de interacción generosas, bordes redondeados.
- Feedback predecible: una acción produce una respuesta visible, sin sorpresas.
- Tipografías muy legibles, alta altura de x.
- Mucho espacio en blanco entre elementos.
- Contraste alto para lectura, sin blanco/negro puros.

Tono general: calidez sin infantilización. Las cosas están hechas con cuidado, sin la energía publicitaria de los sitios infantiles típicos.

## Sistema visual

### Tipografías

Cargar desde `next/font/google`:

- **Atkinson Hyperlegible** (pesos 400 y 700): toda la UI, navegación, descripciones, cuerpo de texto, instrucciones cortas.
- **Fraunces** (pesos 500, 600, 700): títulos de página, nombres de juegos, letras y palabras grandes dentro de los juegos, números grandes.

```ts
// app/fonts.ts
import { Atkinson_Hyperlegible, Fraunces } from "next/font/google";

export const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
  display: "swap",
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});
```

En `tailwind.config.ts` mapear:
- `font-sans` → `var(--font-atkinson)`
- `font-serif` → `var(--font-fraunces)`

### Paleta

Definir como variables CSS en `globals.css` y exponerlas a Tailwind via theme extend.

```css
:root {
  /* Base */
  --bg: #fdfcf8;          /* fondo general (blanco hueso) */
  --ink: #2d2a26;         /* texto principal (gris oscuro cálido) */
  --ink-soft: #6b6660;    /* texto secundario */
  --line: rgba(45, 42, 38, 0.10);   /* bordes muy sutiles */
  --line-strong: rgba(45, 42, 38, 0.25); /* bordes hover */

  /* Acento del sitio */
  --accent: #5a7a5e;      /* verde salvia */
  --accent-dark: #3d5640; /* verde salvia oscuro (hover, texto sobre acento claro) */
  --accent-soft: #eef2ea; /* verde salvia muy claro (fondo de botones) */
  --accent-border: #c8d4c2;

  /* Color por categoría — se aplica al fondo de tarjetas y a la zona "tarjeta central" del juego */
  --letras-bg: #f4ede0;
  --letras-fg: #8a6b3a;

  --numeros-bg: #e8eef0;
  --numeros-fg: #4a6f7a;

  --memoria-bg: #ebefe5;
  --memoria-fg: #3d5640;

  --oraciones-bg: #f0e8e3;
  --oraciones-fg: #a3654a;
}
```

**Regla de uso del color de categoría:** el `bg` se usa para la tarjeta de la categoría en la home, para el fondo de la tarjeta central dentro del juego, y para acentos sutiles en la página de la categoría. El `fg` se usa para los símbolos grandes (letra, número) dentro de la tarjeta, y como color de la cantidad o badge "X juegos". Nunca mezclar colores de distintas categorías en una misma pantalla.

### Espaciados, bordes, radios

- Border radius: tarjetas grandes `rounded-2xl` (16px), tarjetas chicas y botones de letra `rounded-xl` (12px), píldoras de botones de acción `rounded-full`.
- Borders: 0.5px o 1px sólidos. Color por defecto `var(--line)`. Hover `var(--line-strong)`.
- Padding interior tarjetas categoría: `p-6` (24px).
- Padding páginas: contenedor central `max-w-5xl mx-auto px-8 py-12` para home, `px-6 py-6` para páginas de juego.
- Gap entre tarjetas en grid: `gap-4` (16px).

### Tipografía: tamaños y pesos

| Uso | Tamaño | Peso | Familia |
|-----|--------|------|---------|
| Título grande de página (hero) | 32px / 2rem | 600 | Fraunces |
| Título de juego (en página de juego) | 24px | 600 | Fraunces |
| Nombre de tarjeta categoría | 19px | 600 | Fraunces |
| Letra grande dentro del juego (la "C") | 130px | 600 | Fraunces |
| Palabra grande dentro del juego ("casa") | 40px | 600 | Fraunces |
| Letra dentro de botón del selector | 38px | 600 | Fraunces |
| Cuerpo / descripciones | 15-16px | 400 | Atkinson |
| Texto auxiliar / "Letra 3 de 27" | 14px | 400-700 | Atkinson |
| Microcopy footer | 12px | 400 | Atkinson |
| Botones de UI (Volver, Ver todas) | 14px | 400 | Atkinson |
| Botón principal de acción (Escuchar, Empezar) | 16px | 700 | Atkinson |

Usar **siempre** la clase de color explícita en cada elemento. No depender de herencia. Esto evita problemas de color blanco fantasma.

## Estructura de páginas

```
/                       → Home: hero + grid 2x2 de categorías
/juegos                 → Mismo contenido que la home pero sin el hero (entrada directa al menú)
/juegos/letras          → Página de categoría: lista los juegos de la categoría
/juegos/letras/abecedario  → Juego original: explorar letras del abecedario
/juegos/numeros
/juegos/numeros/contar
/juegos/memoria
/juegos/memoria/figuras
/juegos/memoria/letras
/juegos/oraciones
/juegos/oraciones/armar
/juegos/oraciones/asociacion   ← TODO confirmar dónde va asociación (ver más abajo)
/nosotros               → "Jugar para programar..." + historia del sitio
/contacto
```

**Pendiente de decidir:** "Asociación" estaba como juego independiente en el sitio actual. En el rediseño, conceptualmente encaja en "Letras y palabras" (vincular imagen con palabra escrita) o como subcategoría propia. Dejo el ruteo sugerido en `/juegos/letras/asociacion` por ahora, pero confirmar con Juan.

## Componentes base

### `<SiteHeader />`
Header principal del sitio. Usado en home, /juegos, /nosotros, /contacto.

- Altura compacta. Logo PNG a la izquierda en ~38px de alto + nombre del sitio "Jugando con Bauti" en Fraunces 18px + tagline "juegos para aprender jugando" en 11px debajo.
- Navegación a la derecha: Inicio, Juegos, Nosotros, Contacto. Link activo con fondo `--accent-soft` y texto `--accent-dark`.
- Border-bottom sutil con `--line`.
- Sin buscador (eliminado del diseño actual).

### `<GameHeader />`
Header reducido cuando estás dentro de un juego.

- Botón "Volver" a la izquierda (link a la categoría padre).
- Separador vertical sutil.
- Logo chico (28px) + nombre del sitio.
- A la derecha: nombre del juego en Fraunces 15px italic, color `--ink-soft`.
- Misma border-bottom.

### `<GameContextBar />`
Barra delgada debajo del `GameHeader` cuando aplica (ej. en una letra individual).

- Izquierda: contador "Letra 3 de 27" — el número en `--ink` con peso 700, el resto en `--ink-soft`.
- Derecha: botón "Ver todas las letras" con icono de grilla 4x4. Lleva al selector grid.

### `<CategoryCard />` (home)
Tarjeta de categoría en grid 2x2.

- `bg-[var(--letras-bg)]` (o el color de la categoría correspondiente).
- Padding 24px, rounded-2xl.
- Arriba: representación visual del mundo (símbolos grandes en `fg` de la categoría).
- Abajo: nombre del mundo (Fraunces 19px), descripción corta (Atkinson 13px), badge "X juegos" (Atkinson 12px bold en `fg`).
- Hover: `translate-y-[-2px]`, border más fuerte.
- Click: navega a `/juegos/[categoria]`.

### `<GameTile />` (página de categoría)
Tarjeta de un juego individual dentro de una categoría.

- Mismo color de fondo que la categoría pero más sutil (puede ser `bg` con opacidad, o un tono más claro derivado).
- Imagen/icono representativo del juego.
- Nombre del juego, descripción de una línea.
- Click: navega al juego.

### `<NavCircle />`
Botón circular grande para navegar (anterior / siguiente).

- 64px de diámetro, redondo.
- Background `--bg`, border 1px `--accent-border`.
- Icono flecha SVG centrado, 22px, stroke `--ink` 1.8px.
- Hover: bg `--accent-soft`, border `--accent`, translate-y-[-1px].

### `<PrimaryButton />`
Botón principal de acción (Escuchar, Empezar a jugar).

- Píldora (rounded-full).
- Background `--accent`, texto `--bg`, peso 700.
- Padding 14px 26px.
- Hover: bg `--accent-dark`.

### `<GhostButton />`
Botón secundario tipo "Volver", "Ver todas".

- Background `--bg`, border 0.5px `--line-strong`, texto `--ink`.
- Padding 7px 14px, rounded-xl.
- Hover: bg ligeramente más oscuro (un gris muy clarito).

### `<SiteFooter />`
Footer minimal.

- Una sola línea: "San Andrés de Giles · [año]" + links a Nosotros y Contacto.
- Sin franja de color. Border-top sutil.

## Páginas: contenido y estructura

### Home (`/`)

```
<SiteHeader />
<section class="hero">
  <h1>Jugar para aprender</h1>
  <p>Cuatro mundos para explorar, cada uno con sus propios juegos. Tocá uno y vení a conocerlo.</p>
</section>
<section class="categorias">
  <div class="grid 2x2">
    <CategoryCard categoria="letras" />
    <CategoryCard categoria="numeros" />
    <CategoryCard categoria="memoria" />
    <CategoryCard categoria="oraciones" />
  </div>
  <div class="nota-crece">Cada mundo tiene espacio para crecer. Vamos sumando juegos nuevos de a poco.</div>
</section>
<SiteFooter />
```

### Categoría (`/juegos/[categoria]`)

```
<SiteHeader />
<header class="categoria-header" style="bg sutil de la categoria">
  <breadcrumb>Inicio › Letras y palabras</breadcrumb>
  <h1>Letras y palabras</h1>
  <p>Conocer las letras, descubrir las palabras.</p>
</header>
<section class="juegos-grid">
  <GameTile juego="abecedario" />
  <GameTile juego="asociacion" />
</section>
<SiteFooter />
```

### Juego: Letras → Abecedario, vista grid (`/juegos/letras/abecedario`)

```
<GameHeader juego="Letras" />
<section class="titulo">
  <h1>Elegí una letra</h1>
  <p>Tocá la letra que quieras conocer</p>
</section>
<section class="grid-letras">
  <!-- 27 botones de letra (incluye Ñ), grid de 6 columnas, aspect-ratio: 1 -->
</section>
<SiteFooter />
```

Cada botón de letra: bg `--accent-soft`, border 1px `--accent-border`, texto Fraunces 38px 600 color `--accent-dark`. Hover: bg más oscuro, translate-y-[-1px], border `--accent`. Active: bg aún más oscuro, sin translate.

### Juego: Letras → Abecedario, letra individual (`/juegos/letras/abecedario/[letra]`)

```
<GameHeader juego="Letras" />
<GameContextBar contador="Letra 3 de 27" />
<section class="letra-individual">
  <NavCircle direction="prev" />
  <div class="tarjeta-letra" style="bg: --letras-bg">
    <div class="letra-grande">Cc</div>      <!-- Fraunces 130px, color --letras-fg -->
    <img src="/img/letra/casa.png" alt="casa" />
    <div class="palabra">casa</div>          <!-- Fraunces 40px, color --ink, en minúscula -->
  </div>
  <NavCircle direction="next" />
</section>
<SiteFooter />
```

Notas:
- La palabra va en minúscula (más fácil de leer y aprender que mayúscula).
- Las imágenes son las del proyecto actual (`/assets/img/letra/`). Migrarlas a `/public/img/letra/`.
- Si en el futuro se agregan audios, aparece debajo de la tarjeta un `<PrimaryButton>` "Escuchar". El campo `audio` en los datos es opcional: si existe, se renderiza el botón.

## Datos: estructura

Los juegos se alimentan de archivos TypeScript en `/lib/data/`. Esto reemplaza los scripts JS sueltos (`scriptLetras.js`, `scriptNumeros.js`, etc.) y centraliza el contenido tipado.

```ts
// lib/data/letras.ts
export type ItemLetra = {
  letra: string;          // "C"
  palabra: string;        // "casa"
  imagen: string;         // ruta en /public/img/letra/casa.png
  audio?: string;         // futuro: ruta a /public/audio/letra/casa.mp3
};

export const letras: ItemLetra[] = [
  { letra: "A", palabra: "auto", imagen: "/img/letra/auto.png" },
  // ...
];
```

Lo mismo para `numeros.ts`, `memoria-figuras.ts`, etc. Los datos son los del sitio actual; lo único que hace falta es transcribirlos al nuevo formato.

## Convenciones técnicas

- **App Router** de Next.js 15 (`/app`).
- **TypeScript estricto.** `tsconfig.json` con `"strict": true`.
- **Tailwind** para 95% de los estilos. CSS suelto solo en `globals.css` para variables y resets. No usar CSS modules.
- **No usar `localStorage` ni `sessionStorage`** (no son necesarios para este sitio; si en el futuro hace falta progreso, evaluamos).
- Imágenes con `next/image` cuando sea posible. Para imágenes pequeñas decorativas, `<img>` plain está bien.
- Server Components por defecto. `"use client"` solo donde haga falta interactividad (juegos, navegación con estado).
- **Clases de color siempre explícitas** en cada elemento. No depender de herencia (ej: si un botón tiene texto `--ink`, ponerlo explícito en el botón, no en un padre).
- **Una página de juego = un Client Component** que maneja estado del juego internamente. La página de Next.js es Server Component que renderiza el client.

## Redirects (legacy)

En `next.config.js`, mapear las URLs viejas del sitio actual a las nuevas, con `permanent: true`:

```js
async redirects() {
  return [
    { source: '/letras.html', destination: '/juegos/letras/abecedario', permanent: true },
    { source: '/numeros.html', destination: '/juegos/numeros/contar', permanent: true },
    { source: '/memoriaFiguras.html', destination: '/juegos/memoria/figuras', permanent: true },
    { source: '/memoriaLetras.html', destination: '/juegos/memoria/letras', permanent: true },
    { source: '/oraciones.html', destination: '/juegos/oraciones/armar', permanent: true },
    { source: '/asociacion.html', destination: '/juegos/letras/asociacion', permanent: true },
    { source: '/nosotros.html', destination: '/nosotros', permanent: true },
    { source: '/contacto.html', destination: '/contacto', permanent: true },
  ];
}
```

(Confirmar los nombres reales de los archivos HTML del sitio actual antes de aplicar.)

## Migración de los juegos: notas por juego

Cada juego se migra en su propio commit. Para cada uno, primero leer el script JS original y entender la lógica antes de portarla.

**Letras (abecedario):** ya descrito arriba. Patrón: grid → individual con anterior/siguiente.

**Números (contar):** mismo patrón que letras. Botones del 1 al 10 (¿confirmar tope?), al elegir muestra el número grande + cantidad de objetos correspondiente. La imagen actual usa bananas; mantener.

**Memoria figuras y memoria letras:** grid de cartas tapadas, lógica clásica de memoria. Estado del juego: array de cartas, cartas reveladas, pares encontrados. Mantener feedback visual claro: carta dada vuelta, par encontrado se queda visible, par incorrecto se voltea de nuevo tras un delay corto. Considerar pequeña pantalla de "completado" cuando se encuentran todos los pares, sin animaciones intensas.

**Oraciones (armar):** el más complejo. Tira de pictogramas-sujeto arriba, al elegir uno se arma una oración con verbo y lugar (probablemente con lógica predefinida tipo `{sujeto: "perro", oraciones: ["el perro juega en el campo", "el perro corre en la calle"]}`). Revisar el JS actual antes de portar para entender la lógica exacta.

**Asociación:** dos columnas, izquierda imágenes y derecha palabras. El usuario toca una imagen y luego la palabra correspondiente; si acierta, ambas se marcan; si no, vuelven al estado inicial. **Detalle sensible:** una de las imágenes es una foto familiar real (papá). Tratarla con respeto en el rediseño — recortar bien, fondo neutro, no distorsionar.

## Lo que no se hace en esta migración

- No se agrega audio (no existe grabado).
- No se agrega sistema de progreso ni puntaje (los juegos no lo tenían y agregarlo cambia la naturaleza del sitio).
- No se agrega autenticación.
- No se agrega panel de administración.
- No se agregan analytics.

Estas son posibles features futuras, pero el alcance de esta migración es: portar lo que hay + rediseño visual + estructura por categorías.

## Orden sugerido de trabajo

1. Inicializar Next.js 15 + TypeScript + Tailwind + fonts + paleta.
2. `<SiteHeader />`, `<SiteFooter />`, layout root.
3. Página de home con `<CategoryCard />`.
4. Página de `/nosotros` (texto del sitio actual) y `/contacto`.
5. Página de categoría genérica.
6. Migrar Letras (abecedario): grid + individual.
7. Migrar Números: mismo patrón que letras.
8. Migrar Asociación.
9. Migrar Memoria figuras.
10. Migrar Memoria letras.
11. Migrar Oraciones (el más complejo, último).
12. Configurar redirects.
13. Verificar en preview deployment de Vercel.
14. Merge a main.

Cada paso de migración de juego es un commit separado. Si alguno se rompe o no convence, se puede revertir solo ese sin afectar el resto.
