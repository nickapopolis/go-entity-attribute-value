package eav

import (
	"github.com/satori/go.uuid"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
)

// Controller API route mux for Entity
func Controller(router *mux.Router, db *gorm.DB) {
	router.HandleFunc("/eav/{entityId}", indexHandler(db)).Methods("POST", "GET")
	router.HandleFunc("/eav/{entityId}/{id}", loadUpdateHandler(db)).Methods("GET", "POST")
}
func indexHandler(db *gorm.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "POST":
			createHandler(db, w, r)
		case "GET":
			listHandler(db, w, r)
		}
	}
}
func loadUpdateHandler(db *gorm.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "GET":
			loadHandler(db, w, r)
		case "POST":
			updateHandler(db, w, r)
		}
	}
}
func createHandler(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	decoder := json.NewDecoder(r.Body)
	var newEntityData map[string]interface{}
	err := decoder.Decode(&newEntityData)
	if err != nil {
		http.Error(w, err.Error(), 400)
	}
	entityId, err := uuid.FromString(vars["entityId"])
	if err != nil {
		http.Error(w, err.Error(), 400)
	}
	newEntity :=  EAVRecord{}
	newEntity.SetEntityFromId(db, entityId)
	newEntity.Create(db, newEntityData)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(newEntityData)
}
func listHandler(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
}
func loadHandler(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
}
func updateHandler(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
}
