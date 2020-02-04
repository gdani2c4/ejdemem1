/* evento mandar respuesta --> al_rsp: actualizar marca -->
	imprimir pregunta de nuevo
 */
function impr_preg( preg_x, preg_v ) {
	document.querySelector("#cnt").innerHTML =
		preg_html( preg_x.preg ) +"&nbsp;".repeat(4) +
		"<a href = # id = n3>seguir</a>";
	document.querySelector("#e0").focus();
	/* pasa también "preg_v" entero para llevarlo
		a otras funciones mas adelante: */
	document.querySelector( "#n3" ).
		onclick = al_rsp( preg_x, preg_v );
}
function impr_incorr( preg_x, marca_x, preg_v ) {
	let rll = main_cont1.bind( undefined, preg_v );
	document.querySelector("#cnt").insertAdjacentHTML(
		"beforeend",
		"<p>la respuesta coincide con la solución a " +
			` ${Math.floor(marca_x * 100)}%</p>` +
		"<a href = # id = n4>a la solución</a>" );
	for( ii of document.querySelectorAll( "input" ) )
		ii.setAttribute( "readonly", null );
	document.querySelector( "#n3" ).innerHTML =
		"intentarlo de nuevo";
	document.querySelector( "#n3" ).onclick = rll;
	document.querySelector( "#n4" ).
		onclick = ens_slcn( preg_x, preg_v );
}
function ens_slcn( preg_x, preg_v ) {return function() {
	let slcn = "";
	for( ii of preg_x.slcn ) slcn += `"${ii}", `;
	slcn = slcn.slice( 0, -2 );
	document.querySelector("#cnt").insertAdjacentHTML(
		"beforeend", `<p>${slcn}</p>` );
	// si se enseña la solución, agrega otro 0 puntos
	preg_x.marca = preg_marca_s( preg_x.marca, 0 );
}; }
function preg_html( preg_con_agujeros ) {
	let re0 = new RegExp( ">|<|\"|\n| ", "g" );
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
	for( ii of preg_con_agujeros ) {
		if( ii == undefined ) rstdo +=
			`<input id = "e${xx++}">`;
		else
			rstdo += ii.replace(
				re0,
//				cambio al sintaxis "new RegExp"
//				por un limite de un analizador sintactico
//				de traducción
//				/>|<|"|&|\n| /g,
				function(cc) { return ahtml[cc]; } );
	}
	return rstdo;
}
function escoger_preg( preg_v ) {
	let pregv_marca = [];
	for( ii of preg_v ) pregv_marca.push( ii.marca );
	return pregv_marca.indexOf(  Math.min(
		...pregv_marca )  );
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
function preg_marca_s( val, delta ) {
		return (1 - theta) * val + theta * delta;
}
function n0_href( preg_v ) {
	let rstdo = { rlh_dat: "" };
	rlh_gen( preg_v, rstdo );
	// utf-16 a utf-8 hexadécimo binario de formato url-datos
	rstdo.rlh_dat = rstdo.rlh_dat.replace(
		/.|\n/g, function ( xx ) {
    xx = parseInt( xx.charCodeAt(), 10 );
    if( xx < 0x80 ) return "%" + xx.toString(16).
		padStart(2,0);
    else if( xx > 0x80 && xx < 0x7FF ) return "" +
        "%" + ( ( xx >>> 6 ) + 0xC0 ).toString(16).
			padStart( 2, 0 ) +
        "%" + ( xx - (xx >>> 6 << 6) + 0x80 ).toString(16).
			padStart( 2, 0 );
    else { console.log("carácter desconocido"); return 1; }
	} );
	document.querySelector("#n0").setAttribute("href",
		"data:text/plain;charset=UTF-8," + rstdo.rlh_dat);
}
function err( cda ) {
	document.querySelector( "#err" ).innerHTML = cda;
}
