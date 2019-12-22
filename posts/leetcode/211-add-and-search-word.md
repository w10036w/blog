## [211. Add and Search Word - Data structure design](https://leetcode.com/problems/add-and-search-word-data-structure-design/)

Design a data structure that supports the following two operations:
```js
void addWord(word)
bool search(word)
```
search(word) can search a literal word or a regular expression string containing only letters a-z or .. A . means it can represent any one letter.

Example:
```js
addWord("bad")
addWord("dad")
addWord("mad")
search("pad") -> false
search("bad") -> true
search(".ad") -> true
search("b..") -> true
```
Note:

You may assume that all words are consist of lowercase letters a-z.

My solution

```js
/**
 * Initialize your data structure here.
 */
var WordDictionary = function() {
  this.dict=new Map()
};

/**
 * Adds a word into the data structure. 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
  let dict = this.dict
  const l = word.length
  if (dict.has(l)) dict.get(l).push(word)
  else dict.set(l, [word])
};

/**
 * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter. 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
  let l = word.length
  let dict = this.dict
  if (!dict.has(l)) return false
  return dict.get(l).some(e => {
    let i = l
    while(--i>=0) {
      if (word[i]==='.' || word[i]===e[i]) continue;
      return false
    }
    return true
  })
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
```
follow up: TreeNode
