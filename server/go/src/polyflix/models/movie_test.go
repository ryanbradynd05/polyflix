package models_test

import (
	. "gopkg.in/check.v1"
	. "polyflix/models"
	"testing"
)

// Hook up gocheck into the "go test" runner.
func Test(t *testing.T) { TestingT(t) }

type MovieSuite struct{}

var _ = Suite(&MovieSuite{})

func (s *MovieSuite) TestMovie(c *C) {
	movie := Movie{Title: "Fight Club", Themoviedbid: 500}
	c.Assert(movie.Title, FitsTypeOf, string("Fight Club"))
	c.Assert(movie.Themoviedbid, FitsTypeOf, int(500))
	c.Assert(movie, FitsTypeOf, Movie{})
}

func (s *MovieSuite) TestSinglePayload(c *C) {
	movie := Movie{Title: "Fight Club", Themoviedbid: 500}
	payload := SinglePayload{Movie: movie}
	c.Assert(payload.Movie.Title, FitsTypeOf, string("Fight Club"))
	c.Assert(payload.Movie.Themoviedbid, FitsTypeOf, int(500))
	c.Assert(payload.Movie, FitsTypeOf, Movie{})
	c.Assert(payload, FitsTypeOf, SinglePayload{})
}

func (s *MovieSuite) TestArrayPayload(c *C) {
	movie := Movie{Title: "Fight Club", Themoviedbid: 500}
	movies := []Movie{movie}
	payload := ArrayPayload{Movies: movies}
	c.Assert(payload.Movies[0].Title, FitsTypeOf, string("Fight Club"))
	c.Assert(payload.Movies[0].Themoviedbid, FitsTypeOf, int(500))
	c.Assert(payload.Movies[0], FitsTypeOf, Movie{})
	c.Assert(payload, FitsTypeOf, ArrayPayload{})
}
