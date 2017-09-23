package entity

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
)

// Controller API route mux for Entity
func Controller(router *mux.Router, db *gorm.DB) {
	router.HandleFunc("/entity", restHandler).Methods("POST")
}
func restHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("restHandler")
	//w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	//w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Entity rest")
}
