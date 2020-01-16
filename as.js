preg_v = [];
ficha0 = "---";
re0_val = ficha0 + "([^\n\t ][^\n]*)";

function as_rlh( rlh_dat, preg_v ) {
	let marca_dat = [];
	let preg_kk = {};
	/*
	 "rstdo"	"resultado". Funciones "as_*"  analizadores
	 sintacticos devuelven un numero != 0 al llegar
	 a una exención. El resultado del analizador
	 se guarda en la estructura "rstdo" entregado
	 a la función.*/
	let rstdo = {};
	/*
	 el exreg del primer marcador del archivo -
	 llevará adelante solo espacios en blanco
	 "[\t\n ]", y termina en un '\n'. */
	re0 = new RegEx( "^[\n\t ]*" + re0_val + '\n' );
	if(  !( marca_dat = rlh_dat.match( re0 ) )  ) {
		err( "la ficha que delimita las preguntas " +
			"no se encontró en el archivo." );
		return 1;
	}
	rstdo = {};
	if(  as_marca( marca_dat[1], rstdo )  ) return 1;
	
	if( as_preg_sg(
		rlh_dat.slice( marca_dat.index + marca_dat[0].length ),
		preg_v, rstdo.marca )
	) return 1;
}
function as_preg_sg( rlh_dat, preg_v, marca ) {
	let preg_x = {};
	let dlmt = [];
	re0 = new RegEx( '\n' + re0_val + \n' );
	// caso ya no hay mas de marcas (no hay mas preguntas)
	if(  !( dlmt = rlh_dat.match( re0 ) )  ) {
		// busca el delimitador final del formato "rlh"
		re0 = new RegEx( '\n' + ficha +
			"[^\n\t ]{1,}[\n\t ]*$" );
		if(  !( dlmt = rlh_dat.match( re0 ) )  ) {
			err( "no se encontró la ficha del fin " +
				"de la lista de preguntas" );
			return 1;
		}
		dlmt.ultimo = 1;
	}
	rstdo = {};
	if( as_ctdo( rlh_dat.slice( 0, dlmt.index - 1 ),
		rstdo )  ) return 1;
	push( {...rstdo, marca: marca } );
	if( dlmt.ultimo ) return 0;
	rstdo = {};
	if(  as_marca( dlmt[1], rstdo )  ) return 1;
	if( as_preg_sg(
		dat_rlh.slice( dlmt.index + dlmt[0].length ),
		preg_v, rstdo.marca )
	) return 1;
}
