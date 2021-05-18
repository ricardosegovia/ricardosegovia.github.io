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


{% capture callout %}
All the files you need to complete this tutorial will be generated and exported from the GEE during the course of the tutorial.

[Follow this link](https://signup.earthengine.google.com/) to register for the Google Earth Engine - it is free.

Say what you'll be using the GEE for - for research, education, etc. It might take a few hours or a day or so for your registration to be approved.
{% endcapture %}
{% include callout.html content=callout colour=alert %}

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
