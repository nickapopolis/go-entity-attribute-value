package entity

import (
	"github.com/jinzhu/gorm"
)

//Entity is a struct for managing dynamic tables
type Entity struct {
	gorm.Model
	Name   string  `json:"name"`
	Fields []Field `json:"fields" gorm:"ForeignKey:EntityID"`
}

//Field is a struct for managing field metadata on dynamic tables
type Field struct {
	gorm.Model
	Name     string `json:"name"`
	EntityID uint
}

// EAV is a struct for managing field values of dynamic tables
type EAV struct {
	gorm.Model
	Entity      Entity
	Field       Field
	ValueString string
	ValueInt    int
}
