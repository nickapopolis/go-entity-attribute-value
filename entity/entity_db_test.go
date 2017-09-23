package entity_test

import (
	"eav-app/entity"
	"os"
	"testing"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

func TestEntityMigrator(t *testing.T) {
	db, err := gorm.Open("sqlite3", "testdb.db")
	if err != nil {
		t.Error(err)
	}
	entity.Migrator(db)
	if !db.HasTable("entities") {
		t.Fail()
	}
	if !db.HasTable("fields") {
		t.Fail()
	}
	if !db.HasTable("eavs") {
		t.Fail()
	}
	entity.Teardown(db)
	db.Close()
	os.Remove("./testdb.db")
}
