package main_test

import (
	"flag"
	. "gopkg.in/check.v1"
	"net/http/httptest"
	polyflix "polyflix"
	"testing"
)

var (
	env    string
	dbConn string
)

// Hook up gocheck into the "go test" runner.
func Test(t *testing.T) { TestingT(t) }

type ServerSuite struct{}

var _ = Suite(&ServerSuite{})

func (s *ServerSuite) TestMain(c *C) {
	flag.Set("env", "test")
	server := httptest.NewServer(polyflix.Handlers())
	c.Assert(server.URL, Matches, "http://127.0.0.1:.*")
	c.Assert(server, FitsTypeOf, &httptest.Server{})
}
