(ns silk.gui.template
  (:require [enfocus.core :as ef]
            [enfocus.events :as events])
  (:use-macros [enfocus.macros :only [deftemplate defsnippet defaction]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Compile time template files
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; we can use enlive based selects
;; along side string based selectors
(defsnippet home-snip :compiled "public/index.html" [:#stage] [])

(deftemplate projects-list :compiled "public/templates/projects-list.html" [])

(deftemplate edit-site :compiled "public/templates/edit-site.html" [])


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Helper functions
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn home-view-decision [] (ef/substitute (projects-list)))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Template transformations
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defaction edit-site-> []
  "#stage" (ef/substitute (edit-site))
  "#home-btn" (ef/remove-class "active"))

(defaction home-> []
  "#stage" (home-view-decision)
  "#home-btn" (ef/add-class "active")
  "#edit-site-btn" (events/listen :click edit-site->))

(defaction init-> [] "#home-btn" (events/listen :click home->))
