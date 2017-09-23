package main

import (
	"eav-app/entity"

	"github.com/jinzhu/gorm"
)

/*Migrator something */
func Migrator(db *gorm.DB) {
	entity.Migrator(db)
}
