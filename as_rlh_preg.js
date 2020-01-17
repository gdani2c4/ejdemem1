// as_hf	analizador sintáctico de cadenas
// con carácter de escape "cde" y carácter de
// terminación "cdt". Actualizar el índice "ll.val"
// en que terminó la función.
function leer_hf( cda_e, rstdo, cde, cdt ) {
	let ii = 0;
	rstdo.cda = "";
	for( ii = 0; ii < cda_e.length; ii++ ) {
		// caso: carácter de escape
		if( cda_e[ii] == cde ) {
			if( ++ii == cda_e.length ) break;
			rstdo.cda += cda_e[ii];
		}
		// caso: ficha de terminación
		else if( cda_e[ii] == cdt ) break;
		// caso: carácter no sintáctico
		else rstdo.cda += cda_e[ii];
	}
	rstdo.nn = ii;
	return 0;
}
function as_ctdo( ctdo_dat, ctdo_rstdo ) {
	let rstdo = {};
	leer_hf( ctdo_dat, rstdo, '\\', '{' );
	/*        caso               	significa

	 índice devuelto < |ctdo_dat|	índ. de cdt

	    "     "     ==      " - 1	cdt termina
	                             	la cadena

	    "     "     ==      "   	falta el cdt
	 */
	if( rstdo.nn == ctdo_dat.length - 1 ) {
		err( "'{' sin terminar" );
		return 1;
	}
	// guarda la pregunta hasta el '{'
	if( rstdo.cda ) ctdo_rstdo.preg.push( rstdo.cda );
	// caso llegó al fin de la cadena de contenido
	if( rstdo.nn == ctdo_dat.length ) return 0;
	ctdo_dat = ctdo_dat.slice( rstdo.nn + 1 );
	// caso anticipar una solición
	rstdo = {};
	leer_hf( ctdo_dat, rstdo, '\\', '}' );
	if( rstdo.nn == ctdo_dat.length ) {
		err( "'{' sin terminar" );
		return 1;
	}
	// guarda la solución entre las '{', '}'
	ctdo_rstdo.slcn.push( rstdo.cda );
	// marca el hueco para la solución
// no funcionó, no se añadó el espacio al arreglo -
//	ctdo_rstdo.preg.concat([,]);
	ctdo_rstdo.preg.push(undefined);
	ctdo_dat = ctdo_dat.slice( rstdo.nn + 1 );
	if( as_ctdo( ctdo_dat, ctdo_rstdo ) ) return 1;
}
function as_marca( marca_dat, rstdo ) {
	if( !marca_dat.match(
		/^0*[01]$|^0*1[,.]0*$|^0*[,.][0-9]*$/ ) ) {
		err( "formato de la marca de pregunta 1" );
		return 1;
	}
	rstdo.marca = parseFloat(
		marca_dat.replace( ',', '.' )  );
	return 0;
}
