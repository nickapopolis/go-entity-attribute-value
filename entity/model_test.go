package entity_test

import (
	"github.com/satori/go.uuid"
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
	entityJSON := []byte(`{
		"name": "Person",
		"id": "64d67005-36e3-49ec-b97c-99c5ccd651f8",
		"fields": [
			{
				"name": "First",
				"id": "64d67005-36e3-49ec-b97c-99c5ccd651f8"
			},
			{"name": "Last"},
			{"name": "Email"}
		]
	}`)
	newEntity := entity.Entity{}
	err := json.Unmarshal(entityJSON, &newEntity)

	assert.Nil(t, err)
	assert.Equal(t, newEntity.ID.String(), "64d67005-36e3-49ec-b97c-99c5ccd651f8")
	assert.Equal(t, newEntity.Name, "Person")
	assert.Equal(t, newEntity.Fields[0].Name, "First")
	assert.Equal(t, newEntity.Fields[0].ID.String(), "64d67005-36e3-49ec-b97c-99c5ccd651f8")
	assert.Equal(t, newEntity.Fields[1].Name, "Last")
	assert.Equal(t, newEntity.Fields[2].Name, "Email")
}
func TestEntityMigrator(t *testing.T) {
	db, err := gorm.Open("sqlite3", "testdb.db")
	assert.Nil(t, err)
	entity.Migrator(db)
	assert.True(t, db.HasTable("entities"))
	assert.True(t, db.HasTable("fields"))
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
	t.Run("EntityDBLoad", testDbLoad(db))
	t.Run("EntityDBCreateWithId", testDbCreateWithId(db))
	t.Run("EntityDBUpdate", testDbUpdate(db))
	

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

func testDbCreateWithId(db *gorm.DB) func(t *testing.T) {
	return func(t *testing.T) {
		customUuid := uuid.NewV4()
		newEntity := &entity.Entity{
			ID: customUuid,
			Name: "Person2",
			Fields: []entity.Field{
				{Name: "First"},
				{Name: "Last"},
				{Name: "Email"},
			},
		}
		db.NewRecord(newEntity)
		db.Create(&newEntity)

		createdEntity := entity.Entity{}
		db.Where("name = ?", "Person2").First(&createdEntity)
		assert.Equal(t, "Person2", createdEntity.Name)
		assert.NotNil(t, createdEntity.ID)
		assert.Equal(t, customUuid, createdEntity.ID)

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
func testDbLoad(db *gorm.DB) func(t *testing.T) {
	return func(t *testing.T) {
		createEntity := &entity.Entity{
			Name: "Person",
			Fields: []entity.Field{
				{Name: "First"},
				{Name: "Last"},
				{Name: "Email"},
			},
		}
		createEntityViaDb(db, createEntity)
		assert.NotNil(t, createEntity.ID)
		loadEntity := entity.Entity{}
		db.Preload("Fields").First(&loadEntity, createEntity.ID)
		assert.NotNil(t, createEntity.ID)
	}
}
func testDbUpdate(db *gorm.DB) func(t *testing.T) {
	return func(t *testing.T) {
		createEntity := &entity.Entity{
			Name: "Person3",
			Fields: []entity.Field{
				{Name: "First"},
				{Name: "Last"},
				{Name: "Email"},
			},
		}
		createEntityViaDb(db, createEntity)
		assert.NotNil(t, createEntity.ID)
		createEntity.Name = "Person4"
		db.Model(&createEntity).Update(&createEntity)
		assert.Equal(t, createEntity.Name, "Person4")
		assert.NotNil(t, createEntity.ID)
	}
}
func createEntityViaDb(db *gorm.DB, newEntity *entity.Entity){
	db.NewRecord(newEntity)
	db.Create(&newEntity)
}