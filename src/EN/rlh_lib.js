function as_cntnt( cntnt_dat, cntnt_rslt ) {
	let rslt = {};
	readto_tok( cntnt_dat, rslt, '\\', '{' );
	/*        case               	signifies

	 index returned < |cntnt_dat|	ind. of cdt

	     "      "    ==      " - 1	cdt ends
	                                	the string

	    "    "     ==       "   	missing the string
	*/
	if( rslt.nn == cntnt_dat.length - 1 ) {
		err( "'{' sin terminar" );
		return 1;
	}
	// save the question until the '{'
	if( rslt.str ) cntnt_rslt.qstn.push( rslt.str );
	if( rslt.no_elim_esc ) cntnt_rslt.qstn_no_elim_esc.
		push( rslt.no_elim_esc );
	// case arrived at the end of the string of content
	if( rslt.nn == cntnt_dat.length ) return 0;
	cntnt_dat = cntnt_dat.slice( rslt.nn + 1 );
	// case expect a solution
	rslt = {};
	readto_tok( cntnt_dat, rslt, '\\', '}' );
	if( rslt.nn == cntnt_dat.length ) {
		err( "'{' sin terminar" );
		return 1;
	}
	// save the solution between '{', '}'
	cntnt_rslt.sln.push( rslt.str );
	cntnt_rslt.sln_no_elim_esc.push( rslt.no_elim_esc );
	// mark the hole to be solved
	cntnt_rslt.qstn.push(undefined);
	cntnt_rslt.qstn_no_elim_esc.push( undefined );
	cntnt_dat = cntnt_dat.slice( rslt.nn + 1 );
	if( as_cntnt( cntnt_dat, cntnt_rslt ) ) return 1;
}
// read_ht	 parser of strings
// with character of escape "cde" and character of
// termination "cdt". Update teh index "rslt.nn"
// in that the function terminated.
function readto_tok( str_e, rslt, cde, cdt ) {
	let ii = 0;
	rslt.str = "";
	rslt.no_elim_esc = ""; // PREVENT PARSE IN PHASE GENERATE .RLH
	for( ii = 0; ii < str_e.length; ii++ ) {
		// case: escape character
		if( str_e[ii] == cde ) {
			if( ++ii == str_e.length ) break;
			rslt.str += str_e[ii];
		}
		// case: token of end
		else if( str_e[ii] == cdt ) break;
		// case: not syntactic character
		else rslt.str += str_e[ii];
	}
	rslt.nn = ii;
	// --- SAVE A COPY BUT DO NOT REMOVE ESC. CHAR.
	rslt.no_elim_esc = str_e.slice( 0, ii );
	return 0;
}
function as_points( points_dat, rslt ) {
	if( !points_dat.match(
		/^0*[01]$|^0*1[,.]0*$|^0*[,.][0-9]*$/ ) ) {
		err( "format of the marker of question 1" );
		return 1;
	}
	rslt.points = parseFloat(
		points_dat.replace( ',', '.' )  );
	return 0;
}
function rlh_gen( qstn_v, rslt )
{
	let xx = 0;
	for( qstn_ii of qstn_v ) {
		xx = 0;
		rslt.rlh_dat += ficha0 + qstn_ii.points + ":\n";
		for( str_jj of qstn_ii.qstn_no_elim_esc ) {
			if( str_jj == undefined ) rslt.rlh_dat +=
				"{" + qstn_ii.sln_no_elim_esc[xx++] + "}";
			else rslt.rlh_dat += str_jj;
		}
		rslt.rlh_dat += '\n';
	}
	rslt.rlh_dat += "---end";
}
