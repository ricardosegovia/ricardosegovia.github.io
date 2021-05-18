---
layout: post
title: (18/05/2021) Tutorial - Google Earth Engine
---

# Objetivos:

1. [Aprender que es Google Eath Engine](#intro)
2. [Aprender qué tipos de análisis podemos hacer](#analyses)
3. [Familiarizarse con el GEE layout](#layout)
4. [Aprender los principios básicos del lenguaje JavaScript](#javascript)
5. [Importar y explorar datos - xx como un caso de estudio](#import)
6. [Visualizar cambio de cobertura forestal](#visualise)
7. [Calculaar el cambio en la cobertura forestal en lugares especificos](#calculate)
8. [Exportar resultados - Crear tablas](#export)
9. [Otros análisis y visualización en R](#R)



All the files you need to complete this tutorial will be generated and exported from the GEE during the course of the tutorial.

[Follow this link](https://signup.earthengine.google.com/) to register for the Google Earth Engine - it is free.

Say what you'll be using the GEE for - for research, education, etc. It might take a few hours or a day or so for your registration to be approved.


# 1. Learn what the Google Earth Engine is
{: #intro}

The Google Earth Engine, as its developers have described it, is "_the most advanced cloud-based geospatial processing platform in the world!_" What this means is that, through the Google Earth Engine, you can access and efficiently analyse numerous open-source spatial databases (like Landsat and MODIS remote sensing imagery, the Global Forest Change dataset, roads, protected areas, etc.). When doing these analyses, you are using the Google servers, so you can do analyses that would take weeks, if not months, on your computer or even a fancy computer.

__From the Google Earth Engine, you can export `.csv` files of any values you've calculated and `geoTIFF` files (georeferenced images) to your Google Drive account.__


# 2. Find out what types of analyses you can do using the GEE
{: #analyses}

__With the GEE, you can answer large-scale research questions in an efficient way that really was just not possible before, so quite exciting! You can use large geospatial datasets to address a plethora of questions and challenges facing humanity in the modern world. We will see later on how to explore what datasets are available to work with in the GEE, and it's also possible to import your own georeferenced imagery (like photos from drone missions).__ You can find out how to import your own raster data from [this page](https://developers.google.com/earth-engine/image_upload) on the GEE developers website.

For example, you can classify different land cover types, you can calculate and extract values for landscape features such as [NDVI](https://en.wikipedia.org/wiki/Normalized_difference_vegetation_index) (Normalised Difference Vegetation Index) - for the world, a particular region of interest, or many different areas around the world. Really, the possibilities are enormous, and here we are only scratching the surface by giving you an example of how you can use the GEE to calculate changes in forest cover over time.

__You can check out the tutorials on the [Google Earth Engine Developers website](https://developers.google.com/earth-engine/) if you are keen to learn more and to practice your GEE skills!__


# 3. Get familiar with the GEE layout
{: #layout}

__[Go to the Earth Engine to start your GEE journey!](https://code.earthengine.google.com)__

_Take a moment to familiarise yourself with the layout of the Earth Engine editor - like when first starting to learn a new language, it can seem like a lot to take in at once! With your blank script, have a go at exploring the different tabs. Notice how if you draw polygons or drop points, they will appear in your script. You can go to the `Inspector` tab, click on a place in the map, and see what information is available for it. Here is an outline of what most of the tabs do:_

![Google Earth Engine webUI layout annotated]({{ site.baseurl }}/images/gee_layout.png)

# 4. Learn the basic principles of JavaScript
{: #javascript}

__The Google Earth Engine uses the programming language [JavaScript](https://en.wikipedia.org/wiki/JavaScript).__

Similarly to other programming languages, there is support online - you can google `JavaScript` and Earth Engine tutorials. It will all seem unfamiliar at first, but thanks to the online programming community, you very rarely start completely from scratch - i.e., don't feel bad about yourself because you can't just think of the correct `JavaScript` code from the top of your head straight away.

We'll introduce you to more about `JavaScript` syntax and functions as we go along with the tutorial, but for now, here a few notes:

Lines of code in `JavaScript` finish with a `;` - note that code for e.g. defining a variable can be spread over multiple lines, but you only need to put a `;` at the end of the last line of the code chunk.

To define new variables, you use:

```javascript
var new_variable = ...
```

You'll see variants of this code at multiple places throughout the script we will create later. Essentially, when you import datasets, create new layers, calculate new values, all those need to be stored as varibles so that you can map them, export them, etc.

To add comments in your script, use `//`. For example, at the start of your blank new script (if you created any polygons or points while you were exploring, you can make a new script now to start "clean"). Like when coding in other programming languages, it's great to leave comments to make sure your script outlines who you are, what the aim of the script is and why you are following the specific workflow. Here are a few example comments - you can write up something similar in your script:

```javascript
// Calculating forest cover change in protected areas around the world
// Gergana Daskalova
// 26th Nov 2018
```

__In JavaScript, you have to run your entire script at once - that is, you can't, for example, select two lines of your script and run just those, you have to run the whole thing. You "run" a script by pressing the `Run` button. This means that throughout your tutorial, as you add more lines to your script, you have to keep pressing `Run` to see the results of the new code you've added.__
