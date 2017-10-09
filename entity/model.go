package entity

import (
	"github.com/jinzhu/gorm"
	"time"
    "github.com/satori/go.uuid"
)

//Entity is a struct for managing dynamic tables
type Entity struct {
	ID        uuid.UUID  `json:"id" gorm:"type:uuid;primary_key;"`
	CreatedAt time.Time	`json:"createdAt"`
	UpdatedAt time.Time	`json:"updatedAt"`
	DeletedAt *time.Time	`sql:"index" json:"deletedAt"`
	Name   string  `json:"name"`
	Fields []Field `json:"fields" gorm:"ForeignKey:EntityID"`
}
func (entity *Entity) BeforeCreate(scope *gorm.Scope) error {
	if(isNilUUID(entity.ID)){
		scope.SetColumn("ID", uuid.NewV4())
	}
    return nil
}
//Field is a struct for managing field metadata on dynamic tables
type Field struct {
	ID        uuid.UUID  `json:"id" gorm:"type:uuid;primary_key;"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time `sql:"index"`
	Name     string `json:"name"`
	EntityID uuid.UUID `gorm:"type:uuid"`
}
func (field *Field) BeforeCreate(scope *gorm.Scope) error {
	if(isNilUUID(field.ID)){
		scope.SetColumn("ID", uuid.NewV4())
	}
    return nil
}

func isNilUUID(input uuid.UUID) bool{
	nilUuid := uuid.UUID{};
	return input == nilUuid;
}