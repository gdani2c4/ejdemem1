document.body.innerHTML =
	"<input id = e0 type = file >" +
	"<input type = button id = e1 value = seguir>" +
	"<div></div>";
entrada0 = document.getElementById("e0");
entrada1 = document.getElementById("e1");
prevista = document.querySelector("div");
entrada0.focus();
entrada0.onchange = function() {
	a0 = entrada0.files[0];
	lector = new FileReader();
	lector.onloadend = function() {
		var preg = [];
		preg_dat = JSON.parse( lector.result );
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
		preg[0] = {};
		preg_dat_as( preg_dat[0], preg[0] );
		document.body.innerHTML = preg[0].html;
		document.body.innerHTML +=
		'<input type="button" value="seguir">';
		document.querySelector("input[type='button']").
			onclick = al_rsp_rll ( preg[0] );
	}
	if( a0 )
		lector.readAsText( a0 );
};
function al_rsp_rll( preg_x ) {
	function al_rsp() {
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
	marca_x = 0;
	for( ii in slcn )
		if( slcn[ ii ] == rsp[ ii ] )
			marca_x++;
	return marca_x / slcn.length;
}
function preg_dat_as( preg_dat_x, preg_x) {
	preg_x.html = "", xx = 0;
	preg_x.slcn = new Array;
	preg_x.marca = [], preg_x.preg = [];
	ahtml = {"&": "&amp;",
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
			aa = [];
			for( jj of ii ) {
				aa.push(xx);
				preg_x.slcn[xx] = jj;
				preg_x.html +=  `<input id = "e${xx++}">`;
			}
			preg_x.preg.push( aa );
		}
	}
	preg_x.marca = preg_dat_x.marca;
	return 0;
}
