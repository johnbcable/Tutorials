package main

import "fmt"

func main() {
	a, b := 5, 10
	// call swap here
	swap(&a, &b)
	fmt.Println(a == 10, b == 5)
}

func swap(a *int, b *int) {
	// swap the values here
	var temp int
	temp = *a
	*a = *b
	*b = temp
}
