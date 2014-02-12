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

;(defn home-view? []
  ;(log (str "projects file is : *" env/PROJECTS_FILE "*"))
  ;(log (.toString (.readFileSync env/fs env/PROJECTS_FILE)))
  ;(let [;project "/Users/rossputin/Projects/bheap/silk-projects/silk-site"
        ;project "/home/rmcdonald/Projects/mine/silk/silk-test-site"
        ;opt (cmap->jobj {:cwd project} )]
    ;(env/exec "silk spin" opt (fn [err stdout stderr] (.log js/console stdout))))
  ;(ef/substitute (projects-list)))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Template transformations
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defaction edit-site-> [tpl]
  "#stage" (ef/substitute tpl)
  "#home-btn" (ef/remove-class "active"))

(defaction schnicky-> [msg]
  "#spin-msg" (ef/content msg))

(defaction testicle-> [tpl]
  "#stage" (ef/substitute tpl)
  "#home-btn" (ef/add-class "active")
  "#edit-site-btn" (evt/listen :click edit-site->))

(defaction home-> [tpl]
  "#stage" (ef/substitute tpl)
  "#home-btn" (ef/add-class "active")
  "#edit-site-btn" (evt/listen :click edit-site->))

(defaction init-> [] "#home-btn" (evt/listen :click home->))
