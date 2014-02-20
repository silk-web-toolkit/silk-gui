(ns silk.gui.pipeline
  (:require [enfocus.core :as ef]
            [clojure.browser.repl :as repl]
            [silk.gui.env :as env]
            [silk.gui.transformations :as tx]
            [silk.gui.templates :as tpl]
            [silk.gui.utils :as utl])
  (:use [clojure.string :only [split]])
  (:use-macros [enfocus.macros :only [clone-for deftemplate defsnippet]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Pipelines
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn- load-projects []
  (if (env/file? env/PROJECTS_FILE) 
    (split (.toString (.readFileSync env/fs env/PROJECTS_FILE)) #"\n")
    ('())))

(defn- display [projects]
  (ef/at "#projects-list li" 
    (clone-for [project projects] (ef/content (first (split project #","))))))

(defn- spin [project]
  (let [opt (utl/cmap->jobj {:cwd project})]
    (env/exec "silk spin" opt (fn [err stdout stderr] (do (utl/log stdout) (tx/handle-spin-> stdout))))))

;;;;;;;;;;;;;;;;;
;; View pipelines

(defn init [] (tx/init->))

(defn home []
  (let [projects (load-projects)]  
    (if (empty projects)
      ( (tx/home-> (tpl/projects))
        (display projects)
        (spin (first (split (first projects) #","))))
      (tx/home-> (tpl/no-projects)))))

(defn edit-site [] (tx/edit-site-> tpl/edit-site))

