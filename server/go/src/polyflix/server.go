package main

import (
	"github.com/gorilla/mux"
	"net/http"
	"polyflix/controllers"
)

var (
	url = "localhost:3000"
)

func main() {
	router := mux.NewRouter().StrictSlash(true)
	movies := router.PathPrefix("/movies").Subrouter().StrictSlash(true)
	movies.HandleFunc("/search/{id}", controllers.MoviesSearchHandler).Methods("GET")
	movies.HandleFunc("/info/{id}", controllers.MoviesInfoHandler).Methods("GET")
	movies.HandleFunc("/{id}", controllers.MoviesShowHandler).Methods("GET")
	movies.HandleFunc("/{id}", controllers.MoviesUpdateHandler).Methods("PUT")
	movies.HandleFunc("/{id}", controllers.MoviesDestroyHandler).Methods("DELETE")
	movies.HandleFunc("/", controllers.MoviesIndexHandler).Methods("GET")
	movies.HandleFunc("/", controllers.MoviesCreateHandler).Methods("POST")
	http.Handle("/", router)
	http.ListenAndServe(url, nil)
}
