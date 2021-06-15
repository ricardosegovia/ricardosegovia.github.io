---
layout: post
title: (18/05/2021) Tutorial - Google Earth Engine
---

[Tutorial modificado de https://ourcodingclub.github.io/]

# Objetivos:

1. [Aprender qué es Google Eath Engine](#intro)
2. [Aprender qué tipos de análisis podemos hacer](#analyses)
3. [Familiarizarse con la interfaz de GEE](#layout)
4. [Aprender los principios básicos del lenguaje JavaScript](#javascript)
5. [Importar y explorar datos](#import)
6. [Pisos vegetacionales y areas protegidas como un caso de estudio](#import2)
7. [Visualizar cambio de cobertura forestal](#visualise)
8. [Calculaar el cambio en la cobertura forestal en lugares especificos](#calculate)
9. [Exportar resultados - Crear tablas](#export)
10.[Otros análisis y visualización en R](#R)



Todos los archivos que necesitas para completar este tutorial serán generados y exportados desde el GEE durante el transcurso del mismo. Excepto el archivo _shape_ de Pisos Vegetacionales de Luebert & Pliscoff.

[Sigue este link](https://signup.earthengine.google.com/) para registrarse en Google Earth Engine.

Necesitan que digas para qué va a utilizar GEE: "participar de un tutorial introductorio". El registro puede tardar unas horas o un día más o menos en ser aprobado.


# 1. Aprender qué es Google Eath Engine
{: #intro}

Google Earth Engine es, como lo han descrito sus desarrolladores, "_la plataforma de procesamiento geoespacial basada en la nube más avanzada del mundo_". Lo que esto significa es que, a través de Google Earth Engine, puedes acceder a numerosas bases de datos espaciales de código abierto (como las imágenes de teledetección Landsat y MODIS, el conjunto de datos sobre el cambio forestal global, las carreteras, las áreas protegidas, etc.) y analizarlas de forma eficiente. Al hacer estos análisis, estás utilizando los servidores de Google, por lo que puedes hacer análisis que te llevarían semanas, si no meses, en tu computador.


__Desde el motor de Google Earth, puedes exportar archivos `.csv` de los valores que hayas calculado y archivos `geoTIFF` (imágenes georreferenciadas) a tu cuenta de Google Drive.__


# 2. Aprender qué tipos de análisis podemos hacer en GEE
{: #analyses}

__Con GEE es posible responder a preguntas de investigación de escala regional y global, o que requieren gran cantidad de datos geoespaciales, de una manera eficiente que antes no era posible. Más adelante veremos cómo explorar los conjuntos de datos con los que se puede trabajar en el GEE. También es posible importar tus propias imágenes georreferenciadas (como las fotos de las misiones de los drones).__ Puedes averiguar cómo importar tus propios datos rasterizados desde [esta página](https://developers.google.com/earth-engine/image_upload) en el sitio web de los desarrolladores del GEE.

Por ejemplo, puede clasificar diferentes tipos de cobertura del suelo, puede calcular y extraer valores de características del paisaje como [NDVI](https://en.wikipedia.org/wiki/Normalized_difference_vegetation_index) (Índice de Vegetación de Diferencia Normalizada) para el mundo, una región particular de interés, o muchas áreas diferentes alrededor del mundo. En realidad, las posibilidades son enormes, y aquí sólo estamos arañando la superficie al dar un ejemplo de cómo se puede utilizar la GEE para calcular el porcentaje de cada piso vegetacional protegido en el sistema de areas protegidas de Chile.

__Puedes consultar los tutoriales en el [sitio web de Google Earth Engine Developers](https://developers.google.com/earth-engine/) si quieres aprender más y practicar tus habilidades con GEE.__


# 3. Familiarizarse con la interfaz de GEE
{: #layout}

__[Entra a Google Earth Engine para empezar!](https://code.earthengine.google.com)__

_Tómate un momento para familiarizarte con la interfaz del editor de Earth Engine: al igual que cuando empiezas a aprender un nuevo idioma, ¡puede parecer mucho para asimilar de una vez! Con tu script en blanco, explora las diferentes pestañas. Fíjate en que si dibujas polígonos o puntos de caída, aparecerán en tu script. Puedes ir a la pestaña `Inspector`, hacer clic en un lugar del mapa, y ver qué información está disponible para él. Aquí tienes un resumen de lo que hacen la mayoría de las pestañas:_

![Google Earth Engine webUI layout annotated]({{ site.baseurl }}/images/gee_layout.png)

# 4. Aprender los principios básicos del lenguaje JavaScript
{: #javascript}

__Google Earth Engine usa [JavaScript](https://en.wikipedia.org/wiki/JavaScript) como lenguaje de programación.__

Al igual que ocurre con otros lenguajes de programación, existe apoyo en línea: puedes buscar en Google "tutoriales sobre `JavaScript` y Earth Engine" (siempre hay mas alternativas en ingles!). Al principio todo te parecerá poco familiar, pero gracias a la comunidad de programadores en línea, es muy raro que empieces a escribir un script completamente de cero.

Aprenderás más sobre la sintaxis y las funciones de `JavaScript` a medida que avancemos en el tutorial, pero por ahora, aquí tienes algunas notas:

Las líneas de código en `JavaScript` terminan con un `;` - ten en cuenta que el código para, por ejemplo, definir una variable puede extenderse a lo largo de varias líneas, pero sólo necesitas poner un `;` al final de la última línea del trozo de código.

Para definir nuevas variables, se utiliza:

```javascript
var new_variable = ...
```

Verás variantes de este código en múltiples lugares a lo largo del script que crearemos más adelante. Esencialmente, cuando importas conjuntos de datos, creas nuevas capas para calcular nuevos valores. Todos ellos necesitan ser almacenados como varibles para que puedas mapearlos, exportarlos, etc.

Para añadir comentarios en tu script, utiliza `//`. Por ejemplo, al principio de tu nuevo script en blanco (si has creado algún polígono o punto mientras explorabas, puedes hacer un nuevo script ahora para empezar "limpio"). Al igual que cuando codificas en otros lenguajes de programación, es bueno dejar comentarios para asegurarte de que tu script resume quién eres, cuál es el objetivo del script y por qué estás siguiendo el flujo de trabajo específico. Aquí hay algunos comentarios de ejemplo - puedes escribir algo similar en tu script:

```javascript
// Taller Biogeografia de la Conservacion. Biogeogeafia, ICAEv, UACH.
// Ricardo Segovia
// 25th Junio 2020
```

__En JavaScript, tienes que ejecutar todo el script a la vez - es decir, no puedes, por ejemplo, seleccionar dos líneas de tu script y ejecutarlas independientemente como en otros lenguajes como _R_. El script se "ejecuta" pulsando el botón `Run`. Esto significa que a lo largo de tu tutorial, a medida que agregas más líneas a tu script, tienes que seguir presionando `Run` para ver los resultados del nuevo código que has agregado.__

# 5. Importar y explorar datos
{: #import}

## Importar y explorar un conjunto de datos en el GEE - áreas protegidas

Para importar el conjunto de datos de áreas protegidas (polígonos de las áreas protegidas de todo el mundo de la Base de Datos Mundial de Áreas Protegidas), escriba `área protegida` en la pestaña de búsqueda y seleccione la versión de polígonos de la base de datos (la otra es sólo de puntos, es decir, las coordenadas de un punto dentro de las áreas protegidas, no su contorno).

![Earth Engine import data screenshot]({{ site.baseurl }}/images/gee_import.png)

__Selecciona `Import`.__

EL nuevo conjunto de datos importado aparece en la parte superior del script - actualmente se llama "table", lo que no es particularmente informativo, por lo que puede cambiar el nombre a otra cosa, por ejemplo, "parks".

![Earth Engine new script screenshot]({{ site.baseurl }}/images/new_script.png)

__Acuérdate de guardar tu script y de guardarlo a menudo. Una vez que lo hayas guardado, verás que el archivo aparece a la izquierda en la pestaña de tus scripts.__

## Visualiza las áreas protegidas de todo el mundo

A continuación, utilizaremos la función `Map` para mapear el conjunto de datos y añadiremos una capa. Puedes activar y desactivar esa capa desde la pestaña de capas en la esquina superior derecha de la ventana del mapa. También puedes cambiar la opacidad.

```javascript
// si quieres visualizar las AP en todo el mundo, puedes utilizar
Map.addLayer(parks);
// Tarda un poco en cargar! Recuerda que tienes que pulsar "Run" para ver los resultados.
```

__Anda a la pestaña `Inspector`, haga clic en un punto del mapa y compruebe las `características` de ese punto: el nombre de la zona protegida, su superficie, cuándo se estableció, etc.__

Muévete por el mundo, encuentra un parque nacional e "inspecciónalo": ¿puedes encontrar el nombre, la zona, etc.? - Toda esta información está en la pestaña `Inspector`.

![Earth Engine Inspector layout screenshot]({{ site.baseurl }}/images/map_inspect.png)

# 6. Pisos Vegetacionales protegidos en Chile, como un caso de estudio
{: #import2}

Como con cualquier análisis, no se trata tanto de los datos como de la pregunta de investigación, así que cuando empieces a explorar en GEE, recuerda tener en mente tus preguntas de investigación (o los objetivos de comunicación científica, ya que la GEE es muy buena para eso también).

## Pregunta de investigación

__Qué porcentaje de cada piso vegetacional esta presente dentro del sistema de áreas protegidas de Chile?__

## Importar y explorar un conjunto de datos en el GEE - cambio de la cubierta forestal

Ahora vamos a importar manualmente un conjunto de datos que no esta disponible en GEE. Descarga en el siguiente link los archivos necesarios para importar la [Clasificacion de Pisos de Vegetación Luebert Pliscoff](http://datos.cedeus.cl/layers/geonode:pisos_vegetacionales_pliscoff).

![Earth Engine data product information screenshot]({{ site.baseurl }}/images/assets.png)

__Llama al objeto `pisos`, o lo que quieras, pero recuerda que si lo llamas de otra manera, tienes que cambiar `pisos` por tu nuevo nombre en todo el código que viene. A continuación, volveremos a mapear nuestro conjunto de datos.__

```javascript
// agrega la capa de pisos_vegetacionales_pliscoff
//importa pisos asset
var pisos_data = ee.FeatureCollection("users/segoviacortes/pisos");
// visualiza la capa de pisos
Map.addLayer(pisos);
```

![Earth Engine map output screenshot]({{ site.baseurl }}/images//pisos_prop.png)

Ahora, tenemos los pisos vegetacionales sobre el mapa __anda de nuevo a la pestaña `Inspector`, haz clic en un punto del mapa y comprueba las `características` (properties) de la capa en ese punto en particular.__

Puedes activar y desactivar la capa, y puedes "comentar" ciertas partes del código si no quieres que esa acción se realice cada vez que vuelvas a ejecutar el script. Por ejemplo, el mapeo de la capa de pisos vegetacionales lleva bastante tiempo, así que si no quieres hacerlo varias veces, puedes añadir `//` delante de esa línea de código. Siempre puede eliminar el `//` cuando desee volver a mapear esos datos. Así:

```javascript
// visualiza la capa de pisos
// Map.addLayer(pisos);
```

__Si quieres convertir muchas líneas de código en comentarios o volver a convertir muchos comentarios en código, puedes utilizar un atajo de teclado `Cmd + /` en un `Mac` y `Ctrl + /` en un ordenador `Windows`.__




# 6. Visualizar cambio de cobertura forestal
{: #visualise}

En primer lugar, es una buena práctica definir la escala de sus análisis: en nuestro caso, es de 30 m, la resolución del conjunto de datos de Global Forest Change. Si un píxel determinado ha sufrido una pérdida de bosque, significa que en algún lugar de ese cuadrado de 30 m x 30 m se ha producido una disminución de la cubierta forestal.

También puede escribir una funcion que detecte automáticamente la resolución del conjunto de datos y la utilice como escala.

Escriba el siguiente código en su script:

```javascript
// Ajuste la escala de nuestros cálculos a la escala del conjunto de datos de Hansen
// que es 30m
var scale = gfc.projection().nominalScale();
```

__El siguiente paso es crear variables para la cubierta forestal en el año 2000 (cuando se inicia la base de datos), para la pérdida hasta 2016 y la ganancia de cubierta forestal, de nuevo hasta 2016. En los datos ráster, las imágenes suelen tener diferentes "bandas" (por ejemplo, rojo, verde, UV), y podemos seleccionar con qué bandas queremos trabajar. En este caso, las diferentes bandas del objeto `gfc` representan la cubierta forestal, la pérdida de bosque y la ganancia de bosque, por lo que haremos una variable para cada una.__

__Para ello, utilizaremos la función `select()`. Ten en cuenta que, a diferencia de otros lenguajes de programación como `R`, en `JavaScript` pones primero el objeto al que quieres aplicar la función, y luego la función real viene en segundo lugar.__

```javascript
// Crear una variable para la cobertura arbórea original en 2000
var treeCover = gfc.select(['treecover2000']);

// Convertir la capa de cobertura arbórea porque el treeCover por defecto está en
// cientos de hectáreas, pero las capas de pérdida y ganancia son sólo en hectáreas!

treeCover = treeCover.divide(100);

// Crear una variable para la pérdida de bosques
var loss = gfc.select(['loss']);

// Crear una variable para la ganancia de bosque
var gain = gfc.select(['gain']);
```

## Hacer un mapa global de la cubierta forestal, la pérdida de bosques y la ganancia de bosques

Ahora que tenemos nuestras tres variables, podemos crear una capa para cada una de ellas y podemos trazarlas con los colores que queramos. Utilizaremos la misma función `Map.addLayer` que antes, pero además de añadir el nombre del objeto, especificaremos los colores y cómo queremos llamar a las capas específicas.

_Tenga en cuenta que también introducimos una nueva función `updateMask()`. Lo que hace es enmascarar las zonas en las que no había cobertura forestal en el año 2000: se vuelven transparentes, por lo que en lugar de sólo oscuridad, podemos ver los mares, los ríos, los contornos de los continentes, etc._

```javascript
// Añade la capa de cobertura de los árboles en gris claro
Map.addLayer(treeCover.updateMask(treeCover),
    {palette: ['D0D0D0', '00FF00'], max: 100}, 'Forest Cover');

// Añadir la capa de pérdida en rosado
Map.addLayer(loss.updateMask(loss),
            {palette: ['#BF619D']}, 'Loss');

// Añadir la capa de ganancia en amarillo
Map.addLayer(gain.updateMask(gain),
            {palette: ['#CE9E5D']}, 'Gain');
```

Recuerde hacer clic en "Run" para ver los mapas recién trazados. Las capas del bosque pueden ser más fáciles de ver si desactiva las dos primeras capas que trazó (las áreas protegidas y la capa genérica de GFC), o puede mantener la capa de áreas protegidas, pero reducir la opacidad arrastrando la barra debajo de esa capa.

![Maps example]({{ site.baseurl }}/images/hansen_trio.png)

Puede especificar el color utilizando códigos hexadecimales, que son las combinaciones de números y letras en el código anterior, por ejemplo, `#CE9E5D` es amarillo. Puedes encontrar ejemplos de ellos en Internet, por ejemplo [este sitio website](https://htmlcolorcodes.com).

![Hex colour picker screenshot]({{ site.baseurl }}/images/colours_hex.png)

_También puedes cambiar entre la vista de mapa y la vista de satélite. Si se amplía lo suficiente y se pasa a la vista de satélite, se pueden empezar a detectar algunos patrones, como la pérdida de bosques a lo largo de las carreteras en el Amazonas._

![Amazon forest deforestation map]({{ site.baseurl }}/images/amazon_forest.png)

# 7. Calculaar el cambio en la cobertura forestal en lugares especificos
{: #calculate}

__Hasta ahora podemos ver dónde se ha producido la pérdida y la ganancia de bosque, por lo que conocemos la _extensión_ del cambio forestal, pero no sabemos la _magnitud_ del cambio forestal, por lo que nuestro siguiente paso es convertir el número de píxeles que han experimentado ganancia o pérdida (recuerde que son sólo valores 0 o 1, 0 para el no, 1 para el sí) en áreas, por ejemplo, kilómetros cuadrados.__

Para cada una de las variables que hemos creado antes (cobertura forestal, pérdida de bosque y ganancia de bosque), crearemos ahora nuevas variables que representen las _áreas_ de cobertura forestal, pérdida y ganancia. Para ello, utilizaremos la función `ee.Image.pixelArea()`, y tenemos que `multiplicar` nuestras variables originales (por ejemplo, `treeCover`), de forma similar a cuando conviertes de metros a centímetros, que multiplicarías por 100. Aquí queremos que el área esté en kilómetros cuadrados, así que para pasar de metros cuadrados a kilómetros cuadrados, también dividiremos por 1 000 000. Por último, seleccionamos la primera banda de nuestras nuevas variables: las áreas de cobertura forestal, pérdida y ganancia, respectivamente.

```javascript
// Las unidades de las variables son números de píxeles
// Aquí convertimos los píxeles en superficie real
// Dividiendo por 1 000 000 para que el resultado final sea en km2
var areaCover = treeCover.multiply(ee.Image.pixelArea())
                .divide(1000000).select([0],["areacover"]);

var areaLoss = loss.gt(0).multiply(ee.Image.pixelArea()).multiply(treeCover)
              .divide(1000000).select([0],["arealoss"]);

var areaGain = gain.gt(0).multiply(ee.Image.pixelArea()).multiply(treeCover)
              .divide(1000000).select([0],["areagain"]);
```

### Calcular la pérdida y la ganancia de bosques en zonas específicas

A menudo nos interesa extraer valores de los datos geoespaciales de lugares concretos del mundo. En este caso, nuestra pregunta se refería a los cambios en la cubierta forestal de los parques nacionales, por lo que, para responderla, tenemos que calcular cuánto ha cambiado la cubierta forestal sólo en los parques nacionales que hemos elegido, no en todo el mundo.

El primer paso es crear una variable filtrada que contenga nuestras áreas de interés. En este caso, filtraremos nuestra variable original `parks`, que incluye todas las áreas protegidas del mundo, para reducirlas a sólo cuatro áreas protegidas. Utilizaremos `ee.Filter.or()` para añadir múltiples condiciones de filtrado.

```javascript
// Crear una variable que tenga los polígonos de sólo unos
// parques nacionales y reservas naturales
var parks = parks.filter(ee.Filter.or(
    ee.Filter.eq("NAME", "Yellowstone"),
    ee.Filter.eq("NAME", "Sankuru"),
    ee.Filter.eq("NAME", "Cairngorms"),
    ee.Filter.eq("NAME", "Redwood")));
```

Ahora estamos preparados para calcular las áreas de pérdida y ganancia de bosque. Utilizaremos lo que en la jerga de GEE se llama "reducer", una función de resumen. La aplicaremos a nuestra variable "parks" y utilizaremos la escala que hemos definido antes (30 m, la resolución del conjunto de datos). Los resultados se almacenarán en dos nuevas variables, `statsLoss` y `statsGain`.

```javascript
// Suma los valores de los píxeles de pérdida.
var statsLoss = areaLoss.reduceRegions({
  reducer: ee.Reducer.sum(),
  collection: parks,
  scale: scale
});

// Suma los valores de los píxeles de ganancia.
var statsGain = areaGain.reduceRegions({
  reducer: ee.Reducer.sum(),
  collection: parks,
  scale: scale
});
```

# 8. Exportar resultados - Crear tablas
{: #export}

En esta fase, hemos calculado las áreas de pérdida y ganancia de bosque en las zonas protegidas que hemos elegido, pero no hemos visto ni visualizado esas cifras.

Podemos exportar archivos `.csv` de nuestros resultados, en este caso irán a tu cuenta de Google Drive. Añade el siguiente código a tu script y pulsa `Run` de nuevo. Verás que se ilumina la pestaña `Task`. Tendrás dos tareas y tendrás que pulsar el botón `Run` junto a ellas (si no las tareas están listas para ti, pero no has iniciado su realización), entonces empezarás a ver un temporizador - que refleja cuánto tiempo ha pasado desde que iniciaste la tarea. Dependiendo de la tarea, puede tardar desde segundos hasta horas. En nuestro caso, deberían ser segundos.

__Utilizamos las llaves para especificar qué objeto queremos exportar y cómo queremos llamar al archivo, por ejemplo `NP_forest_loss`.__

```javascript
Export.table.toDrive({
  collection: statsLoss,
  description: 'NP_forest_loss'});

Export.table.toDrive({
  collection: statsGain,
  description: 'NP_forest_gain'});
```

![Save to Drive screenshot]({{ site.baseurl }}/images/drive.png)

_Ve a ver tus archivos en tu Google Drive. Desplázate hasta la derecha para ver la columna "sum", que muestra el área, en kilómetros cuadrados, de pérdida o ganancia de bosque (dependiendo del archivo que estés viendo)._

# 9. Otros análisis y visualización en R
{: #R}

_Queremos incorporar diferentes plataformas y lenguajes a nuestros análisis, aprovechando los puntos fuertes de cada uno. Los paquetes `R` y `R`, como `ggplot2`, ofrecen más flexibilidad a la hora de visualizar los resultados, así que ahora nos pasaremos a `R` para hacer un gráfico de barras de la pérdida y la ganancia de bosque en las cuatro áreas protegidas que estudiamos._

Nota: También se pueden hacer gráficos en Google Earth Engine, así que esto se reduce a las preferencias personales y lo que funciona mejor para su propio flujo de trabajo. Puedes encontrar tutoriales sobre cómo crear gráficos en GEE en [the Developers website](https://developers.google.com/earth-engine/charts).

_Vamos a R._

```r
# Load libraries ----
library(ggplot2)
devtools::install_github('Mikata-Project/ggthemr') # instalar el ggthemr package
library(ggthemr)  # Disenar tu propio tema
library(forcats)  # Para reordenar variaables categoricas
```

Podemos establecer un tema (cambiar los colores y el fondo) para nuestro gráfico utilizando el paquete `ggthemr`. Puedes explorar las diferentes opciones de color [aqui](https://github.com/cttobin/ggthemr).

```r
# Establecer el tema de la trama
ggthemr('dust', type = "outer", layout = "minimal")

# Este tema se aplicará ahora a todas los plots que hagas
# Para deshacerte de él, utiliza
# ggthemr_reset()

```

A continuación, establece tu directorio de trabajo en el lugar donde guardaste los datos que exportamos a Google Drive y lee los archivos.

```r
# Leer los datos ----
NP_forest_gain <- read.csv("NP_forest_gain.csv")
NP_forest_loss <- read.csv("NP_forest_loss.csv")
```

Combinaremos los dos objetos (el de pérdida de bosque y el de ganancia de bosque) para poder visualizarlos en un mismo gráfico. Podemos crear una columna "identificadora" para saber qué valores se refieren a la ganancia y cuáles a la pérdida de cobertura forestal.

```r
# Crear una columna de identificación para las ganancias y las pérdidas
NP_forest_gain$type <- "Gain"
NP_forest_loss$type <- "Loss"

# Pega los objetos
forest_change <- rbind(NP_forest_gain, NP_forest_loss)
```

Podemos hacer un gráfico de barras para visualizar la cantidad de cubierta forestal perdida y ganada entre 2000 y 2016 en nuestros cuatro lugares de estudio. Dado que un parque nacional más grande puede perder más bosque simplemente porque es más grande (es decir, hay más bosque que perder), podemos visualizar el cambio de bosque como % de la superficie total del parque. Lo hacemos en el código siguiente especificando `y = sum/GIS_AREA`.



```r
(forest_barplot <- ggplot(forest_change, aes(x = NAME, y = sum/GIS_AREA,
                                             fill = fct_rev(type))) +
    geom_bar(stat = "identity", position = "dodge") +
    labs(x = NULL, y = "Forest change (% of park area)\n") +
    # Expanding the scale removes the emtpy space below the bars
    scale_y_continuous(expand = c(0, 0)) +
    theme(text = element_text(size = 16),  # makes font size larger
          legend.position = c(0.1, 0.85),  # changes the placement of the legend
          legend.title = element_blank(),  # gets rid of the legend title
          legend.background = element_rect(color = "black",
                                           fill = "transparent",   # removes the white background behind the legend
                                           linetype = "blank")))
```

Tenga en cuenta que al poner todo su código ggplot entre corchetes () se crea el gráfico y luego se muestra en el visor de gráficos. Si no tienes los corchetes, sólo has creado el objeto, pero no lo has visualizado. Entonces tendrías que llamar al objeto para que se visualice simplemente escribiendo `forest_barplot` después de haber creado el objeto "forest_barplot".

Podemos utilizar la función `ggsave` para guardar nuestro gráfico. El archivo se guardará en cualquier directorio de trabajo, que puedes comprobar ejecutando `getwd()` en la consola.

```r
ggsave(forest_barplot, filename = "forest_barplot.png",
       height = 5, width = 7)
```

![Forest gain and loss bar plots]({{ site.baseurl }}/images/forest_barplot.png)

__Ahora que podemos ver la cantidad de bosque que se ha ganado y perdido en nuestras áreas protegidas de interés, podemos volver a nuestra pregunta de investigación original, cómo varía el cambio de bosque entre las áreas protegidas, y podemos ver si podemos detectar algún patrón: ¿hay algún tipo de áreas protegidas que tienen más probabilidades de perder bosque?__
