package main

import (
	"eav-app/entity"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
)

/*Router something */
func Router(db *gorm.DB) {
	router := mux.NewRouter()
	router.HandleFunc("/", rootHandle)

	//static files (until nginx)
	router.PathPrefix("/public/").Handler(http.StripPrefix("/public/", http.FileServer(http.Dir("./public"))))

	//api
	apiRouter := router.PathPrefix("/api/1.0").Subrouter()
	entity.Controller(apiRouter, db)

	log.Fatal(http.ListenAndServe(":8000", router))
}
func rootHandle(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./public/index.html")
}
