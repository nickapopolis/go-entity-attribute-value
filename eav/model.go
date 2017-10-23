package eav

import (
	"fmt"
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
func (eav *EAVRecord) List(db *gorm.DB) []map[string]interface{}{
	eavData := []EAV{}
	db.Where("entity_id = ?", eav.Entity.ID).Order("updated_at desc").Find(&eavData)
	fmt.Println(eavData)
	dataByRow := make(map[uuid.UUID]map[string]interface{})
	for _, fieldValue := range eavData {
		row, ok := dataByRow[fieldValue.RowID]
		if !ok {
			row = make(map[string]interface{})
		}
		row["id"] = fieldValue.RowID.String()
		row[fieldValue.FieldID.String()] = fieldValue.ValueString;
		dataByRow[fieldValue.RowID] = row;
	}
	rows := make([]map[string]interface{}, 0, len(dataByRow))
	for _, row := range dataByRow {
		rows = append(rows, row)
	}
	return rows
}
func (eav *EAVRecord) Load(db *gorm.DB, id uuid.UUID) interface{}{
	return nil
}
func (eav *EAVRecord) Create(db *gorm.DB, data map[string]interface{}) {
	idString, _ := data["id"].(string)
	id, _ := uuid.FromString(idString)
	if isNilUUID(id) {
		id = uuid.NewV4()
	}
	for _, field := range eav.Entity.Fields {
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