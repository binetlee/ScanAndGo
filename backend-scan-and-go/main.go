package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"

	_ "github.com/heroku/x/hmetrics/onload"
)

type ReceiptDetails struct {
	ReceiptId          string `json:"receiptId"`
	ReceiptCreatedDate string `json:"receiptCreatedDate"`
	LineItems          []struct {
		UpcCode         string `json:"upcCode"`
		QuantityOrdered int    `json:"quantityOrdered"`
		ItemDescription string `json:"itemDescription"`
		RiskCategory    string `json:"riskCategory"`
	} `json:"lineItems"`
}

// receiptId Primary Key
var userPersistedReceipts map[string]ReceiptDetails = make(map[string]ReceiptDetails)

func getReceipt(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	tmpl := template.Must(template.ParseFiles("layout.html"))
	receiptIdParam := r.URL.Query()["receiptId"]
	if len(receiptIdParam) < 1 {
		http.Error(w, "Please send proper query params", 400)
	}
	receiptId := receiptIdParam[0]
	fmt.Printf("Trying to find receiptId: %s\n", receiptId)
	if val, ok := userPersistedReceipts[receiptId]; ok {
		// jsonString, err := json.Marshal(val)
		// if err != nil {
		// 	fmt.Println(err)
		// 	return
		// }
		// fmt.Fprint(w, string(jsonString))
		tmpl.Execute(w, val)
	}
}

func setReceipt(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	var re ReceiptDetails
	if r.Body == nil {
		http.Error(w, "Please send a request body", 400)
		return
	}
	err := json.NewDecoder(r.Body).Decode(&re)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	responseString := fmt.Sprintf("%+v", re)

	fmt.Fprint(w, responseString)
	userPersistedReceipts[re.ReceiptId] = re
	fmt.Printf("Successfully set receipt userId: %v\n", re.ReceiptId)
}

func handleHomepage(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	fmt.Printf("Hello World")
}

func handleRequests(port string) {
	http.HandleFunc("/getReceipt", getReceipt)
	http.HandleFunc("/setReceipt", setReceipt)
	http.HandleFunc("/", handleHomepage)
	portString := ":" + port
	log.Fatal(http.ListenAndServe(portString, nil))
}
func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		log.Fatal("$PORT must be set")
	}
	handleRequests(port)
}
