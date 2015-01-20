package main_test

import (
	"fmt"
	"net/http/httptest"
	"polyflix"
)

var (
	server    *httptest.Server
	moviesUrl string
)

func init() {
	server = httptest.NewServer(main.Handlers())

	moviesUrl = fmt.Sprintf("%s/movies", server.URL)
}
