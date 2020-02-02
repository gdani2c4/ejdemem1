[indicaciónes en español](#ejercicio-de-memoria-1-rellenar-los-agujeros)

[instructions in English](#exercise-of-memory-1-fill-the-gaps)

---
# ejercicio de memoria 1: rellenar los agujeros #

herramienta muy sencilla para llevar ejercicios de
tipo rellenar los agujeros a la computadora. La
frase que el usuario recuerde el peor es la siguiente
que el programa le da para rellenar.

Encontré programas mucho más complejos como
[JClic](https://github.com/projectestac/jclic) pero
quería construir uno que es:

1. muy sencillo

    - solo mete los ejercicios en un archivo de un
      formato limpio y cuyo uso es fácil

    - no hace falta instalación para el uso

2. tiene un algoritmo que escoge qué dar al
   usuario, y el cual se puede cambiar facilmente
   desde los archivos de programación.
   (el uso del programa no exige ningún
   conocimiento de programación. Esta
   caracteristica es para algunos usuarios que
   también les interesa experimentar con los
   algoritmos)

## uso

1. clone del repositorio, abrir *index.html*

    - otra alternativa, descargar solo un archivo -
      *v_un_archivo_solo/ejdemem1.html* y abrirlo

2. escoger un archivo de ejercicios en la página
   que sale

    - ejemplos están incluidos en el directorio *dat/*

3. hacer el ejercicio

4. ir al enlace "guardar" los resultados,
   y sobreescribe el archivo de ejercicios.

    - eso guarda la apuntación nueva

### archivo de ejercicios

para escribir un archivo de ejercicios
(se abre este archivo en el paso 2 de [uso](#uso) )

- empezar cada ejercicio en el renglón:

    `---0:`

    (el 0 será la apuntación inicial en el ejercicio,
    y se actualizará al guardar los resultados del
    ejercicio en paso 4 de [uso](#uso) )

- terminar el archivo de ejercicios en el renglón:

    `---fin`

- las soluciones van entre corchetes `{` y `}`

    ejemplo:

```
---0:
ciento {volando} y no uno en {la mano}
---0:
el uso de {alheña} (de la palabara semítica "jina")
es en su origen pintar el piel en ceremonias 
en el {mediooriente} y {la India}.
---fin
```

- para incluir los marcadores especiales
  del archivo que se acaba de mencionar (son
  `{`, `}`, y los renglones que demarcan las
  ejercicios) simplemente marca un `\`
  al frente sin espacios así: `\{`, `\}`,

    `\---0`,

    `\---fin`

    ejemplo:

```
---0:
los ejercicios de {rellenar los agujeros} empiezan
en el renglón:
\---0:
y las soluciónes van entre \{ y \} así: \{solución\}
---fin
```

---
# exercise of memory 1: fill the gaps

a tool that is very simple to take exercises of
the type fill-the-missing-text to the computer. The
phrase that the user remembers the worse is the
next that the program gives the user to fill.

I encountered programs that are much more complex
such as [JClic](https://github.com/projectestac/jclic)
but I wanted to program one that is:

1. very simple

    - simply insert the exercises in a file of a
      clean format whose use is easy

    - installation not necessary for use

2. has an algorithm that chooses what to give
   to the user to solve, and which can be
     changed easily in the program source files.
   (The use of the program does not demand any
   knowledge of programming. This feature is only
   for the users that also are interested to
   experiment with algorithms)

## use

1. clone from the repository; open *indexEN.html*

2. choose a exercise file in the page that comes

    - examples are included in the directory *dat/*

3. do the exercise

4. go to the link "save" the results, and overwrite
   the file of the exercise

    - this will save the new points of the user

## exercise files

to wrte a file of exercises
(it is opened in phase 2 of [use](#use)

- begin every exercise with the line:

    `---0:`

- end the file with the line:

    `---end`

- the solutions go between parenthesis \{ and  \}

    example:

```
---0:
100 {flying} and not 1 in {the hand}
---0:
the use of {henna} (from the semitic word "khina")
is in its origin to paint the skin in ceremonies
in the {middle east} and {India}
---end
```


- to include the special markers
  of the file that were mentioned now (they are
  `{`, `}` and the lines that delimit the
  exercises) simply enter a `\` at the front
  without spaces: `\{`, `\}`,

  `\---0:`,

  `\---end`

   example:

```
---0:
the exercises of {fill the gaps} begin with
the line:
\---0:
and the solutions go between `{` and `}` as such:
\{solution\}
---end
```
