package eav_test

import (
	"strings"
	"net/http/httptest"
	"bytes"
	"net/http"
	"encoding/json"
	"os"
	"testing"
	"eav-app/eav"
	"eav-app/entity"

	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/stretchr/testify/assert"
)

func TestApi(t *testing.T) {
	db, err := gorm.Open("sqlite3", "testapi.db")
	assert.Nil(t, err)
	router := mux.NewRouter()
	entity.Migrator(db)
	eav.Migrator(db)
	entity.Controller(router, db)
	eav.Controller(router, db)

	t.Run("EAVCreate", testApiCreate(router, db))
	t.Run("EAVList", testApiList(router, db))
	t.Run("EAVLoad", testApiLoad(router, db))
	t.Run("EAVUpdate", testApiUpdate(router, db))

	entity.Teardown(db)
	eav.Teardown(db)
	db.Close()
	os.Remove("./testapi.db")
}
func testApiCreate(router *mux.Router, db *gorm.DB) func(*testing.T) {
	return func(t *testing.T) {
		newEntity := createEntity(router)
		assert.Equal(t, 3, len(newEntity.Fields))
		newEav := map[string]interface{}{
			newEntity.Fields[0].ID.String(): "John",
			newEntity.Fields[1].ID.String(): "Smith",
			newEntity.Fields[2].ID.String(): "jsmith@test.com",
		}
		url := "http://localhost:3000/eav/" + newEntity.ID.String()
		responseBytes, _ := json.Marshal(&newEav)
		r, _ := http.NewRequest("POST", url, bytes.NewBuffer(responseBytes))
		w := httptest.NewRecorder()
		router.ServeHTTP(w, r)
		assert.Equal(t, 200, w.Code)
		assert.NotNil(t, newEav)

		var count int
		db.Model(&eav.EAV{}).
			Where(map[string]interface{}{
				"entity_id": newEntity.ID,
			}).
			Count(&count)

		assert.Equal(t, 3, count)
	}
}
func testApiList(router *mux.Router, db *gorm.DB) func(*testing.T) {
	return func(t *testing.T) {
	}
}
func testApiLoad(router *mux.Router, db *gorm.DB) func(*testing.T) {
	return func(t *testing.T) {
	}
}
func testApiUpdate(router *mux.Router, db *gorm.DB) func(*testing.T) {
	return func(t *testing.T) {
	}
}
func createEntity(router *mux.Router) entity.Entity{
	entityJSON := `{
		"name": "Person",
		"fields": [
			{"name": "First"},
			{"name": "Last"},
			{"name": "Email"}
		]
	}`

	reader := strings.NewReader(entityJSON)
	r, _ := http.NewRequest("POST", "http://localhost:3000/entity", reader)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, r)
	body := w.Body
	decoder := json.NewDecoder(body)
	newEntity := entity.Entity{}
	decoder.Decode(&newEntity)
	return newEntity
}