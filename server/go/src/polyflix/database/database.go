package database

import (
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"os"
	"sync"
)

type Database struct {
	DB gorm.DB
}

var _init_ctx sync.Once
var _instance *Database

func New(dbConn string) gorm.DB {
	_init_ctx.Do(func() {
		_instance = new(Database)
		connString := fmt.Sprintf("%s", dbConn)
		db, err := gorm.Open("mysql", connString)
		if err != nil {
			fmt.Printf("Gorm error: %+v\n", err)
			os.Exit(1)
		}
		fmt.Printf("Database opened\n")
		db.DB()
		db.DB().Ping()
		db.DB().SetMaxIdleConns(10)
		db.DB().SetMaxOpenConns(100)
		_instance.DB = db
	})
	return _instance.DB
}
