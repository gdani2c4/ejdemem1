const theta = 1/4; // el peso de la respuesta actual
/* entra al calcular la calificación del usuario a
   la pregunta que acaba de contestar
 */
function main0() {
	main_bucle0();
}
function main_bucle0() {
	document.body.innerHTML =
		'<a href = "#" id = n2>salir</a></br></br>' +
		'<div id = cnt><input id = e0 type = file>' +
		'</div>';
	document.querySelector( "#n2" ).onclick =
		function() {
			document.body.innerHTML = "fin";
		};
	e0 = document.getElementById("e0");
	e0.focus();
	e0.onchange = function() {
		preg_v = [];
		leer_a_preg( preg_v, e0.files[0] );
	};
}
function leer_a_preg( preg_v, archivo_x ) {
	/* el formato de preg_datos[ii] se convierte en
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
	let lector = new FileReader();
	lector.onloadend = function() {
		preg_dat_as( preg_v, JSON.parse( lector.result ) );
		main_cont1( preg_v );
	};
	if( archivo_x ) lector.readAsText( archivo_x );
}
/* después de construir "preg_v", prepara la salida
   para mostrar la pregunta siguiente al usuario */
function main_cont1( preg_v ) {
	if( ! document.querySelector( "#n0" ) ) {
	document.querySelector( "#n2" ).insertAdjacentHTML(
		"beforebegin",
		'<a href = "#" id = n0 download>guardar</a>' +
		"&nbsp;".repeat(4) +
		'<a href = "#" id = n1>al inicio</a>' +
		"&nbsp;".repeat(4) );
	document.querySelector( "#n1" ).onclick = main_bucle0;
	}
	impr_preg(  preg_v[ escoger_preg( preg_v ) ], preg_v  );
	n0_href( preg_v );
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
/* evento mandar respuesta --> al_rsp: actualizar marca -->
	imprimir pregunta de nuevo
 */
function impr_preg( preg_x, preg_v ) {
	document.querySelector("#cnt").innerHTML = preg_x.html +
		"&nbsp;".repeat(4) +
		'<a href = "#" id="n3">seguir</a>';
	document.querySelector("#e0").focus();
	/* pasa también "preg_v" entero para llevarlo
		a otras funciones mas adelante: */
	document.querySelector( "#n3" ).
		onclick = al_rsp( preg_x, preg_v );
}
function escoger_preg( preg_v ) {
	let pregv_marca = [];
	for( ii of preg_v ) pregv_marca.push( ii.marca );
	return pregv_marca.indexOf(  Math.min(
		...pregv_marca )  );
}
function preg_dat_as( preg_v, dat_x ) {
	for( preg_dat_x of dat_x ) {
		let preg_x = {};
		preg_x.ctndo = preg_dat_x.ctndo;
		preg_x.html = "";
		let xx = 0;
		preg_x.slcn = new Array;
		preg_x.preg = [];
		let aa = [];
		let ahtml = {"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			"\"": "&quot;",
			"\n": "<br>"
		};
		for( ii of preg_dat_x.ctndo ) {
			if( !Array.isArray( ii ) ) {
				preg_x.preg.push( ii );
				preg_x.html += ii.replace(
					/>|<|"|&|\n/g,
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
function n0_href( preg_v ) {
	let preg_dat = [];
	for( ii of preg_v ) preg_dat.push( {
			"ctndo": ii.ctndo,
			"marca": ii.marca
		} );
	document.querySelector("#n0").setAttribute("href",
		"data:application/json," +
		JSON.stringify( preg_dat )  );
}
