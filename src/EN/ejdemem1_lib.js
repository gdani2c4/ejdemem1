/* event send response --> al_rsp: update the points -->
	print question from new*/
function prt_qstn( qstn_x, qstn_v ) {
	document.querySelector("#cnt").innerHTML =
		qstn_html( qstn_x.qstn ) +"&nbsp;".repeat(4) +
		"<a href = # id = n3>continue</a>";
	document.querySelector("#e0").focus();
	/* pass also "qstn_v" complete to take it
	to other functions later: */
	document.querySelector( "#n3" ).
		onclick = al_rsp( qstn_x, qstn_v );
}
function prt_incorr( qstn_x, points_x, qstn_v ) {
	let cllb = main_cont1.bind( undefined, qstn_v );
	document.querySelector("#cnt").insertAdjacentHTML(
		"beforeend",
		"the response coincides with the solution by" +
			` ${Math.floor(points_x * 100)}%</p>` +
		"<a href = # id = n4>to the solution</a>" );
	for( ii of document.querySelectorAll( "input" ) )
		ii.setAttribute( "readonly", null );
	document.querySelector( "#n3" ).innerHTML =
		"redo";
	document.querySelector( "#n3" ).onclick = cllb;
	document.querySelector( "#n4" ).
		onclick = ens_sln( qstn_x, qstn_v );
}
function ens_sln( qstn_x, qstn_v ) {return function() {
	let sln = "";
	for( ii of qstn_x.sln ) sln += `"${ii}", `;
	sln = sln.slice( 0, -2 );
	document.querySelector("#cnt").insertAdjacentHTML(
		"beforeend", `<p>${sln}</p>` );
	// if the solution is shown, add another 0 points
	qstn_x.points = qstn_points_s( qstn_x.points, 0 );
}; }
function qstn_html( qstn_con_holes ) {
	let re0 = new RegExp( ">|<|\"|\n| ", "g" );
	let xx = 0;
	let rslt = "";
	let ahtml = {
		"&":	"&amp;",
		"<":	"&lt;",
		">":	"&gt;",
		"\"":	"&quot;",
		"\n":	"<br>",
		" ":	"&nbsp;"
	};
	for( ii of qstn_con_holes ) {
		if( ii == undefined ) rslt +=
			`<input id = "e${xx++}">`;
		else
			rslt += ii.replace(
				re0,
//				change of syntax "new RegExp"
//				because of a limit of the parser
//				of the translation
//				/>|<|"|&|\n| /g,
				function(cc) { return ahtml[cc]; } );
	}
	return rslt;
}
function choose_qstn( qstn_v ) {
	let qstnv_points = [];
	for( ii of qstn_v ) qstnv_points.push( ii.points );
	return qstnv_points.indexOf(  Math.min(
		...qstnv_points )  );
}
/* points - gives points to the responce "rsp" given the solution
   "sln" and the text of the question
 */
function points( rsp, sln, texto ) {
	let points_x = 0;
	for( ii in sln )
		if( sln[ ii ] == rsp[ ii ] )
			points_x++;
	return points_x / sln.length;
}
function qstn_points_s( val, delta ) {
		return (1 - theta) * val + theta * delta;
}
function n0_href( qstn_v ) {
	let rslt = { rlh_dat: "" };
	rlh_gen( qstn_v, rslt );
	// utf-16 to utf-8 hexadecimal of the data-url
	rslt.rlh_dat = rslt.rlh_dat.replace(
		/.|\n/g, function ( xx ) {
    xx = parseInt( xx.charCodeAt(), 10 );
    if( xx < 0x80 ) return "%" + xx.toString(16).
		padStart(2,0);
    else if( xx > 0x80 && xx < 0x7FF ) return "" +
        "%" + ( ( xx >>> 6 ) + 0xC0 ).toString(16).
			padStart( 2, 0 ) +
        "%" + ( xx - (xx >>> 6 << 6) + 0x80 ).toString(16).
			padStart( 2, 0 );
    else { console.log("unrecognized character"); return 1; }
	} );
	document.querySelector("#n0").setAttribute("href",
		"data:text/plain;charset=UTF-8," + rslt.rlh_dat);
}
function err( str ) {
	document.querySelector( "#err" ).innerHTML = str;
}
