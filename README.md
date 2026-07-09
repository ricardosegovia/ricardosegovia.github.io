# Ricardo Segovia Website

Este sitio está construido con Jekyll y se publica como un sitio de GitHub Pages.

## Recordatorio rápido para levantarlo localmente

Para ver el sitio en tu máquina, ejecuta:

```bash
bundle install
bundle exec jekyll build
```

Y, si quieres servirlo localmente sin el watcher de cambios, usa:

```bash
bundle exec jekyll serve --detach
```

Si tu sistema muestra el error de inotify/watchers, prueba esta variante:

```bash
bundle exec jekyll serve --livereload --watch false
```

Luego abre en tu navegador:

```text
http://127.0.0.1:4000/
```

Si necesitas usar un entorno local de gems, también puedes probar:

```bash
env GEM_HOME=.gems GEM_PATH=.gems .gems/bin/bundle exec jekyll serve
```

## Estructura del sitio

- Configuración general: `_config.yml`
- Plantilla principal: `_layouts/default.html`
- Metadatos: `_includes/meta.html`
- Página de inicio: `index.html`
- Entradas de blog: `_posts/`
- Noticias: `_news/`
- Estilos: `style.scss` y `_sass/`
- Salida generada: `_site/`

No edites la carpeta `_site/`; ahí se genera la versión compilada del sitio.
