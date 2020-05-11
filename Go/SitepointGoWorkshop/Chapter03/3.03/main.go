package main

import (
	"fmt"
)

func main() {
	// Triggerting number wraparound
	var a int8 = 125
	var b uint8 = 253

	for i := 0; i < 5; i++ {
		a++
		b++
		fmt.Println(i, ")", "int8", a, "uint8", b)
	}

}