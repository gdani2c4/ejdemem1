const theta = 1/4; // el peso de la respuesta actual
/* entra al calcular la calificación del usuario a
   la pregunta que acaba de contestar
 */
function main0() {
	main_bucle0();
}
function main_bucle0() {
	document.body.innerHTML =
		'<div id = nav ><a href = "#" id = n2 >' +
			'salir</a></div></br></br>' +
		'<div id = cnt ><input id = e0 type = file >' +
			'</div>' +
		'</br></br><div id = err ></div>';
	document.querySelector( "#n2" ).onclick =
		function() {
			document.body.innerHTML = "fin";
		};
	e0 = document.getElementById("e0");
	e0.focus();
	e0.onchange = function() {
//		preg_v = [];
//		leer_a_preg( preg_v, e0.files[0] );
		leer_a_preg( e0.files[0] );
	};
}
//function leer_a_preg( preg_v, archivo_x ) {
function leer_a_preg( archivo_x )
{
	/*
	 preg_v.preg	cadena partida (un arreglo) por valores
	 	"undefined" donde se meten las soluciones / huecos

	 preg_v.slcn	las soluciones, en el orden en el
		que aparecen en la pregunta

	 preg_v.preg_sin_elim_esc, preg_v.slcn_sin_elim_esc
		las preguntas, soluciones sin reducir coincidencias
		del carácter de escape '\'
	 */
	let preg_v = [];
	let lector = new FileReader();
	lector.onloadend = function() {
		as_rlh( lector.result, preg_v );
		main_cont1( preg_v );
	};
	if( archivo_x ) lector.readAsText( archivo_x );
}
/* después de construir "preg_v", prepara la salida
   de la pregunta siguiente al usuario */
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
//	console.log( preg_x.marca);
	main_cont1( preg_v );
}; }
