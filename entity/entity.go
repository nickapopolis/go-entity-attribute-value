package entity

import (
	"github.com/jinzhu/gorm"
)

//Entity is a struct for managing dynamic tables
type Entity struct {
	gorm.Model
	Name   string
	Fields []Field
}

//Field is a struct for managing field metadata on dynamic tables
type Field struct {
	gorm.Model
	Name string
}

// EAV is a struct for managing field values of dynamic tables
type EAV struct {
	gorm.Model
	Entity      Entity
	Field       Field
	ValueString string
	ValueInt    int
}
