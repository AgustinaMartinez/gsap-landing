## GSAP Practice

#### Las animaciones se conocen como "Tween"

### Plugins

Si se usan, hay que registrarlos primero.

```javascript
gsap.registerPlugin(ScrollTrigger, SplitText);
```

### - Timelines:

Se usa para crear animaciones anidadas.
Acepta también callbacks para que suceda algo luego de que la animación empiece, se complete, o se repita.

### - ScrollTrigger:

Para el scroll trigger existen markers que son ayudas visuales para ver cuándo y dónde empieza la animación.
Se usa matchMedia para que pueda ser configurable por breakpoint el scrollDuration para luego usarlo en el "end".
Se crea una única función `createScrollAnimations` con todas las animaciones y esta devuelve cada uno de los timelines en un array.
En este caso, cada sección tiene un timeline y dentro de él ocurren animaciones.
Se usa el contexto.add() para registrar las animaciones:

```javascript
ScrollTrigger.matchMedia({
  "(min-width: 769px)": function (ctx) {
    let timelines;
    ctx.add(() => {
      // Usamos ctx.add() para registrar las animaciones
      timelines = createScrollAnimations("+=1000");
    });
    return () => timelines.forEach((tl) => tl.revert()); // limpiamos los timelines
  },
  "(max-width: 768px)": function (ctx) {
    let timelines;
    ctx.add(() => {
      // Usamos ctx.add() para registrar las animaciones
      timelines = createScrollAnimations("+=600");
    });
    return () => timelines.forEach((tl) => tl.revert()); // limpiamos los timelines
  },
});
```

#### Sección de Airpods:

- Está inspirada en la [página web de Apple](https://www.apple.com/la/airpods-pro/)
- Se tomó como aprendizaje también el [mini curso de @midudev](https://www.twitch.tv/videos/2476958037)
