(ns silk.gui.template
  (:require [cljs.nodejs :as nd]
            [enfocus.core :as ef]
            [enfocus.events :as evt]
            [silk.gui.env :as env])
  (:use [silk.gui.utils :only [log]])
  (:use-macros [enfocus.macros :only [deftemplate defsnippet defaction]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Compile time template files
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defsnippet home-snip :compiled "public/index.html" [:#stage] [])

(deftemplate projects-list :compiled "public/templates/projects-list.html" [])

(deftemplate edit-site :compiled "public/templates/edit-site.html" [])


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Helper functions
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;(.readFileSync fs (str __dirname "/index.html"))

(defn home-view-decision []
  (log (str "projects file is : *" env/PROJECTS_FILE "*"))
  (log (.toString (.readFileSync env/fs env/PROJECTS_FILE)))
  ;(if (exists? SILK_PATH) (log "defined") (log "not defined"))
  (ef/substitute (projects-list)))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Template transformations
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defaction edit-site-> []
  "#stage" (ef/substitute (edit-site))
  "#home-btn" (ef/remove-class "active"))

(defaction home-> []
  "#stage" (home-view-decision)
  "#home-btn" (ef/add-class "active")
  "#edit-site-btn" (evt/listen :click edit-site->))

(defaction init-> [] "#home-btn" (evt/listen :click home->))
