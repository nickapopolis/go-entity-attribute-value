package entity_test

import (
	"eav-app/entity"
	"encoding/json"
	"os"
	"testing"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/stretchr/testify/assert"
)

func TestFieldJsonSerialization(t *testing.T) {
	fieldJSON := []byte(`{"name": "First"}`)
	newField := entity.Field{}
	err := json.Unmarshal(fieldJSON, &newField)

	assert.Nil(t, err)
	assert.Equal(t, newField.Name, "First")
}
func TestEntityJsonSerialization(t *testing.T) {
	entityJSON := []byte(`{"name": "Person", "fields": [
		{"name": "First"},
		{"name": "Last"},
		{"name": "Email"}
	]}`)
	newEntity := entity.Entity{}
	err := json.Unmarshal(entityJSON, &newEntity)

	assert.Nil(t, err)
	assert.Equal(t, newEntity.Name, "Person")
	assert.Equal(t, newEntity.Fields[0].Name, "First")
	assert.Equal(t, newEntity.Fields[1].Name, "Last")
	assert.Equal(t, newEntity.Fields[2].Name, "Email")
}
func TestEntityMigrator(t *testing.T) {
	db, err := gorm.Open("sqlite3", "testdb.db")
	assert.Nil(t, err)
	entity.Migrator(db)
	assert.True(t, db.HasTable("entities"))
	assert.True(t, db.HasTable("fields"))
	assert.True(t, db.HasTable("eavs"))
	entity.Teardown(db)
	db.Close()
	os.Remove("./testdb.db")
}
func TestDBActions(t *testing.T) {
	db, err := gorm.Open("sqlite3", "testdbactions.db")
	assert.Nil(t, err)
	entity.Migrator(db)

	t.Run("EntityDBCreate", testDbCreate(db))

	t.Run("EntityDBList", testDbList(db))

	entity.Teardown(db)
	db.Close()
	os.Remove("./testdbactions.db")
}
func testDbCreate(db *gorm.DB) func(t *testing.T) {
	return func(t *testing.T) {
		newEntity := &entity.Entity{
			Name: "Person",
			Fields: []entity.Field{
				{Name: "First"},
				{Name: "Last"},
				{Name: "Email"},
			},
		}
		db.NewRecord(newEntity)
		db.Create(&newEntity)

		createdEntity := entity.Entity{}
		db.Where("name = ?", "Person").First(&createdEntity)
		assert.Equal(t, "Person", createdEntity.Name)
		assert.NotNil(t, createdEntity.ID)

		createdFields := []entity.Field{}
		db.Where("entity_id = ?", createdEntity.ID).Find(&createdFields)
		assert.Equal(t, 3, len(createdFields))
	}
}
func testDbList(db *gorm.DB) func(t *testing.T) {
	return func(t *testing.T) {
		entities := []entity.Entity{}
		db.Find(&entities)
		assert.Equal(t, 1, len(entities))
	}
}
