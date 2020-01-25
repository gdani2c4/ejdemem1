# el formato rlh

- siglas de "rellenar los huecos", un formato
  construido para el programa "ejercicio de memoria 1"
  consta de:

    - un renglon de la forma `---[MARCA]:` va delante
      de todas las preguntas. MARCA es la marca o
      apuntación del usuario del archivo, entre
      0 y 1 inclusivo.

    - un renglón de la forma `---fin` va después de
      la última pregunta. nota: "---" con espacio en
      blanco seguido no vale y entrará como parte
      de la pregunta.

    - el contenido de las preguntas:
        - si quieres renglones como las indicadas
          más arriba que aparezcan en la pregunta
          empezarlos con un \\

        - soluciones entre {, }

        - si quieres que aparezca un { o un }, entrar
          justo al frente un \\ así: \\{, \\}

    - ejemplos de archivos .rlh se encuentran en
      el directorio "dat/"
