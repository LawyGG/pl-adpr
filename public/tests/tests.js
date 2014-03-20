var assert = chai.assert;

suite('ELEMENTOS', function(){
  // Probar que bexec funciona 
  test('bexec()', function(){
    var input_str = "testeo";
	var regexp = /eo/;
	regexp.lastIndex = 0;

	assert.equal(regexp.bexec(input_str), null);
  });

});