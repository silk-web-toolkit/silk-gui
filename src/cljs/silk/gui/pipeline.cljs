(ns silk.gui.pipeline
  (:require [enfocus.core :as ef]
            [clojure.browser.repl :as repl]
            [silk.gui.env :as env]
            [silk.gui.transformations :as tx]
            [silk.gui.templates :as tpl])
  (:use-macros [enfocus.macros :only [deftemplate defsnippet]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Pipelines
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;;;;;;;;;;;;;;;;;
;; View pipelines

(defn init [] (tx/init->))

(defn home []
  (let [tp (if (env/file? env/PROJECTS_FILE) (tpl/projects) (tpl/no-projects))]
    (tx/home-> tp)))

(defn edit-site [] (tx/edit-site-> tpl/edit-site))

