# Lista de funciones

## ejdemem1.js

- La función "main" del programa  

    `main0()`

    Llama al bucle central del interfaz del usuario

- Primer parte del bucle central  

    `main_bucle0()`

    Imprime la pantalla que pide del usuario que elija
    un archivo. El `onclick` del archivo es
    `leer_a_preg( archivo_x )`

- Leer las preguntas del archivo

    `leer_a_preg( archivo_x )`

    Leer el archivo de preguntas del usuario, el que escogió
    en la pantalla de `main_bucle0()`, al objeto JSON
    `preg_v`.

- Continuación del bucle central - el ejercicio

    `main_cont1( preg_v )`

    Un algoritmo escoge la pregunta siguiente y imprime la
    pantalla del ejercicio.

- Continuación - después de que el usuario dé su respuesta

    `al_rsp( preg_x, preg_v )`

    Calcular la marca del usuario, actualizar su vector
    de estado `preg_v` con ella --> pregunta siguiente
    `main_cont1( preg_v )`

## analiza sintactico

- función "main" del analizador del formato "rlh"

    `as_rlh( rlh_dat, preg_v )`

    lee datos en el formato "rlh" (rellenar los huecos)
    al vector de preguntas "preg_v"
