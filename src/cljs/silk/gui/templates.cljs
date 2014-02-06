(ns silk.gui.templates
  (:require [enfocus.core :as ef])
  (:use-macros [enfocus.macros :only [deftemplate defsnippet]]
  	           [silk.gui.macros :only [defpage]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Helper functions
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn page [p] (str "public/" p ".html"))
(defn tpl [t] (str "public/templates/" t ".html"))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Compile time template files
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;;;;;;;
;; home

;(defsnippet  home-snip   :compiled '(page "index.html") [:#stage] [])
;(defpage home-snip page "index")
;(deftemplate no-projects :compiled '(tpl "no-projects") [])
;(deftemplate projects    :compiled '(tpl "projects")    [])

(defsnippet  home-snip   :compiled "public/index.html" [:#stage] [])
(deftemplate no-projects :compiled "public/templates/no-projects.html" [])
(deftemplate projects    :compiled "public/templates/projects.html" [])


;(deftemplate edit-site   :compiled '(tpl "edit-site")   [])
(deftemplate edit-site   :compiled "public/templates/edit-site.html" [])
