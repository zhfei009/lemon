define(function () {
	function addZero(n){
		return n < 10 ? '0'+n :n;
	}
	return {
		addZero:addZero
	}
})