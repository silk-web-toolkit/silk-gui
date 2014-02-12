(ns silk.gui.pipeline
  (:require [enfocus.core :as ef]
            [clojure.browser.repl :as repl]
            [silk.gui.env :as env]
            [silk.gui.transformations :as tx]
            [silk.gui.templates :as tpl]
            [silk.gui.utils :as utl])
  (:use-macros [enfocus.macros :only [clone-for deftemplate defsnippet]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Pipelines
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;;;;;;;;;;;;;;;;;
;; View pipelines

(defn init [] (tx/init->))

;(defn home-view? []
  ;(log (str "projects file is : *" env/PROJECTS_FILE "*"))
  ;(log (.toString (.readFileSync env/fs env/PROJECTS_FILE)))
  ;(let [;project "/Users/rossputin/Projects/bheap/silk-projects/silk-site"
        ;project "/home/rmcdonald/Projects/mine/silk/silk-test-site"
        ;opt (cmap->jobj {:cwd project} )]
    ;(env/exec "silk spin" opt (fn [err stdout stderr] (.log js/console stdout))))
  ;(ef/substitute (projects-list)))

(defn testicle []
  (let [tp (if (env/file? env/PROJECTS_FILE) (tpl/projects) (tpl/no-projects))
        project "/Users/rossputin/Projects/silk/silk-test-site"
        opt (utl/cmap->jobj {:cwd project})]
    (env/exec "silk spin" opt (fn [err stdout stderr] (do (utl/log stdout) (tx/schnicky-> stdout))))
    (tx/testicle-> tp)
      (let [projects ["build GUI", "look like hovercraft pilot"]]
        (ef/at "#projects-list li" 
          (clone-for [project projects] (ef/content project))))))

(defn home []
  (let [tp (if (env/file? env/PROJECTS_FILE) (tpl/projects) (tpl/no-projects))]
    (tx/home-> tp)))

(defn edit-site [] (tx/edit-site-> tpl/edit-site))

