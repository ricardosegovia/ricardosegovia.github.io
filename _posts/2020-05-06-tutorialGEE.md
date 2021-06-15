---
layout: post
title: (25/06/2021) Tutorial - Google Earth Engine
---

[Tutorial modificado de https://ourcodingclub.github.io/]

# Objetivos:

1. [Aprender qué es Google Eath Engine](#intro)
2. [Aprender qué tipos de análisis podemos hacer](#analyses)
3. [Familiarizarse con la interfaz de GEE](#layout)
4. [Aprender los principios básicos del lenguaje JavaScript](#javascript)
5. [Importar y explorar datos](#import)
6. [Pisos vegetacionales y areas protegidas como un caso de estudio](#import2)
7. [Analisis](#visualise)
8. [Exportar resultados - Crear tablas](#export)
9. [Otros análisis y visualización en R](#R)


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

# 6. Pisos vegetacionales y areas protegidas como un caso de estudio
{: #import2}

Como con cualquier análisis, no se trata tanto de los datos como de la pregunta de investigación, así que cuando empieces a explorar en GEE, recuerda tener en mente tus preguntas de investigación (o los objetivos de comunicación científica, ya que la GEE es muy buena para eso también).

## Pregunta de investigación

__Qué porcentaje de cada piso vegetacional esta presente dentro del sistema de áreas protegidas de distintas regiones de Chile?__

## Importar y explorar un conjunto de datos en el GEE - pisos vegetacionales

Ahora vamos a importar manualmente un conjunto de datos que no esta disponible en GEE. Descarga en el siguiente link los archivos necesarios para importar la [Clasificacion de Pisos de Vegetación Luebert Pliscoff](http://datos.cedeus.cl/layers/geonode:pisos_vegetacionales_pliscoff). Luego importalos en Assets>New, y sube los archivos asociados al .shp.

![Earth Engine data product information screenshot]({{ site.baseurl }}/images/assets.png)

__Llama al objeto `pisos`, o lo que quieras, pero recuerda que si lo llamas de otra manera, tienes que cambiar `pisos` por tu nuevo nombre en todo el código que viene. A continuación, volveremos a mapear nuestro conjunto de datos.__

Hacer este analisis para todo Chile toma mucho tiempo, asi que vamos a tomar muestras espaciales para discutir los resultados, yo voy a escoger la costa de la Region del Bio Bio, ustedes pueden escoger la que mas les interese.

![Earth Engine data product information screenshot]({{ site.baseurl }}/images/areas2.png)

```javascript
// agrega la capa de pisos_vegetacionales_pliscoff restringida a tu area de interes
//importa pisos asset
var pisos = ee.FeatureCollection("users/segoviacortes/pisos")
              .filterBounds(area);
// visualiza la capa de pisos
Map.addLayer(pisos);
```

![Earth Engine map output screenshot]({{ site.baseurl }}/images//pisos_prop.png)

Ahora que tenemos los pisos vegetacionales sobre el mapa, __anda de nuevo a la pestaña `Inspector`, haz clic en un punto del mapa y comprueba las `características` (properties) de la capa en ese punto en particular.__

Puedes activar y desactivar la capa, y puedes "comentar" ciertas partes del código si no quieres que esa acción se realice cada vez que vuelvas a ejecutar el script. Por ejemplo, el mapeo de la capa de pisos vegetacionales lleva bastante tiempo, así que si no quieres hacerlo varias veces, puedes añadir `//` delante de esa línea de código. Siempre puede eliminar el `//` cuando desee volver a mapear esos datos. Así:

```javascript
// visualiza la capa de pisos
// Map.addLayer(pisos);
```

__Si quieres convertir muchas líneas de código en comentarios o volver a convertir muchos comentarios en código, puedes utilizar un atajo de teclado `Cmd + /` en un `Mac` y `Ctrl + /` en un ordenador `Windows`.__


## Importar la capa de areas protegidas, pero esta vez restringiendola a tu area de interes

```javascript
// Importar nuevamente la capa de areas protegidas, pero mediante
// una funcion para agregar una nueva funcion de restriccion a nuestra area de interes

var protectedAreas = ee.FeatureCollection('WCMC/WDPA/current/polygons')
                        .filterBounds(area);
// Visualiza las areas protegidas dentro de tu area de interes
Map.addLayer(protectedAreas, {color: 'black'}, "protectedAreas", false);
```


# 7. Analisis
{: #visualise}

## Calcular el area de cada PISO en km2

En primer lugar, es una buena práctica definir la escala de sus análisis: en nuestro caso, haremos los calculos de area en km2.

Para calcular el area de cada PISO presente en tu area de interes, escribe el siguiente código en tu script:

```javascript
// Calcular el area de cada piso que esta presente en tu area de interes
// // Funcion para calcular area
var addArea = function(feature) {

  return feature.set({areaKm2: feature.geometry().area().divide(1000 * 1000)});
};

// Aplicar la funcion sobre tu capa pisos restringida
var pisosArea = pisos.map(addArea);

//revisa la primera fila del archivo generado, debe tener el nombre del piso y su area
print(pisosArea.first());

var PISOS = pisosArea//.select('areaKm2'); // quita las diagonales para remover informacion extra en el csv
//revisa cuantos poligonos de pisos estan presentes en tu area de intetres
print('Number of Polygons of PISOS', PISOS.size());
```

En el siguiente paso, vamos a preparar la capa de areas protegidas para poder intersectarla con la capa de Pisos vegetacionales. Para eso, vamos a estimar sus areas en km2 tambien.

```javascript
// Agregar una funcion para mapear el area de las areas protegidas en km2
var PA = protectedAreas.map(function(feature) {

  return feature.set({
    areaKm2: feature.geometry().area().divide(1000 * 1000)

  });
});

// remover el exceso de informacion del archivo excepto el area en km2
var PA = PA.select('areaKm2');

// Revisar cuantas areas protegidas hay en tu area de interes
print('Number of Polygons of Protected Areas in Chile', PA.size());
// Revisar una muestra
print('Sample Protected Areas', PA);

```

## Calcular el area intersectada

Ahora que tenemos nuestras variables, podemos crear una nueva variable en que calculemos el area de cada poligono de Pisos Vegetacionales que esta dentro de algun Area Protegida

```javascript
//renombramos las variables para mantener el orden
var vectors = PISOS;
var polygons = ee.FeatureCollection(PA);

// Convertimos los pisos en una lista de poligonos
var vectorList = vectors.toList(vectors.size());


// Con esta funcion intersectamos las capas de PISOS y Areas Protegidas
var polyIntersect = polygons.iterate(function(feature, list){
  list = ee.List(list);
  feature = ee.Feature(feature);

  var intersection = vectorList.map(function(feat) {
    feat = ee.Feature(feat);
    var intersection = feat.intersection(feature, ee.ErrorMargin(1));
    return ee.Feature(intersection)
              .set({'Intersect_Area': intersection.area().divide(1000 * 1000)});
  });

  return list.add(intersection.filter(ee.Filter.gt('Intersect_Area', 0)));
}, ee.List([]));

var polyIntersect = ee.FeatureCollection(ee.List(polyIntersect).flatten());

// get inforamtion on Intersection areas
print('Poligonos Intersectados: ', polyIntersect);
```

Recuerde hacer clic en "Run" para revisar que el script funcione correctamente

# 8. Exportar resultados - Crear tablas
{: #export}

En esta fase, hemos calculado las áreas totales para cada Piso Vegetacional y el area de cada uno de ellos que esta protegido en algun area protegida, pero no hemos visto ni visualizado esas cifras.

Podemos exportar archivos `.csv` de nuestros resultados, en este caso irán a tu cuenta de Google Drive. Añade el siguiente código a tu script y pulsa `Run` de nuevo. Verás que se ilumina la pestaña `Task`. Tendrás dos tareas y tendrás que pulsar el botón `Run` junto a ellas (si no las tareas están listas para ti, pero no has iniciado su realización), entonces empezarás a ver un temporizador - que refleja cuánto tiempo ha pasado desde que iniciaste la tarea. Dependiendo de la tarea, puede tardar desde segundos hasta horas. En nuestro caso, deberían ser segundos, tal vez un par de minutos.

__Utilizamos las llaves para especificar qué objeto queremos exportar y cómo queremos llamar al archivo.__

```javascript
//Exportar los archivos generados
// Exportando la tabla con el calculo de las area para los PISOS
Export.table.toDrive({
  collection: PISOS,
  description: 'PISOS_Area_km2',
  fileFormat: 'CSV'
});

// Exportando la tabla con las areas intersectadas
Export.table.toDrive({
  collection: polyIntersect,
  description: 'polyIntersect',
  fileFormat: 'CSV'
});

```

![Save to Drive screenshot]({{ site.baseurl }}/images/drive.png)

_Ve a ver tus archivos en tu Google Drive. Desplázate hasta la derecha para ver la columna "areaKM2", que muestra el área, en kilómetros cuadrados, del total de cada PISO o del area protegida de cada PISO (dependiendo del archivo que estés viendo)._

# 9. Otros análisis y visualización en R
{: #R}

_Queremos incorporar diferentes plataformas y lenguajes a nuestros análisis, aprovechando los puntos fuertes de cada uno. `R` ofrece más flexibilidad a la hora de visualizar los resultados, así que ahora nos pasaremos a `R` para hacer un gráfico de barras del porcetaje de cada Piso Vegetacional protegido en nuestra area de interes._

Nota: También se pueden hacer gráficos en Google Earth Engine, así que esto se reduce a las preferencias personales y lo que funciona mejor para su propio flujo de trabajo. Puedes encontrar tutoriales sobre cómo crear gráficos en GEE en [the Developers website](https://developers.google.com/earth-engine/charts).

_Vamos a R._

A continuación, establece tu directorio de trabajo en el lugar donde guardaste los datos que exportamos a Google Drive y lee los archivos.

```r
##leer el archivo que contiene los datos del area de cada piso vegetacional
FORMACION<-read.csv("PISOS_Area_km2.csv")
##borrar la columna .geo
FORMACION$.geo<-NULL
##Sumar las areas para cada PISO/FORMACION
FORMACION2<-as.data.frame(tapply(FORMACION$areaKm2, FORMACION$FORMACION, FUN=sum))

##leer el archivo que contiene los datos del area de cada piso vegetacional presente en elagun area protegida
intersect_form<-read.csv("polyIntersect.csv")
##borrar la columna .geo
intersect_form$.geo<-NULL
##Sumar las areas para cada PISO/FORMACION
intersect_form2<-as.data.frame(tapply(intersect_form$Intersect_Area, intersect_form$FORMACION, FUN=sum))

##pegar ambos datos
df <- merge(FORMACION2, intersect_form2, by="row.names", all=TRUE)
df[is.na(df)] <- 0
colnames(df) <- c("formacion","total","protected")

```

Luego hacemos un grafico de barras simple para mostrar el area protegida de cada FORMACION vegetacional. Vas a tener que ajustar el argumento ylim en ambas funciones de acuerdo a las magnitudes de los pisos/formaciones en tu area de intertes.

```r
#Graficar para area total y area protegida por formacion
# Use xpd = F para evitar trazar las barras por debajo del eje
barplot(height=df$total, names=df$formacion, las = 1, col = "white", ylim = c(0, 55000), xpd = F)
# Permita plottear un nuevo grafico sobre el existente
par(new = T)
# grafique los nuevos datos con sin el eje
barplot(height=df$protected, names=df$formacion, las = 1, col = "red", ylim = c(0, 55000), yaxt = "n")
```

Podemos utilizar la función `pdf` para guardar nuestro gráfico. El archivo se guardará en cualquier directorio de trabajo, que puedes comprobar ejecutando `getwd()` en la consola.


![Forest gain and loss bar plots]({{ site.baseurl }}/images/barplot.png)

Dado que los valores son tan bajos, vamos a explorar en una tabla los porcentajes protegidos para cada Piso Vegetacional.

```r

##Crear tabla con los porcentajes de area protegida para cada PISO
##leer el archivo que contiene los datos del area de cada piso vegetacional
PISOS<-read.csv("PISOS_Area_km2.csv")
##borrar la columna .geo
PISOS$.geo<-NULL
##Sumar las areas para cada PISO/FORMACION
PISOS2<-as.data.frame(tapply(PISOS$areaKm2, PISOS$PISO, FUN=sum))

##leer el archivo que contiene los datos del area de cada piso vegetacional presente en elagun area protegida
intersect_piso<-read.csv("polyIntersect.csv")
##borrar la columna .geo
intersect_piso$.geo<-NULL
##Sumar las areas para cada PISO/FORMACION
intersect_piso2<-as.data.frame(tapply(intersect_piso$Intersect_Area, intersect_piso$PISO, FUN=sum))

##pegar ambos datos
df_pisos <- merge(PISOS2, intersect_piso2, by="row.names", all=TRUE)
df_pisos[is.na(df_pisos)] <- 0
colnames(df_pisos) <- c("piso","total","protected")


df_pisos$percentage<-(df_pisos$protected/df_pisos$total)*100
df_pisos <- df_pisos[order(-df_pisos$percentage),]
## Asi, primero vamos a ver aquellos Pisos con mas area protegida
head(df_pisos)
##Y luego, aquellos con menos area protegida dentro de nuestra area de interes
tail(df_pisos)
```
Pisos mejor representados en Areas Protegidas
![Pisos mejor representados en Areas Protegidas]({{ site.baseurl }}/images/head.png)

Pisos peor representados en Areas Protegidas
![Pisos peor representados en Areas Protegidas]({{ site.baseurl }}/images/tail.png)


__Comentarios acerca de la relacion entre ell sistema de areas protegidas y la Biogeografia de Conservacion__
