package eav_test

import (
	"os"
	"github.com/satori/go.uuid"
	"testing"
	"eav-app/eav"
	"eav-app/entity"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/stretchr/testify/assert"
)

func TestEAVJsonSerialization(t *testing.T) {
}
func TestMigrator(t *testing.T) {
	db := testSetup(t)
	testTeardown(db)
}
func TestEAVRecordCreate(t *testing.T) {
	db := testSetup(t)

	//create a record
	testEntity := entity.Entity{
		Name: "Person",
		ID: uuid.NewV4(),
		Fields: []entity.Field{
			{Name: "First", ID: uuid.NewV4()},
			{Name: "Last", ID: uuid.NewV4()},
			{Name: "Email", ID: uuid.NewV4()},
		},
	}
	record := eav.EAVRecord{Entity: testEntity}
	fieldValues := map[string]interface{}{
		testEntity.Fields[0].ID.String(): "John",
		testEntity.Fields[1].ID.String(): "Smith",
		testEntity.Fields[2].ID.String(): "jsmith@test.com",
	}
	record.Create(db, fieldValues)

	//check that our rows were created
	var count int
	db.Model(&eav.EAV{}).
		Where(map[string]interface{}{
			"entity_id": testEntity.ID,
		}).
		Count(&count)
	assert.Equal(t, 3, count)

	testTeardown(db)
}
func testSetup(t *testing.T) *gorm.DB{
	db, err := gorm.Open("sqlite3", "testeavcreate.db")
	assert.Nil(t, err)
	entity.Migrator(db)
	eav.Migrator(db)
	assert.True(t, db.HasTable("eavs"))
	return db
}
func testTeardown(db *gorm.DB){
	eav.Teardown(db)
	db.Close()
	os.Remove("./testeavcreate.db")
}