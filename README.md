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
Busca muger de talla, de cabeça pequeña;
cabellos amarillos, non sean de {alheña};
...
("Libro de Buen Amor", Arcipreste de Hita)
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
