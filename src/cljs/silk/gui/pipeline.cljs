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

(defn- load-projects-csv []
  (if (env/file? env/PROJECTS_FILE) 
    (split (.toString (.readFileSync env/fs env/PROJECTS_FILE)) #"\n")
    ('())))

(defn- list-projects [csv]
  (ef/at "#projects-list li" 
    (clone-for [line csv] (ef/content (first (split line #","))))))

(defn- spin-project [project-path]
  (let [opt (utl/cmap->jobj {:cwd project-path})]
    (env/exec "silk spin" opt (fn [err stdout stderr] (do (utl/log stdout) (tx/handle-spin-> stdout))))))

;;;;;;;;;;;;;;;;;
;; View pipelines

(defn init [] (tx/init->))

(defn home []
  (let [csv (load-projects-csv)]  
    (if (empty csv)
      ( (tx/home-> (tpl/projects))
        (list-projects csv)
        (spin-project (first (split (first csv) #","))))
      (tx/home-> (tpl/no-projects)))))

(defn edit-site [] (tx/edit-site-> tpl/edit-site))

