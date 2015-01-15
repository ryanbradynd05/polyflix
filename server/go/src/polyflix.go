package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

var (
    url = "localhost:3000"
)
type ArrayPayload struct {
    Movies Movies `json:"movies"`
}

type SinglePayload struct {
    Movie Movie `json:"movie"`
}

type Movies []Movie

type Movie struct {
    Title string `json:"title"`
    Themoviedbid int `json:"themoviedbid"`
}

func main() {
    http.HandleFunc("/", serveRest)
    http.ListenAndServe(url,nil)
}

func serveRest(w http.ResponseWriter, r *http.Request) {
    response, err := getJsonResponse()
    fmt.Printf(string(response))
    if err != nil {
        panic(err)
    }

    fmt.Fprintf(w, string(response))
}

func getJsonResponse() ([] byte, error) {
    // Single Payload
    // movie := Movie{"Fight Club", 550}
    // p := SinglePayload{movie}

    // Array Payload
    movie1 := Movie{"Fight Club", 550}
    movie2 := Movie{"The Matrix", 120}
    movies := []Movie{movie1, movie2}
    p := ArrayPayload{movies}
    return json.MarshalIndent(p, "", "  ")
}