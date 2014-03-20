var assert = chai.assert;

suite('ELEMENTOS', function(){
  // Probar que bexec funciona 
  test('bexec()', function(){
    var input_str = "testeo";
	var regexp = /eo/;
	regexp.lastIndex = 0;

	assert.equal(regexp.bexec(input_str), null);
  });

// Probar String.tokens sobre una cadena.
  test('Cadena de Elementos', function(){
    var input_str = "var Laura = Tareq;";
    var esperado_str = "[{\"type\":\"ID\",\"value\":\"var\",\"from\":0,\"to\":3},{\"type\":\"ID\",\"value\":\"Laura\",\"from\":4,\"to\":9},{\"type\":\"=\",\"value\":\"=\",\"from\":10,\"to\":11},{\"type\":\"ID\",\"value\":\"Tareq\",\"from\":12,\"to\":17},{\"type\":\";\",\"value\":\";\",\"from\":17,\"to\":18}]";
	var resultado_str = JSON.stringify(input_str.tokens());

	assert.equal(esperado_str, resultado_str);
  });
  
   // Probar un error Cadena.
  test('Cadena de Elementos: error', function(){
    var input_str = "#ERROR#";
	var resultado_str = "Syntax error near '#ERROR#'";

    chai.expect(function () { input_str.tokens() }).to.throw(resultado_str);
  });
  
});