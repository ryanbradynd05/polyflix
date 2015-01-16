package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"polyflix/models"
)

type ArrayPayload struct {
	Movies []models.Movie `json:"movies"`
}

type SinglePayload struct {
	Movie models.Movie `json:"movie"`
}

func MoviesIndexHandler(res http.ResponseWriter, req *http.Request) {
	movie1 := models.Movie{"Fight Club", 550}
	movie2 := models.Movie{"The Matrix", 120}
	movies := []models.Movie{movie1, movie2}
	p := ArrayPayload{movies}
	jsonRes, err := json.MarshalIndent(p, "", "  ")
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(res, string(jsonRes))
}

func MoviesShowHandler(res http.ResponseWriter, req *http.Request) {
}

func MoviesCreateHandler(res http.ResponseWriter, req *http.Request) {
}

func MoviesUpdateHandler(res http.ResponseWriter, req *http.Request) {
}

func MoviesDestroyHandler(res http.ResponseWriter, req *http.Request) {
}

func MoviesSearchHandler(res http.ResponseWriter, req *http.Request) {
}

func MoviesInfoHandler(res http.ResponseWriter, req *http.Request) {
}
