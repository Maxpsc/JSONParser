# JSONParser
a simple function to do json.parse()

## example  
```
  parser('{"a":1,"b":"b","c":true,"d":null,"e":[1,2],"f":{"a":1}}')
  // => { a: 1, b: 'b', c: true, d: null, e: [ 1, 2 ], f: { a: 1 } }
  parser('[1,2,[1,2],3]')
  // => [ 1, 2, [ 1, 2 ], 3 ]
```

## todo
  - support parsing escape char(\n) and Uniocode(\u6211) 
  - add more error dealings
  - implent JSON.stringify()
  
