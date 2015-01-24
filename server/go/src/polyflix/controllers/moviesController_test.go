package controllers_test

import (
	"fmt"
	"github.com/jinzhu/gorm"
	. "gopkg.in/check.v1"
	"net/http"
	"net/http/httptest"
	"polyflix"
	. "polyflix/controllers"
	"testing"
)

var (
	url    = "localhost:3000"
	dbConn string
)

// Hook up gocheck into the "go test" runner.
func Test(t *testing.T) { TestingT(t) }

type MovieControllerSuite struct {
	server *httptest.Server
	db     gorm.DB
}

var _ = Suite(&MovieControllerSuite{})

func (s *MovieControllerSuite) SetUpSuite(c *C) {
	env := "test"
	dbConn := main.GetDbConn(env)
	s.db = main.DbInit(dbConn)
	s.server = httptest.NewServer(main.Handlers(s.db))
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
	controller := MoviesController{DB: s.db}
	recorder := httptest.NewRecorder()
	url := fmt.Sprintf("%s/movies", s.server.URL)
	req, err := http.NewRequest("GET", url, nil)
	c.Assert(err, IsNil)

	controller.IndexHandler(recorder, req)

	c.Assert(recorder.Code, Equals, 200)
}

func (s *MovieControllerSuite) TestShowHandler(c *C) {
	controller := MoviesController{DB: s.db}
	recorder := httptest.NewRecorder()
	url := fmt.Sprintf("%s/movies/1", s.server.URL)
	req, err := http.NewRequest("GET", url, nil)
	c.Assert(err, IsNil)

	controller.ShowHandler(recorder, req)

	c.Assert(recorder.Code, Equals, 200)
}

func (s *MovieControllerSuite) TestDestroyHandler(c *C) {
	controller := MoviesController{DB: s.db}
	recorder := httptest.NewRecorder()
	url := fmt.Sprintf("%s/movies/1", s.server.URL)
	req, err := http.NewRequest("DELETE", url, nil)
	c.Assert(err, IsNil)

	controller.ShowHandler(recorder, req)

	c.Assert(recorder.Code, Equals, 200)
}
