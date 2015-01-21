package main

import (
	"flag"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	"github.com/kylelemons/go-gypsy/yaml"
	"net/http"
	"polyflix/controllers"
	"polyflix/database"
)

var (
	url    = "localhost:3000"
	env    string
	dbConn string
)

func main() {
	LoadConfig()
	http.Handle("/", Handlers())
	http.ListenAndServe(url, nil)
}

// LoadConfig loads configuration from env flag and dbconf.yml
func LoadConfig() {
	config, _ := yaml.ReadFile("db/dbconf.yml")
	flag.StringVar(&env, "env", "development", "Environment")
	flag.Parse()
	fmt.Printf("Load %v config\n", env)
	conn, _ := config.Get(fmt.Sprintf("%s.open", env))
	dbConn = conn
	fmt.Printf("DB Connection:  %v\n", dbConn)
}

// DbInit initializes the gorm.DB using polyflix/database.New()
func DbInit() gorm.DB {
	db := database.New(dbConn)
	return db
}

// Handlers creates gorilla/mux router, subrouter and handler functions
func Handlers() *mux.Router {
	db := DbInit()
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
