package entity

import (
	"github.com/jinzhu/gorm"
)

/*Migrator add entity, field and EAV table to the db*/
func Migrator(db *gorm.DB) {
	db.AutoMigrate(&Field{})
	db.AutoMigrate(&Entity{})
	db.AutoMigrate(&EAV{})
}

/*Teardown remove entity, field and EAV table from the db*/
func Teardown(db *gorm.DB) {
	db.DropTable(&Field{})
	db.DropTable(&Entity{})
	db.DropTable(&EAV{})
}
