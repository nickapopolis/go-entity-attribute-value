package entity

import (
	"fmt"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
)

// Controller API route mux for Entity
func Controller(router *mux.Router, db *gorm.DB) {
	router.HandleFunc("/entity", indexHandler(db)).Methods("POST", "GET")
	router.HandleFunc("/entity/{id:[0-9]+}", loadUpdateHandler(db)).Methods("GET")
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
		}
	}
}
func createHandler(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	newEntity := Entity{}
	err := decoder.Decode(&newEntity)
	if err != nil {
		http.Error(w, err.Error(), 400)
	}
	db.NewRecord(newEntity)
	db.Create(&newEntity)
	if db.NewRecord(newEntity) {
		http.Error(w, "Could not create Entity", 500)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(newEntity)
}
func listHandler(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	entities := []Entity{}
	db.Find(&entities)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(entities)
}
func loadHandler(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	loadEntity := Entity{}
	db.Preload("Fields").First(&loadEntity, id)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(loadEntity)
}
