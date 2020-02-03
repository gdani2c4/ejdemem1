qstn_v = [];
ficha0 = "---";
re0_val = ficha0 + "([^\n\t ][^\n]*):";

function as_rlh( rlh_dat, qstn_v ) {
	let points_dat = [];
	/*
	 "rslt"	"result". Functions "as_*" analyzers
	 of syntax return a number != 0 to arrive
	 at an error. The result of the analyzer
	 is saved in the structure "rslt"	 given
	 to the function.*/
	let rslt = {};
	/*
	 the regex of the first marker of the file -
	 will take in front only empty spaces
	 "[\t\n ]", and terminate in a '\n'. */
	re0 = new RegExp( "^[\n\t ]*" + re0_val + '\n' );
	if(  !( points_dat = rlh_dat.match( re0 ) )  ) {
		err( "the token that delimits the questions " +
			"file not encountered." );
		return 1;
	}
	rslt = {};
	if(  as_points( points_dat[1], rslt )  ) return 1;
	
	if( as_qstn_suc(
		rlh_dat.slice( points_dat.index + points_dat[0].length ),
		qstn_v, rslt.points )
	) return 1;
}
function as_qstn_suc( rlh_dat, qstn_v, points ) {
	let qstn_x = {};
	let dlmt = [];
	re0 = new RegExp( '\n' + re0_val + '\n' );
	// case no more delimiters (no questions remain)
	if(  !( dlmt = rlh_dat.match( re0 ) )  ) {
		// search the final delimiter fo the "rlh" format
		re0 = new RegExp( '\n' + ficha0 +
			"[^\n\t ]{1,}[\n\t ]*$" );
		if(  !( dlmt = rlh_dat.match( re0 ) )  ) {
			err( "end token not encountered " +
				"of the list of questions" );
			return 1;
		}
		dlmt.ultimo = 1;
	}
	rslt = {
		qstn: [],
		sln: [],
		qstn_no_elim_esc: [],
		sln_no_elim_esc: []
	}
	if( as_ctnt( rlh_dat.slice( 0, dlmt.index ),
		rslt )  ) return 1;
	qstn_v.push( {...rslt, points: points } );
	if( dlmt.ultimo ) return 0;
	rslt = {};
	if(  as_points( dlmt[1], rslt )  ) return 1;
	if( as_qstn_suc(
		rlh_dat.slice( dlmt.index + dlmt[0].length ),
		qstn_v, rslt.points )
	) return 1;
}
