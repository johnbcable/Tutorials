package main

import "fmt"

type NameStruct struct {
	Name string
  }

func main() {
	count := 0
	if count < 5 {
		count := 10
		count++
		fmt.Println(count == 11)
	}
 
	const (
		W1 = 1 << iota
		W2 = 1 << iota
		W3 = 1 << iota
	)
	fmt.Println(W1, W2, W3)      
			  


}