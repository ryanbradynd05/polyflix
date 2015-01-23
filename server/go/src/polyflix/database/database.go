package database

import (
	"fmt"
	_ "github.com/go-sql-driver/mysql" // Only needed for GORM connection
	"github.com/jinzhu/gorm"
	"log"
	"os"
	"sync"
)

// Database holds the gorm.DB
type Database struct {
	DB gorm.DB
}

var (
	initCtx  sync.Once
	instance *Database
)

// New create gorm.DB from connection string in dbconfig.yml
func New(dbConn string) gorm.DB {
	initCtx.Do(func() {
		instance = new(Database)
		connString := fmt.Sprintf("%s", dbConn)
		db, err := gorm.Open("mysql", connString)
		if err != nil {
			log.Printf("Gorm error: %+v\n", err)
			os.Exit(1)
		}
		log.Printf("Database opened\n")
		db.DB()
		db.DB().Ping()
		db.DB().SetMaxIdleConns(10)
		db.DB().SetMaxOpenConns(100)
		instance.DB = db
	})
	return instance.DB
}
