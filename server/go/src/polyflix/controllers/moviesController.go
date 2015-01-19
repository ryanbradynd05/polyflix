package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/jinzhu/gorm"
	"net/http"
	"polyflix/models"
	"strconv"
)

type MoviesController struct {
	DB gorm.DB
}

func (c *MoviesController) IndexHandler(res http.ResponseWriter, req *http.Request) {
	var result = c.DB.Find(&models.Movie{})
	jsonRes, err := json.MarshalIndent(result, "", "  ")
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(res, string(jsonRes))
}

func (c *MoviesController) ShowHandler(res http.ResponseWriter, req *http.Request) {
	id, _ := strconv.Atoi(req.FormValue("id"))
	var result = c.DB.Where("id = ?", id).First(&models.Movie{})
	jsonRes, err := json.MarshalIndent(result, "", "  ")
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(res, string(jsonRes))
}

func (c *MoviesController) CreateHandler(res http.ResponseWriter, req *http.Request) {
	title := req.FormValue("title")
	themoviedbid, _ := strconv.Atoi(req.FormValue("themoviedbid"))
	movie := models.Movie{Title: title, Themoviedbid: themoviedbid}
	var result = c.DB.Create(&movie)
	jsonRes, err := json.MarshalIndent(result, "", "  ")
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(res, string(jsonRes))
}

func (c *MoviesController) UpdateHandler(res http.ResponseWriter, req *http.Request) {
}

func (c *MoviesController) DestroyHandler(res http.ResponseWriter, req *http.Request) {
	id, _ := strconv.Atoi(req.FormValue("id"))
	var result = c.DB.Where("id = ?", id).Delete(&models.Movie{})
	jsonRes, err := json.MarshalIndent(result, "", "  ")
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(res, string(jsonRes))
}

func (c *MoviesController) SearchHandler(res http.ResponseWriter, req *http.Request) {
}

func (c *MoviesController) InfoHandler(res http.ResponseWriter, req *http.Request) {
}
