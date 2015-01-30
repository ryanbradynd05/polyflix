package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	"github.com/ryanbradynd05/go-tmdb"
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
	ID           int64     `json:"id" gorm:"column:id"`
	CreatedAt    time.Time `json:"createdAt" gorm:"column:createdAt"`
	UpdatedAt    time.Time `json:"updatedAt" gorm:"column:updatedAt"`
	Title        string    `json:"title"`
	Themoviedbid int       `json:"themoviedbid"`
}

// MoviesController controller for the movies subroute
type MoviesController struct {
	DB   gorm.DB
	TMDB *tmdb.TMDb
}

// GetVar returns URL value from mux request
func GetVar(req *http.Request, varName string) string {
	vars := mux.Vars(req)
	return vars[varName]
}

// ReturnJSON converts payload to JSON and writes to response
func (c *MoviesController) ReturnJSON(res http.ResponseWriter, payload interface{}) {
	jsonRes, _ := json.MarshalIndent(payload, "", "  ")
	fmt.Fprintf(res, string(jsonRes))
}

// IndexHandler handles GET to /movies/
func (c *MoviesController) IndexHandler(res http.ResponseWriter, req *http.Request) {
	var movies []Movie
	c.DB.Find(&movies)
	payload := ArrayPayload{Movies: movies}
	c.ReturnJSON(res, payload)
}

// ShowHandler handles GET to /movies/{id}
func (c *MoviesController) ShowHandler(res http.ResponseWriter, req *http.Request) {
	var movie Movie
	id := GetVar(req, "id")
	c.DB.Where("id = ?", id).First(&movie)
	payload := SinglePayload{Movie: movie}
	c.ReturnJSON(res, payload)
}

// CreateHandler handles POST to /movies/
func (c *MoviesController) CreateHandler(res http.ResponseWriter, req *http.Request) {
	var incomingPayload SinglePayload
	json.NewDecoder(req.Body).Decode(&incomingPayload)
	movie := incomingPayload.Movie
	now := time.Now()
	movie.CreatedAt = now
	movie.UpdatedAt = now
	c.DB.Create(&movie)
	payload := SinglePayload{Movie: movie}
	c.ReturnJSON(res, payload)
}

// UpdateHandler handles PUT to /movies/{id}
func (c *MoviesController) UpdateHandler(res http.ResponseWriter, req *http.Request) {
	id := GetVar(req, "id")
	var oldMovie Movie
	c.DB.Where("id = ?", id).First(&oldMovie)

	var incomingPayload SinglePayload
	json.NewDecoder(req.Body).Decode(&incomingPayload)
	newMovie := incomingPayload.Movie
	newMovie.CreatedAt = oldMovie.CreatedAt
	newMovie.UpdatedAt = time.Now()
	c.DB.Model(&oldMovie).Updates(&newMovie)

	var updatedMovie Movie
	c.DB.Where("id = ?", id).First(&updatedMovie)
	payload := SinglePayload{Movie: updatedMovie}
	c.ReturnJSON(res, payload)
}

// DestroyHandler handles DELETE to /movies/{id}
func (c *MoviesController) DestroyHandler(res http.ResponseWriter, req *http.Request) {
	id := GetVar(req, "id")
	var movie Movie
	c.DB.Where("id = ?", id).Delete(&movie)
	fmt.Fprintf(res, "{}")
}

// SearchHandler handles GET to /movies/search/{name}
func (c *MoviesController) SearchHandler(res http.ResponseWriter, req *http.Request) {
	name := GetVar(req, "name")
	result, _ := c.TMDB.SearchMovie(name)
	jsonResult, _ := tmdb.ToJSON(result)
	fmt.Fprintf(res, jsonResult)
}

// InfoHandler handles GET to /movies/info/{id}
func (c *MoviesController) InfoHandler(res http.ResponseWriter, req *http.Request) {
	id, _ := strconv.Atoi(GetVar(req, "id"))
	result, _ := c.TMDB.GetMovieInfo(id)
	jsonResult, _ := tmdb.ToJSON(result)
	fmt.Fprintf(res, jsonResult)
}
