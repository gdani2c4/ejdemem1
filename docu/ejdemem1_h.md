# Lista de funciones

### ejdemem1.js

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

### ejdemem_lib.js

[la sección falta todavía]

## analiza de sintaxis

análisis de sintaxis y generación del formato de archivo de texto
.rlh, las siglas de "rellenar los huecos"

### rlh.js

- función "main" del analizador del formato "rlh"

    `as_rlh( rlh_dat, preg_v )`

    lee datos en el formato "rlh" (rellenar los huecos) `rlh_dat`
    al vector de preguntas "preg_v". La función inicializa la
	lectura de `rlh_dat` a `preg_v` y lo pasa a
	`as_preg_sg()` que sigue el analisis de `rlh_dat`
	de forma recursiva.

### rlh_lib.js

funciones auxiliares - análisis del los elementos hijo
del documento .rlh, generador del formato .rlh

- analiza el contenido de una pregunta `ctdo_dat`

    `as_ctdo( ctdo_dat, ctdo_rstdo )`

    analiza de manera recursiva los fragmentos entre
    las fichas en el contenido de la pregunta `ctdo_dat`
    al JSON `ctdo_rstdo` (contenido - resultado).

- leer hasta una cierta ficha

    `leer_hf( cda_e, rstdo, cde, cdt)`

    función general de lectura hasta una ficha `ctd`
    (carácter de terminación) mientras se interpreta
    el carácter de escape `cde`. Guarda el resultado 
    en `rstdo`.

- analizar la marca / apuntación del usuario

    `as_marca( marca_dat, rstdo )`

    devuelve la marca numérica en `rstdo.marca`

- generar formato .rlh del vector de preguntas `preg_v`

    `rlh_gen( preg_v, rstdo )`

    entrada - el vector de preguntas `preg_v`
    salida - formato .rlh en `rstdo.rlh_dat`
