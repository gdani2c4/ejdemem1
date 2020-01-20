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
	if( rstdo.sin_elim_esc ) ctdo_rstdo.preg_sin_elim_esc.
		push( rstdo.sin_elim_esc );
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
	ctdo_rstdo.slcn_sin_elim_esc.push( rstdo.sin_elim_esc );
	// marca el hueco para la solución
	ctdo_rstdo.preg.push(undefined);
	ctdo_rstdo.preg_sin_elim_esc.push( undefined );
	ctdo_dat = ctdo_dat.slice( rstdo.nn + 1 );
	if( as_ctdo( ctdo_dat, ctdo_rstdo ) ) return 1;
}
// leer_hf	analizador sintáctico de cadenas
// con carácter de escape "cde" y carácter de
// terminación "cdt". Actualizar el índice "rstdo.nn"
// en que terminó la función.
function leer_hf( cda_e, rstdo, cde, cdt ) {
	let ii = 0;
	rstdo.cda = "";
	rstdo.sin_elim_esc = ""; // EVITA PARSE EN FASE GENERAR .RLH
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
	// --- GUARDA UNA COPIA SIN QUITAR EL CAR. DE ESC.
	rstdo.sin_elim_esc = cda_e.slice( 0, ii );
	return 0;
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
function rlh_gen( preg_v, rstdo )
{
	let xx = 0;
	for( preg_ii of preg_v ) {
		xx = 0;
		rstdo.rlh_dat += ficha0 + preg_ii.marca + ":\n";
		for( cda_jj of preg_ii.preg_sin_elim_esc ) {
			if( cda_jj == undefined ) rstdo.rlh_dat +=
				"{" + preg_ii.slcn_sin_elim_esc[xx++] + "}";
			else rstdo.rlh_dat += cda_jj;
		}
		rstdo.rlh_dat += '\n';
	}
	rstdo.rlh_dat += "---fin";
}
