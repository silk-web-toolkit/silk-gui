(ns silk.gui.templates
  (:require [enfocus.core :as ef])
  (:use-macros [enfocus.macros :only [defpage deftpl deftemplate defsnippet]]))

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

;(defsnippet  home-snip   :compiled "public/index.html" [:#stage] [])
(defpage home-snip "index")
;(deftemplate no-projects :compiled "public/templates/no-projects.html" [])
(deftpl no-projects "no-projects")
;(deftemplate projects    :compiled "public/templates/projects.html" [])
(deftpl projects "projects")


;(deftemplate edit-site   :compiled '(tpl "edit-site")   [])
;(deftemplate edit-site   :compiled "public/templates/edit-site.html" [])
(deftpl edit-site "edit-site")
