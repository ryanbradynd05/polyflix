package main

import (
	"flag"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	"github.com/kylelemons/go-gypsy/yaml"
	"log"
	"net/http"
	"os"
	"polyflix/controllers"
	"polyflix/database"
	"strings"
)

var (
	url = "localhost:3000"
)

func main() {
	env := GetEnv()
	dbConn := GetDbConn(env)
	db := DbInit(dbConn)
	http.Handle("/", Handlers(db))
	http.ListenAndServe(url, nil)
}

// GetEnv Gets the env flag
func GetEnv() string {
	env := flag.String("env", "development", "Environment")
	flag.Parse()
	envString := *env
	return envString
}

// GetDbConn loads configuration from env flag and dbconf.yml
func GetDbConn(env string) string {
	pwd, _ := os.Getwd()
	basedir := strings.SplitAfter(pwd, "go")
	filename := fmt.Sprintf("%s/db/dbconf.yml", basedir[0])
	config, _ := yaml.ReadFile(filename)
	log.Printf("Load %v config\n", env)
	prop := fmt.Sprintf("%s.open", env)
	log.Printf("Prop: %v", prop)
	conn, _ := config.Get(prop)
	dbConn := conn
	log.Printf("DB Connection:  %v\n", dbConn)
	return dbConn
}

// DbInit initializes the gorm.DB using polyflix/database.New()
func DbInit(dbConn string) gorm.DB {
	db := database.New(dbConn)
	return db
}

// Handlers creates gorilla/mux router, subrouter and handler functions
func Handlers(db gorm.DB) *mux.Router {
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
