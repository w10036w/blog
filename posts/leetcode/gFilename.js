function fn(title) {
  return title.toLowerCase().replace(/(\.)?\s+/g, '-')
}

const name=''

const filename = fn(name)
console.log(filename)