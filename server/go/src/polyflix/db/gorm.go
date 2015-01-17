package db

import (
    "github.com/jinzhu/gorm"
    "github.com/go-sql-driver/mysql"
)

Database, err := gorm.Open("mysql", "root:rootpw@/polyflix-go-dev?charset=utf8&parseTime=True")

Database.DB()
Database.DB().Ping()
Database.DB().SetMaxIdleConns(10)
Database.DB().SetMaxOpenConns(100)
