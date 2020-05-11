package main

import (
	"fmt"
)

func loanCalculator(creditscore, loanterm, income, loanamount, applicant int ) () {

	var maxmonthly, monthlypayment float32 = 0,0
	rate := 0
	totalcost := 0
	approved := true
	// Check if entry parameters have been met
	if creditscore < 0 || income < 0 || loanamount < 0 || loanterm < 0 {
		fmt.Println("Credit score, monthly income, loan amount, or loan term is less than 0")
		return
	} 
	if loanterm%12 != 0 {
		fmt.Println("The term of the loan is not divisible by 12 months")
		return
	}
	// Entry parameters validated - now do calulation and print result
	if creditscore >= 450 {
		rate = 15
		maxmonthly = float32(income) / float32(5)
	} else {
		rate = 20
		maxmonthly = float32(income) / float32(10)
	}
	monthlypayment = float32(loanamount) / float32(loanterm)
	if monthlypayment > maxmonthly {
		approved = false
	}
	totalcost = int(float32(loanamount) * float32(rate) * float32(loanterm))

	fmt.Println("Applicant ", applicant)
	fmt.Println("-----------")
	fmt.Println("Credit Score       : ",creditscore)
	fmt.Println("Income             : ",income)
	fmt.Println("Loan Amount        : ",loanamount)
	fmt.Println("Loan Term          : ",loanterm)
	fmt.Println("Monthly Payment    : ",monthlypayment)
	fmt.Println("Rate               : ",rate)
	fmt.Println("Total Cost         : ",totalcost)
	fmt.Println("Approved           : ",approved)

	return 
}
func main() {
	// First set of data
	creditscore := 500
	income := 1000
	loanamount := 1000
	loanterm := 24
	// Now calculate the deal for these parameters

	loanCalculator(creditscore, loanterm, income, loanamount, 1); 
	// Second set of data
	creditscore = 350
	income = 1000
	loanamount = 10000
	loanterm = 12

	// Now calculate the deal for these parameters
	loanCalculator(creditscore, loanterm, income, loanamount, 2); 

}