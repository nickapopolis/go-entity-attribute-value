package entity_test

import (
	"bytes"
	"eav-app/entity"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"
	"encoding/json"

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
	entity.Controller(router, db)

	t.Run("EntityCreate", testApiCreate(router, db))
	t.Run("EntityList", testApiList(router, db))
	t.Run("EntityLoad", testApiLoad(router, db))
	t.Run("EntityUpdate", testApiUpdate(router, db))

	entity.Teardown(db)
	db.Close()
	os.Remove("./testapi.db")
}
func testApiCreate(router *mux.Router, db *gorm.DB) func(*testing.T) {
	return func(t *testing.T) {
		newEntity := createEntity(router)
		assert.NotNil(t, newEntity)
		assert.NotNil(t, newEntity.ID)
		assert.NotNil(t, newEntity.Name)
		assert.NotNil(t, newEntity.Fields)
		assert.Equal(t, 3, len(newEntity.Fields))
	}
}
func testApiList(router *mux.Router, db *gorm.DB) func(*testing.T) {
	return func(t *testing.T) {
		r, _ := http.NewRequest("GET", "http://localhost:3000/entity", nil)
		w := httptest.NewRecorder()
		router.ServeHTTP(w, r)
		assert.Equal(t, 200, w.Code)
		assert.NotNil(t, w.Body)
	}
}
func testApiLoad(router *mux.Router, db *gorm.DB) func(*testing.T) {
	return func(t *testing.T) {
		newEntity := createEntity(router)
		assert.NotNil(t, newEntity.ID)
		id := newEntity.ID.String()
		url := "http://localhost:3000/entity/" + id
		r, _ := http.NewRequest("GET", url, nil)
		w := httptest.NewRecorder()
		router.ServeHTTP(w, r)
		assert.Equal(t, 200, w.Code)
		assert.NotNil(t, w.Body)
	}
}
func testApiUpdate(router *mux.Router, db *gorm.DB) func(*testing.T) {
	return func(t *testing.T) {
		newEntity := createEntity(router)
		assert.NotNil(t, newEntity.ID)
		newEntity.Name = "UpdatedName"
		id := newEntity.ID.String()
		url := "http://localhost:3000/entity/" + id
		responseBytes, _ := json.Marshal(&newEntity)
		r, _ := http.NewRequest("POST", url, bytes.NewBuffer(responseBytes))
		w := httptest.NewRecorder()
		router.ServeHTTP(w, r)
		assert.Equal(t, 200, w.Code)
		assert.NotNil(t, w.Body)
	}
}
func createEntity(router *mux.Router) entity.Entity{
	entityJSON := `{"name": "Person", "fields": [
		{"name": "First"},
		{"name": "Last"},
		{"name": "Email"}
	]}`

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
