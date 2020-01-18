/* evento mandar respuesta --> al_rsp: actualizar marca -->
	imprimir pregunta de nuevo
 */
function impr_preg( preg_x, preg_v ) {
	document.querySelector("#cnt").innerHTML =
		preg_html( preg_x.preg ) +"&nbsp;".repeat(4) +
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
function preg_html( preg_con_huecos ) {
	let xx = 0;
	let rstdo = "";
	let ahtml = {
		"&":	"&amp;",
		"<":	"&lt;",
		">":	"&gt;",
		"\"":	"&quot;",
		"\n":	"<br>",
		" ":	"&nbsp;"
	};
	for( ii of preg_con_huecos ) {
		if( ii == undefined ) rstdo +=
			`<input id = "e${xx++}">`;
		else rstdo += ii.replace(
				/>|<|"|&|\n| /g,
				function(cc) { return ahtml[cc]; } );
	}
	return rstdo;
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
	let rlh_dat = "";
	let xx = 0;
	for( preg_ii of preg_v ) {
		rlh_dat += ficha0 + preg_ii.marca + ":\n";
		for( cda_jj of preg_ii.preg ) {
			if( cda_jj == undefined ) rlh_dat +=
				"{" + preg_ii.slcn[xx] + "}";
			else rlh_dat += cda_jj;
		}
		rlh_dat += '\n';
	}
	rlh_dat += "---fin";
//	let preg_dat = [];
//	for( ii of preg_v ) preg_dat.push( {
//			"ctndo": ii.ctndo,
//			"marca": ii.marca
//		} );
	rlh_dat = btoa( rlh_dat );
	document.querySelector("#n0").setAttribute("href",
		"data:text/plain;base64," + rlh_dat);
}
function err( cda ) {
	document.querySelector( "#err" ).innerHTML = cda;
}
