import React from "react"
import ReactDOM from "react-dom"

// Nested components. 
// Start with app-level component
import App from "./App"

// EXAMPLE
//   ReactDOM.render(WHAT DO I WANT TO render, WHERE DO I WANT TO RENDER IT)
//

// JSX
ReactDOM.render(<App />, document.getElementById("root"))

// The frist parameter to render MUST be just one thing. So, to have a paragraph as 
// well as a heading, both need to be wrapped in the same enclosing element, for example:
// ReactDOM.render(<div><h1>Hello World!</h1><p>This is a paragraph</p></div> document.getElementById("root"))