
// http://www.ghb.by/ru/construction/price_apartments/

function decode(str) {
	return str
			.replace(/&laquo;/g, "«")
			.replace(/&raquo;/g, "»")
			.replace(/&quot;/g, "\"")
			.replace(/&apos;/g, "'")
			.replace(/&amp;/g, "&");
}

function main() {
    var result = {
        success: true
    };
	var response = AnyBalance.requestGet('http://www.ghb.by/ru/construction/price_apartments/');
	var regexp = new RegExp('<h3><a.+>(.*)</a></h3>|<h3>(.*)</h3>','gi');
	for (var i = 1; i <= 10; i++) {	
		var matches = regexp.exec(response);
       	AnyBalance.trace(matches[0], "Found for #" + i);
		if (matches) {
			if (AnyBalance.isAvailable('construction' + i)) {
				if (matches[1]) {
					result['construction' + i] = decode(matches[1]); 
				} else if (matches[2]) {
					result['construction' + i] = decode(matches[2]); 
				} else {
					result['construction' + i] = "???"; 
				}
			}
		} else {
			result['construction' + i] = "---"; 
		}
	}

	AnyBalance.setResult(result);
}
