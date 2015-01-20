package main

import (
	"github.com/gorilla/mux"
	"net/http"
	"polyflix/controllers"
	"polyflix/database"
)

var (
	url = "localhost:3000"
)

func main() {
	http.Handle("/", Handlers())
	http.ListenAndServe(url, nil)
}

func Handlers() *mux.Router {
	db := database.New()
	router := mux.NewRouter().StrictSlash(true)
	movies := router.PathPrefix("/movies").Subrouter().StrictSlash(true)
	moviesController := controllers.MoviesController{DB: db}
	movies.HandleFunc("/search/{id}", moviesController.SearchHandler).Methods("GET")
	movies.HandleFunc("/info/{id}", moviesController.InfoHandler).Methods("GET")
	movies.HandleFunc("/{id}", moviesController.ShowHandler).Methods("GET")
	movies.HandleFunc("/{id}", moviesController.UpdateHandler).Methods("PUT")
	movies.HandleFunc("/{id}", moviesController.DestroyHandler).Methods("DELETE")
	movies.HandleFunc("/", moviesController.IndexHandler).Methods("GET")
	movies.HandleFunc("/", moviesController.CreateHandler).Methods("POST")

	return router
}
