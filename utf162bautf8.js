function utf162bautf8( xx ) {
	xx = xx.charCodeAt();
	if( xx < 0x80 ) return "%" + xx.toString(16);
	if( xx > 0x80 && xx < 0x7FF ) return
		"%" + ( ( xx >>> 6 ) + 0xC0 ).toString(16) +
		"%" + ( xx - (xx >>> 6 << 6) + 0x10 ).toString(16)
	else { console.log("carácter desconocido"); return 1; }
}
