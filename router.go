package main

import (
	"eav-app/entity"
	"eav-app/eav"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
)

/*Router something */
func Router(db *gorm.DB) {
	router := mux.NewRouter()

	//static files (until nginx)
	router.PathPrefix("/public/").Handler(http.StripPrefix("/public/dist", http.FileServer(http.Dir("./public/dist"))))

	//api
	apiRouter := router.PathPrefix("/api/1.0").Subrouter()
	entity.Controller(apiRouter, db)
	eav.Controller(apiRouter, db)

	//default handle single page app
	router.PathPrefix("/").HandlerFunc(rootHandle)

	log.Fatal(http.ListenAndServe(":8000", router))
}
func rootHandle(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./public/index.html")
}
