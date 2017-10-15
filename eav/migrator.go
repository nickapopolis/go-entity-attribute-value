package eav

import (
	"github.com/jinzhu/gorm"
)

/*Migrator add EAV table to the db*/
func Migrator(db *gorm.DB) {
	db.AutoMigrate(&EAV{})
}

/*Teardown remove  EAV table from the db*/
func Teardown(db *gorm.DB) {
	db.DropTable(&EAV{})
}
