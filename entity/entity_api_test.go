package entity_test

import (
	"eav-app/entity"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"

	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

func TestApi(t *testing.T) {
	db, err := gorm.Open("sqlite3", "testapi.db")
	if err != nil {
		panic("failed to connect database")
	}
	router := mux.NewRouter()
	entity.Migrator(db)
	entity.Controller(router, db)

	t.Run("EntityCreate", testApiCreate(router, db))

	entity.Teardown(db)
	db.Close()
	os.Remove("./testapi.db")
}
func testApiCreate(router *mux.Router, db *gorm.DB) func(*testing.T) {
	return func(t *testing.T) {
		entityJSON := `{"name": "Person", "fields": [
			{name: "First"},
			{name: "Last"},
			{name: "Email"}
		]}`

		reader := strings.NewReader(entityJSON)
		r, _ := http.NewRequest("POST", "http://localhost:3000/entity", reader)
		w := httptest.NewRecorder()
		router.ServeHTTP(w, r)
		if w.Code != 200 {
			t.Fail()
		}
	}
}
