(ns silk.gui.transformations
  (:require [cljs.nodejs :as nd]
            [enfocus.core :as ef]
            [enfocus.events :as evt]
            [silk.gui.env :as env])
  (:use [silk.gui.utils :only [cmap->jobj log]])
  (:use-macros [enfocus.macros :only [defaction]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Helper functions
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Template transformations
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defaction edit-site-> [tpl]
  "#stage" (ef/substitute tpl)
  "#home-btn" (ef/remove-class "active"))

(defaction handle-spin-> [msg]
  "#spin-msg" (ef/content msg))

(defaction home-> [tpl]
  "#stage" (ef/substitute tpl)
  "#home-btn" (ef/add-class "active")
  "#edit-site-btn" (evt/listen :click edit-site->))

(defaction init-> [] "#home-btn" (evt/listen :click home->))
