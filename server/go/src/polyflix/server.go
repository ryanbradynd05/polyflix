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
	sMovies := router.PathPrefix("/movies").Subrouter().StrictSlash(true)
	sMovies.HandleFunc("/search/{id}", controllers.MoviesSearchHandler).Methods("GET")
	sMovies.HandleFunc("/info/{id}", controllers.MoviesInfoHandler).Methods("GET")
	sMovies.HandleFunc("/{id}", controllers.MoviesShowHandler).Methods("GET")
	sMovies.HandleFunc("/{id}", controllers.MoviesUpdateHandler).Methods("PUT")
	sMovies.HandleFunc("/{id}", controllers.MoviesDestroyHandler).Methods("DELETE")
	sMovies.HandleFunc("/", controllers.MoviesIndexHandler).Methods("GET")
	sMovies.HandleFunc("/", controllers.MoviesCreateHandler).Methods("POST")
	http.Handle("/", router)
	http.ListenAndServe(url, nil)
}
