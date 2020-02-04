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

- Imprimir al pregunta

    `impr_preg( preg_x, preg_v )`

    imprime `preg_x`; entrada `e${jj}` corresponde a la
    solución `preg_x.slcn[jj]` para cada solución.
    lleva el argumento `preg_v` solo para pasarlo a
    `al_rsp()`, que dispara al entrar el usuario su
    respuesta a la pregunta.

- convertir la pregunta en html

    `preg_html( preg_con_agujeros )`

    utilizada en `impr_preg()`,
    devuelve el html en una cadena, de una cadena
    partida (lo que es un arreglo) `preg_v.preg`

- Escoger pregunta

    `escoger_preg( preg_v )`

    escoger la pregunta siguiente de `preg_v`,
    el algoritmo actual es lo mas sencillo: la
    pregunta la que el usuario tiene la peor marca

- califica la respuesta actual del usuario

    `marca( rsp, slcn, texto )`

    dado la respuesta actual, la solución y el texto
    original. El algoritmo actual es el más sencillo,
    que la repuesta debe coincidir bit a bit a la
    solución. Un algoritmo más complejo puede hasta
    llevar a cuenta la semantica del texto.

- sumación de la marca a la historia

    `marca_preg_sum( val, delta )`

    incluir en la sumación de las marcas anteriores
    la marca de la respuesta actual. En esta versión
    es un promedio sencillo que forma una serie
    geometrica.

- generar el .rlh con la marca actualizada

    `n0_href( preg_v )`

    después de cada respuesta, las notas actualizadas
    se incluyen en un archivo .rlh nuevo, en la forma
    de un url de datos en un elemento "a" (anclaje)
    que el usuario puede descargar al ir al enlace
    "guardar". Para evitar conflitos de sintaxis con
    el formato de url de datos, es almacenado en forma
    hexadécimo. También para mejorar compatibilidad con
    editores de texto, es convertido de UTF-16 a UTF-8.

## analiza de sintaxis

análisis de sintaxis y generación del formato de archivo de texto
.rlh, las siglas de "rellenar los agujeros"

### rlh.js

- función "main" del analizador del formato "rlh"

    `as_rlh( rlh_dat, preg_v )`

    lee datos en el formato "rlh" (rellenar los agujeros) `rlh_dat`
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
