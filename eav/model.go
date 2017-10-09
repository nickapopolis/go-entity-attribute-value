package eav

import (
	"eav-app/entity"
	"github.com/jinzhu/gorm"
	"time"
    "github.com/satori/go.uuid"
)

// EAV is a struct for managing field values of dynamic tables
type EAV struct {
	ID        uuid.UUID  `json:"id" gorm:"type:uuid;primary_key;"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time `sql:"index"`
	EntityID	uuid.UUID `gorm:"type:uuid"`
	RowID uuid.UUID
	FieldID	uuid.UUID `gorm:"type:uuid"`
	ValueString string
	ValueInt    int64
}
func (eav *EAV) BeforeCreate(scope *gorm.Scope) error {
	if(isNilUUID(eav.ID)){
		scope.SetColumn("ID", uuid.NewV4())
	}
    return nil
}
type EAVRecord struct {
	Entity entity.Entity
}
func (eav *EAVRecord) SetEntityFromId(db *gorm.DB, entityID uuid.UUID){
	eav.Entity = entity.Entity{ID: entityID}
	db.Preload("Fields").First(&eav.Entity)
}
func (eav *EAVRecord) Load(db *gorm.DB, id uuid.UUID) interface{}{
	return nil
}
func (eav *EAVRecord) Create(db *gorm.DB, data map[string]interface{}) {
	for _, field := range eav.Entity.Fields {
		idString, _ := data["id"].(string)
		id, _ := uuid.FromString(idString)
		if isNilUUID(id) {
			id = uuid.NewV4()
		}
		fieldVal := data[field.ID.String()]
		fieldValString, _ := fieldVal.(string)
		fieldValInt, _ := fieldVal.(int64)
		row := EAV{
			RowID: id,
			EntityID: eav.Entity.ID,
			FieldID: field.ID,
			ValueString: fieldValString,
			ValueInt: fieldValInt,
		}
		db.NewRecord(row)
		db.Create(&row)
	}
}
func isNilUUID(input uuid.UUID) bool{
	nilUuid := uuid.UUID{};
	return input == nilUuid;
}