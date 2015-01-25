package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/jinzhu/gorm"
	"net/http"
	"strconv"
	"time"
)

// ArrayPayload struct to hold multiple movies for JSON marshalling
type ArrayPayload struct {
	Movies []Movie `json:"movies"`
}

// SinglePayload struct to hold a single movie for JSON marshalling
type SinglePayload struct {
	Movie Movie `json:"movie"`
}

// Movie type for movie objects
type Movie struct {
	Id           int64     `json:"id",gorm:"primary_key:yes"`
	CreatedAt    time.Time `json:"createdAt",gorm:"column:createdAt"`
	UpdatedAt    time.Time `json:"updatedAt",gorm:"column:updatedAt"`
	Title        string    `json:"title"`
	Themoviedbid int       `json:"themoviedbid"`
}

// MoviesController controller for the movies subroute
type MoviesController struct {
	DB gorm.DB
}

// IndexHandler handles GET to /movies/
func (c *MoviesController) IndexHandler(res http.ResponseWriter, req *http.Request) {
	var movies []Movie
	c.DB.Find(&movies)
	payload := ArrayPayload{Movies: movies}
	jsonRes, err := json.MarshalIndent(payload, "", "  ")
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(res, string(jsonRes))
}

// ShowHandler handles GET to /movies/{id}
func (c *MoviesController) ShowHandler(res http.ResponseWriter, req *http.Request) {
	id, _ := strconv.Atoi(req.FormValue("id"))
	var result = c.DB.Where("id = ?", id).First(&Movie{})
	jsonRes, err := json.MarshalIndent(result, "", "  ")
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(res, string(jsonRes))
}

// CreateHandler handles POST to /movies/
func (c *MoviesController) CreateHandler(res http.ResponseWriter, req *http.Request) {
	title := req.FormValue("title")
	themoviedbid, _ := strconv.Atoi(req.FormValue("themoviedbid"))
	movie := Movie{Title: title, Themoviedbid: themoviedbid}
	var result = c.DB.Create(&movie)
	jsonRes, err := json.MarshalIndent(result, "", "  ")
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(res, string(jsonRes))
}

// UpdateHandler handles PUT to /movies/{id}
func (c *MoviesController) UpdateHandler(res http.ResponseWriter, req *http.Request) {
	title := req.FormValue("title")
	themoviedbid, _ := strconv.Atoi(req.FormValue("themoviedbid"))
	movie := Movie{Title: title, Themoviedbid: themoviedbid}
	var result = c.DB.Model(&Movie{}).UpdateColumns(&movie)
	jsonRes, err := json.MarshalIndent(result, "", "  ")
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(res, string(jsonRes))
}

// DestroyHandler handles DELETE to /movies/{id}
func (c *MoviesController) DestroyHandler(res http.ResponseWriter, req *http.Request) {
	id, _ := strconv.Atoi(req.FormValue("id"))
	var result = c.DB.Where("id = ?", id).Delete(&Movie{})
	jsonRes, err := json.MarshalIndent(result, "", "  ")
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(res, string(jsonRes))
}

// SearchHandler handles GET to /movies/search/{id}
func (c *MoviesController) SearchHandler(res http.ResponseWriter, req *http.Request) {
}

// InfoHandler handles GET to /movies/info/{id}
func (c *MoviesController) InfoHandler(res http.ResponseWriter, req *http.Request) {
}
