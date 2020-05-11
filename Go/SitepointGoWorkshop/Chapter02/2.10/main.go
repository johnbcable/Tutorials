package main

import (
	"fmt"
)

func main() {
	config := make(map[string]string)

	config["debug"] =  "1"
	config["logLevel"] = "warn"
	config["version"] = "1.2.1"

	// Maps do not give gurantees over the order of iteration
	// and the do not have gaps
	for key, value := range config {
		fmt.Println(key, "=", value)
	}
}
