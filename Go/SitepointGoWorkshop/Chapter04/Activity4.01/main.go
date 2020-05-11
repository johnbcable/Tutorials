package main

import (
	"fmt"
)

func main() {
	var arr [10]int
	for i := 0; i < len(arr); i++ {
		arr[i] = i + 1
	}
	fmt.Println(arr)
}