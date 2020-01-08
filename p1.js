function main0() {
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
	document.body.innerHTML = preg_v[0].html;
	document.body.innerHTML +=
		'<input type="button" value="seguir">';
	document.querySelector("input[type='button']").
		onclick = al_rsp_rll ( preg_v[0] );
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
		preg_x.html = "", let xx = 0;
		preg_x.slcn = new Array;
		preg_x.marca = [], preg_x.preg = [];
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
function al_rsp_rll( preg_x ) {
	function al_rsp() {
		let marca_x = 0;
		preg_x.rsp = new Array;
		for( ii in preg_x.slcn )
			preg_x.rsp[ii] = document.querySelector(
				`#e${ii}`).value;
		marca_x = marca( preg_x.rsp, preg_x.slcn,
			preg_x.preg );
		preg_x.marca[0] += marca_x;
		preg_x.marca[1]++;
		document.body.innerHTML += preg_x.marca;
	}
	return al_rsp;
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
