import React from "react"

function Joke (props) {
    return (
        <div>
            {props.question}<br />
            {props.punchline}
        </div>
    )
}
export default Joke 
