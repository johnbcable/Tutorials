package main

import (
	"fmt"
)

func main() {
	words := map[string]int{
		"Gonna": 3,
		"You": 3,
		"Give": 2,
		"Never": 1,
		"Up": 4,
	}

	wordwithhighestcount := ""
	curcount := 0

	// Maps do not give gurantees over the order of iteration
	// and the do not have gaps
	for key, value := range words {
		if words[key] > curcount {
			wordwithhighestcount = key
			curcount = value
		}
	}
	fmt.Println("Most popular word:",wordwithhighestcount)
	fmt.Println("With a count of:",curcount)
}
