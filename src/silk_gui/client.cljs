(ns silk-gui.client
    (:require [enfocus.core :as ef]
              [enfocus.effects :as effects]
              [enfocus.events :as events]
              [clojure.browser.repl :as repl])
    (:use-macros [enfocus.macros :only [deftemplate defsnippet defaction]]))

(declare add-fruit)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Dev functions
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(def dev-mode true)

(defn repl-connect [] 
 (when dev-mode
   (repl/connect "http://localhost:9000/repl")))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Dom functions
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn by-id [id]
  (.getElementById js/document id))

;; if from is sent one element it returns the value
(defn get-name []
 (ef/from (by-id "yourname") (ef/get-prop :value)))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Template macros
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; we can use enlive based selects 
;; along side string based selectors
(defsnippet home-snip :compiled "public/index.html" [:#stage] []) 

(deftemplate projects-list :compiled "public/templates/projects-list.html" []) 

(deftemplate edit-site :compiled "public/templates/edit-site.html" [])
   

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Views
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
 
(defaction edit-site-view []
  "#stage" (ef/substitute (edit-site))
  "#home-btn" (ef/remove-class "active"))


(defn home-view-decision []
  (js/flibble)
  (ef/substitute (projects-list)))

(defaction home-view []
  "#stage" (home-view-decision)
  "#home-btn" (ef/add-class "active")
  "#edit-site-btn" (events/listen :click edit-site-view))
                
(defaction init []
  "#home-btn" (events/listen :click home-view))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Initialisation
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(set! (.-onload js/window)
      #(do
         (.log js/console js/aTest)
         (repl-connect)
         (init)
         (home-view)))
