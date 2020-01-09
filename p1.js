const theta = 1/4; // el peso de la respuesta actual
/* entra al calcular la calificación del usuario a
   la pregunta que acaba de contestar
 */
function main0() {
	main_bucle0();
}
function main_bucle0() {
	document.body.innerHTML =
		"<input id = e0 type = file >" +
		"<input type = button id = e1 value = seguir>" +
		"<div></div>";
	entrada0 = document.getElementById("e0");
	entrada1 = document.getElementById("e1");
	prevista = document.querySelector("div");
	entrada0.focus();
	entrada0.onchange = function() {
		preg_v = [];
		leer_a_preg( preg_v, entrada0.files[0] );
	};
}
// leer_a_preg --> preg_dat_as; main_cont1
function main_cont1( preg_v ) {
	/* hacemos una prueba con la pregunta preg_dat[0]
	   el formato de preg_datos[ii] se convierte en
	   preg[ii]

	 preg[ii].html	la pregunta en forma html -
	   ...texto... <input id="e0"> ... texto ...
	   <input id=`e${n}`> ... texto ... 
	   los `e${j}` (j = 0,1,..n) son para las respuestas

	 preg[ii].slcn	"slcn[jj]" es la solución a
 	   respuesta "jj", que corresponde a id=`e${jj}`

	 preg[ii].marca es la marca, igual como en
	   "preg_dat"
	 */
	impr_preg(  preg_v[ escoger_preg( preg_v ) ], preg_v  );
}
/* event "onclick" de salir del la bucle del ejercicio -->
   main_cont2: ofrece al usuario guardar el archivo salir sin
   guardar
 */
function main_cont2( preg_v ) { return function() {
	document.body.innerHTML =
		'<p>¿guardar los resultados?</p>' +
		'<input type = button id = e1 value = ' +
			'"salir sin guardar">';
		document.querySelector("#e1").onclick =
			main_bucle0;
}; }
/* evento mandar respuesta --> al_rsp: actualizar marca -->
	imprimir pregunta de nuevo
 */
function impr_preg( preg_x, preg_v ) {
	document.body.innerHTML = preg_x.html +
		'<input type="button" value="seguir">' +
		'<input type="button" value="salir">';
	document.querySelector( 'input[value = "seguir"]' ).
		/* pasa también "preg_v" entero para llevarlo
			a otras funciones mas adelante: */
		onclick = al_rsp( preg_x, preg_v );
	document.querySelector( 'input[value = "salir"]' ).
		onclick = main_cont2( preg_v );
}
function escoger_preg( preg_v ) {
	let pregv_marca = [];
	for( ii of preg_v ) pregv_marca.push( ii.marca );
	return pregv_marca.indexOf(  Math.min(
		...pregv_marca )  );
}
function leer_a_preg( preg_v, archivo_x ) {
	let lector = new FileReader();
	lector.onloadend = function() {
		preg_dat_as( preg_v, JSON.parse( lector.result ) );
		main_cont1( preg_v );
	}
	if( archivo_x ) lector.readAsText( archivo_x );
}
function preg_dat_as( preg_v, dat_x ) {
	for( preg_dat_x of dat_x ) {
		let preg_x = {};
		preg_x.html = "";
		let xx = 0;
		preg_x.slcn = new Array;
		preg_x.preg = [];
		let aa = [];
		let ahtml = {"&": "&amp;",
				 "<": "&lt;",
				 ">": "&gt;",
				 "\"": "&quot;"
				};
		for( ii of preg_dat_x.ctndo ) {
			if( !Array.isArray( ii ) ) {
				preg_x.preg.push( ii );
				preg_x.html += ii.replace(
					/>|<|"|&/g,
					function(xx) { return ahtml[ xx ]; }
				);
			}
			/* al llegar a un arreglo de soluciones mientras
			   itera por preg_dat_x, se añade un cuadrado de
			   texto para cada respuesta, esto a preg_x.html,
			   y el arreglo se añade sin las soluciones a
			   la plantilla de la pregunta, preg_x.preg
			 */
			else {
				for( jj of ii ) {
					aa.push(xx);
					preg_x.slcn[xx] = jj;
					preg_x.html +=  `<input id = "e${xx++}">`;
				}
				preg_x.preg.push( aa );
			}
		}	// fin del bucle por datos de preg. ii
		preg_x.marca = preg_dat_x.marca;
		preg_v.push( preg_x );
	}
	return 0;
}
function al_rsp( preg_x, preg_v ) { return function() {
	preg_x.rsp = new Array;
	for( ii in preg_x.slcn )
		preg_x.rsp[ii] = document.querySelector(
			`#e${ii}`).value;
	preg_x.marca = marca_preg_sum( preg_x.marca,
		marca( preg_x.rsp, preg_x.slcn,
			preg_x.preg )
	);
	console.log( preg_x.marca);
	main_cont1( preg_v );
}; }
function marca_preg_sum( val, delta ) {
		return (1 - theta) * val + theta * delta;
}
/* marca - califica la respuesta "rsp" dado la solución
   "slcn" y el texto de la pregunta
 */
function marca( rsp, slcn, texto ) {
	let marca_x = 0;
	for( ii in slcn )
		if( slcn[ ii ] == rsp[ ii ] )
			marca_x++;
	return marca_x / slcn.length;
}
main0();
