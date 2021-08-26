const todos = [
  {text: "Eu sou o caminho, a verdade, e a vida", author: "Jesus"},
  {text: "Tu és o messias, o Filho do Deus vivo", author: "Pedro"}
]

// console.log(JSON.stringify(todos))

localStorage.setItem('todos', JSON.stringify(todos))

const stored = localStorage.getItem('todos')

console.log(JSON.parse(stored))
