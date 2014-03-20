var assert = chai.assert;

suite('Tokens', function(){
  // Comprobamos que funciona el metodo bexec
  test('RegExp.bexec()', function(){
    var cadena_entrada = "test";
	var regexp = /ba/;
	regexp.lastIndex = 0;

	assert.equal(regexp.bexec(cadena_entrada), null);
  });

  // Comprobar que String.tokens opera correctamente sobre una String valida.
  test('String.tokens()', function(){
    var cadena_entrada = "var a = b;";
    var esperado_str = "[{\"type\":\"name\",\"value\":\"var\",\"from\":0,\"to\":3},{\"type\":\"name\",\"value\":\"a\",\"from\":4,\"to\":5},{\"type\":\"operator\",\"value\":\"=\",\"from\":6,\"to\":7},{\"type\":\"name\",\"value\":\"b\",\"from\":8,\"to\":9},{\"type\":\"operator\",\"value\":\";\",\"from\":9,\"to\":10}]";
	var resultado_str = JSON.stringify(cadena_entrada.tokens());

	assert.equal(esperado_str, resultado_str);
  });
  
  // Probar error
  test('String.tokens(): Exccepción de error', function(){
    var input_str = "#ERROR#";
	var resultado_str = "Syntax error near '#ERROR#'";

    chai.expect(function () { input_str.tokens() }).to.throw(resultado_str);
  });
});

suite('Parser', function(){
  // Probamos el parser.
  test('Parser', function(){
    var parse = make_parse();
	var input_str = "var a = 20;";
	var esperado_str = "{\n    \"value\": \"=\",\n    \"arity\": \"binary\",\n    \"first\": {\n        \"value\": \"a\",\n        \"arity\": \"name\"\n    },\n    \"second\": {\n        \"value\": 20,\n        \"arity\": \"literal\"\n    }\n}";

	var resultado_str, tree;
    try {
      tree = parse(input_str);
      resultado_str = JSON.stringify(tree, ['key', 'name', 'message',
           'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    } catch (e) {
      resultado_str = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
              'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    }

	assert.equal(esperado_str, resultado_str);
  });
  
  // Probamos el parser con errores.
  test('Parser: Errores', function(){
    var parse = make_parse();
	var input_str = "error = $;";
	var esperado_str = "\"Syntax error near \'$;\'\"";

	var resultado_str, tree;
    try {
      tree = parse(input_str);
      resultado_str = JSON.stringify(tree, ['key', 'name', 'message',
           'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    } catch (e) {
      resultado_str = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
              'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    }

	assert.equal(esperado_str, resultado_str);
  });
});

