package main

import (
	"fmt"
	"math/rand"
	"strings"
	"time"
)

func main() {
	rand.Seed(time.Now().UnixNano())
	r := rand.Intn(5) + 1
	stars := strings.Repeat("*", r)
	fmt.Println(stars)

	firstname := "Bob"
	familyname := "Smith"
	age := 34
	peanutallergy := false

	fmt.Println(firstname)
	fmt.Println(familyname)
	fmt.Println(age)
	fmt.Println(peanutallergy)

}