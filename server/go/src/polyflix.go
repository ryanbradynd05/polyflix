package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

var url = "localhost:3000"

func main() {
    http.HandleFunc("/", serveRest)
    http.ListenAndServe(url,nil)
}

func serveRest(w http.ResponseWriter, r *http.Request) {
    response, err := getJsonResponse()
    if err != nil {
        panic(err)
    }

    fmt.Fprintf(w, string(response))
}

func getJsonResponse() ([] byte, error) {
    return json.MarshalIndent(nil, "", "  ")
}