const theta = 1/4; // the current weight of the response
/*enters when to calculate the points of the user to
    the question that was now answered
 */
function main0() {
	main_loop0();
}
function main_loop0() {
	document.body.innerHTML =
		'<div id = nav ><a href = "#" id = n2 >' +
			'exit</a></div></br></br>' +
		'<div id = cnt ><input id = e0 type = file >' +
			'</div>' +
		'</br></br><div id = err ></div>';
	document.querySelector( "#n2" ).onclick =
		function() {
			document.body.innerHTML = "fin";
		};
	e0 = document.getElementById("e0");
	e0.focus();
	e0.onchange = function() {
//		qstn_v = [];
//		read_a_qstn( qstn_v, e0.files[0] );
		read_a_qstn( e0.files[0] );
	};
}
//function read_a_qstn( qstn_v, file_x ) {
function read_a_qstn( file_x )
{
	/*
	 qstn_v.qstn	divided string (an array) of values
	 	"undefined" where the solutions / holes

	 qstn_v.sln	the solutions, in the order that
	they appearin the question

	 qstn_v.qstn_no_elim_esc, qstn_v.sln_no_elim_esc
		the questions, solutions without to reduce matches
		of the escape character '\'
	 */
	let qstn_v = [];
	let reader = new FileReader();
	reader.onloadend = function() {
		as_rlh( reader.result, qstn_v );
		main_cont1( qstn_v );
	};
	if( file_x ) reader.readAsText( file_x );
}
/* after to construc "qstn_v", prepare the output
   of the next question to the user */
function main_cont1( qstn_v ) {
	if( ! document.querySelector( "#n0" ) ) {
	document.querySelector( "#n2" ).insertAdjacentHTML(
		"beforebegin",
		'<a href = "#" id = n0 download>save</a>' +
		"&nbsp;".repeat(4) +
		'<a href = "#" id = n1>to the start</a>' +
		"&nbsp;".repeat(4) );
	document.querySelector( "#n1" ).onclick = main_loop0;
	}
	prt_qstn(  qstn_v[ choose_qstn( qstn_v ) ], qstn_v  );
	n0_href( qstn_v );
}
function al_rsp( qstn_x, qstn_v ) { return function() {
	let points_x = 0;
	qstn_x.rsp = new Array;
	for( ii in qstn_x.sln )
		qstn_x.rsp[ii] = document.querySelector(
			`#e${ii}`).value;
	points_x = points( qstn_x.rsp, qstn_x.sln,
		qstn_x.qstn );
	qstn_x.points = qstn_points_s( qstn_x.points, points_x );
	if( points_x < 1 )
		prt_incorr( qstn_x, points_x, qstn_v );
	else main_cont1( qstn_v );
}; }
