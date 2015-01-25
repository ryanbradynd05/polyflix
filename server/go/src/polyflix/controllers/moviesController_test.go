package controllers_test

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	. "gopkg.in/check.v1"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"polyflix"
	. "polyflix/controllers"
	"testing"
	"time"
)

var (
	now    = time.Now()
	movie1 = Movie{Title: "Fury", Themoviedbid: 228150, CreatedAt: now, UpdatedAt: now}
	movie2 = Movie{Title: "Interstellar", Themoviedbid: 157336, CreatedAt: now, UpdatedAt: now}
)

// Hook up gocheck into the "go test" runner.
func Test(t *testing.T) { TestingT(t) }

type MovieControllerSuite struct {
	server *httptest.Server
	router *mux.Router
	db     gorm.DB
}

var _ = Suite(&MovieControllerSuite{})

func (s *MovieControllerSuite) SetUpSuite(c *C) {
	env := "test"
	dbConn := main.GetDbConn(env)
	s.db = main.DbInit(dbConn)
	s.router = main.Handlers(s.db)
	s.server = httptest.NewServer(s.router)
	s.db.Where(Movie{Themoviedbid: 228150}).FirstOrCreate(&movie1)
	s.db.Where(Movie{Themoviedbid: 157336}).FirstOrCreate(&movie2)
}

func (s *MovieControllerSuite) TearDownSuite(c *C) {
	s.server.Close()
}

func (s *MovieControllerSuite) TestMovie(c *C) {
	movie := Movie{Title: "Fight Club", Themoviedbid: 500}
	c.Assert(movie.Title, FitsTypeOf, string("Fight Club"))
	c.Assert(movie.Themoviedbid, FitsTypeOf, int(500))
	c.Assert(movie, FitsTypeOf, Movie{})
}

func (s *MovieControllerSuite) TestSinglePayload(c *C) {
	movie := Movie{Title: "Fight Club", Themoviedbid: 500}
	payload := SinglePayload{Movie: movie}
	c.Assert(payload.Movie.Title, FitsTypeOf, string("Fight Club"))
	c.Assert(payload.Movie.Themoviedbid, FitsTypeOf, int(500))
	c.Assert(payload.Movie, FitsTypeOf, Movie{})
	c.Assert(payload, FitsTypeOf, SinglePayload{})
}

func (s *MovieControllerSuite) TestArrayPayload(c *C) {
	movie := Movie{Title: "Fight Club", Themoviedbid: 500}
	movies := []Movie{movie}
	payload := ArrayPayload{Movies: movies}
	c.Assert(payload.Movies[0].Title, FitsTypeOf, string("Fight Club"))
	c.Assert(payload.Movies[0].Themoviedbid, FitsTypeOf, int(500))
	c.Assert(payload.Movies[0], FitsTypeOf, Movie{})
	c.Assert(payload, FitsTypeOf, ArrayPayload{})
}

func (s *MovieControllerSuite) TestIndexHandler(c *C) {
	recorder := httptest.NewRecorder()
	url := fmt.Sprintf("%s/movies/", s.server.URL)
	req, err := http.NewRequest("GET", url, nil)
	c.Assert(err, IsNil)

	s.router.ServeHTTP(recorder, req)
	c.Assert(recorder.Code, Equals, http.StatusOK)

	var payload ArrayPayload
	// fmt.Printf("%v\n", recorder.Body.String())
	contents, err := ioutil.ReadAll(recorder.Body)
	json.Unmarshal(contents, &payload)

	c.Assert(len(payload.Movies), Equals, 2)
}

func (s *MovieControllerSuite) TestShowHandler(c *C) {
	controller := MoviesController{DB: s.db}
	recorder := httptest.NewRecorder()
	url := fmt.Sprintf("%s/movies/1", s.server.URL)
	req, err := http.NewRequest("GET", url, nil)
	c.Assert(err, IsNil)

	controller.ShowHandler(recorder, req)

	s.router.ServeHTTP(recorder, req)
	c.Assert(recorder.Code, Equals, http.StatusOK)
}

func (s *MovieControllerSuite) TestDestroyHandler(c *C) {
	controller := MoviesController{DB: s.db}
	recorder := httptest.NewRecorder()
	url := fmt.Sprintf("%s/movies/1", s.server.URL)
	req, err := http.NewRequest("DELETE", url, nil)
	c.Assert(err, IsNil)

	s.router.ServeHTTP(recorder, req)
	c.Assert(recorder.Code, Equals, http.StatusOK)
}
