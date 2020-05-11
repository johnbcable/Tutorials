package main
// Samnple solution from Golang web site
 import (
 	"fmt"
 )

 func bubbleSort(tosort []int) {
 	size := len(tosort)
 	if size < 2 {
 		return
 	}
 	for i := 0; i < size; i++ {
 		for j := size - 1; j >= i+1; j-- {
 			if tosort[j] < tosort[j-1] {
 				tosort[j], tosort[j-1] = tosort[j-1], tosort[j]
 			}
 		}
 	}
 }

 func main() {
 	unsorted := []int{5, 8, 2, 4, 0, 1, 3, 7, 9, 6}
 	
 	fmt.Println("Before : ", unsorted)
 	
 	bubbleSort(unsorted)
 	
 	fmt.Println("After : ", unsorted)
 }