package main

import (
	"eav-app/entity"
	"eav-app/eav"

	"github.com/jinzhu/gorm"
)

/*Migrator something */
func Migrator(db *gorm.DB) {
	entity.Migrator(db)
	eav.Migrator(db)
}
