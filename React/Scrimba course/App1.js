import React from "react"

/*
import Header from "./components/Header.js"
import MainContent from "./components/MainContent.js"
import Footer from "./components/Footer.js"
*/ 

function App() {
    // Put any javascript you needf to evaluate here before the return if possible
    const date = new Date()
    const hours = date.getHours()
    let timeOfDay

    const styles = {
        color: "#FF8C00",
        backgroundColor: "#FF2D00"
    }

    if (hours < 12) {
        timeOfDay = "morning"
        styles.color = "#04756F"
    } else if (hours >= 12 && hours < 17) {
        timeOfDay = "afternoon"
        styles.color = "#8914A3"
    } else (if hours > 17 && hours < 23) {
        timeOfDay = "evening"
    } else {
        timeOfDay = "night"
        styles.color = "#D90000"
    }

 

    return (
        <div>
            // inline styles need to be wrapped in double curly braces e.g. style={{color:black}}
            // Also styles with hyphens (background-color) convert to camelCase (backgroundColor)
            // Styles can be defined in constants above the return statement, then:
            <h1 style={styles}>Good {timeOfDay}</h1>
        </div>
    )
}

// Function can ONLY return ONE thing hence enclosing div
