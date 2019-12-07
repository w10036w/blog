# KMP 算法

## 总结
- 匹配失败时, 总能够使 pattern 回退到某位置, 使 text 不用回退
- 在字符串比较时，pattern 提供的信息越多，计算复杂度越低。（有兴趣的可以了解一下 Trie 树，这是 text 提供的信息越多，计算复杂度越低的一个例子。）

```js
// PMT (Partial Match Table) calculate
function pmt(str){
  let next = [-1],
      len = str.length,
      i = 1,
      j = -1;
  for (i = 1; i < len; i++) {
    while (str[i] !== str[j+1] && j > -1) {
      j = next[j];
    }
    if (str[j+1] === str[i]) {
      j = j + 1;
    }
    next[i] = j;
  }
  return next;
}

function search(text, pattern) {
  let next = pmt(match),
      m = source.length,
      n = match.length,
      i = 0,
      j = 0,
      res = [];
  while (i < m-n) {
    if (source[i] === match[j]) {
      i++;
      j++;
      if (j === n) {
        res.push(i-n);
        j = next[j-1] + 1;
      }
    } else {
      if (j === 0) {
        i++;
      } else {
        j = next[j-1] + 1;
      }
    }
  }
  return res;
}
```

```java
// 构造 pattern 的最大匹配数表
int[] calculateMaxMatchLengths(String pattern) {
    int[] maxMatchLengths = new int[pattern.length()];
    int maxLength = 0;
    for (int i = 1; i < pattern.length(); i++) {
        while (maxLength > 0 && pattern.charAt(maxLength) != pattern.charAt(i)) {
            maxLength = maxMatchLengths[maxLength - 1]; // ①
        }
        if (pattern.charAt(i) == pattern.charAt(maxLength)) {
            maxLength++; // ②
        }
        maxMatchLengths[i] = maxLength;
    }
    return maxMatchLengths;
}
// 在 text 中寻找 pattern，返回所有匹配的位置开头
List<Integer> search(String text, String pattern) {
    List<Integer> positions = new ArrayList<>();
    int[] maxMatchLengths = calculateMaxMatchLengths(pattern);
    int count = 0;
    for (int i = 0; i < text.length(); i++) {
        while (count > 0 && pattern.charAt(count) != text.charAt(i)) {
            count = maxMatchLengths[count - 1];
        }
        if (pattern.charAt(count) == text.charAt(i)) {
            count++;
        }
        if (count == pattern.length()) {
            positions.add(i - pattern.length() + 1);
            count = maxMatchLengths[count - 1];
        }
    }
    return positions;
}
```