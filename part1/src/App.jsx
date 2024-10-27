const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const name = 'Petaaah'
  const age = 23
  return (
    <div>
      <h1>Greetings</h1>

      <Hello name = "Jeoffrey" age = {26 + 10}/>
      <Hello age = {age} name = {name}/>
      <Hello />
    </div>
  )
}

export default App