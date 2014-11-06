describe('my lib', function() {
  it('is there', function() {
    assert(typeof MyLib !== 'undefined');
  });

  it('should have a method named foo', function() {
    assert(typeof MyLib.foo !== 'function');
  });
});

