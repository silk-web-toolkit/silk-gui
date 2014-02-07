(ns silk.gui.templates
  (:require [enfocus.core :as ef])
  (:use-macros [enfocus.macros :only [deftemplate defsnippet]]
  	           [silk.gui.macros :only [defpage deftpl]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Compile time template files
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;;;;;;;
;; home
;;
;; defpage and deftpl both accept 1) the macro name, 2) the page name
;;   page name is concatenated together with path prefix and extension .html

(defpage home-snip "index")
(deftpl no-projects "no-projects")
(deftpl projects "projects")


(deftpl edit-site "edit-site")
