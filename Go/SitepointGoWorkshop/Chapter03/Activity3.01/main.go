package main

import (
	"fmt"
)
// Sales tax calculator
func main() {
	var cake float32 = 0.99
	var milk float32 = 2.75
	var butter float32 = 0.87
	var totaltax float32 = 0.00

	// Calculate tax for cake
	caketax := cake *.075
	// Calculate tax for cake
	milktax := milk *.015
	// Calculate tax for cake
	buttertax := butter *.02

	totaltax = caketax + milktax + buttertax

	fmt.Println("Sales Tax Total:",totaltax)
	
}