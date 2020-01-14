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
