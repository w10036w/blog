The string "**PAYPALISHIRING**" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)
```
P   A   H   N   |  /|  /|
A P L S I I G   | / | / |
Y   I   R       |/  |/  |
```


And then read line by line: "**PAHNAPLSIIGYIR**"

Write the code that will take a string and make this conversion given a number of rows:
```js
convert("PAYPALISHIRING", 3) = "PAHNAPLSIIGYIR".
```

**Solution JS (93.43%, 142ms)**
```js
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
  // !!! remember the edge case !!!
  if(s.length<=2 || numRows===1) return s;
  // !!!
  var dist = 2*numRows-2,
      len = dist,
      l = s.length,
      r = 0,
      x = '';
  while(r<numRows){
    for(var i=r;i<l;i+=dist){
      x+=s.charAt(i);
      if(len>0&&len<dist&&i+len<l){
        x+=s.charAt(i+len);
      }
    }
    len-=2;
    r++;
  }
  return x;
};
```