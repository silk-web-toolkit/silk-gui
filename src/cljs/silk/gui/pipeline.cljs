(ns silk.gui.pipeline
  (:require [enfocus.core :as ef]
            [enfocus.events :as evt]
            [clojure.browser.repl :as repl]
            [silk.gui.env :as env]
            [silk.gui.transformations :as tx]
            [silk.gui.templates :as tpl]
            [silk.gui.utils :as utl])
  (:use [clojure.string :only [split]])
  (:use-macros [enfocus.macros :only [clone-for deftemplate defsnippet]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Helper functions
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn- load-projects-csv []
  (if (env/file? env/PROJECTS_FILE) 
    (split (.toString (.readFileSync env/fs env/PROJECTS_FILE)) #"\n")
    nil))

(defn- list-projects [projects]
  (ef/at "#projects-list li" 
    (clone-for [p projects]
      "*:first-child" (ef/content (first p))
      "*:first-child" (evt/listen :click (fn [event] (spin-project (first p)))))))

(def ^:dynamic proc )

(defn- spin-project [project-path]
  (let [opt (utl/cmap->jobj {:cwd project-path})
        sb (goog.string.StringBuffer. "")]
    (try (.kill proc "SIGHUP")(catch js/Error e))
    (def ^:dynamic proc (env/spawn "silk" (array "reload") opt))
    (.on (.-stdout proc) "data" 
      (fn [data]
        (cond 
          (not= (.indexOf (.toString sb) "Site spinning is complete") -1)
            (do 
              (tx/display-spin-> true 
                "Congratulations, your site was successfully spun!")
              (.clear sb))
          (not= (.indexOf (.toString sb) "Cause of error:") -1)
            (do 
              (tx/display-spin-> false 
                (.substring (.toString sb)
                  (+ (.indexOf (.toString sb) "Cause of error:") 16)
                  (.-length (.toString sb))))
              (.clear sb))
          :else (.append sb data))))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; View pipelines
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn init [] (tx/init->))

(defn home []
  (if-let [csv (load-projects-csv)] 
    (let [ps (map #(split % #",") csv)]
      (tx/home-> (tpl/projects))
      (list-projects ps)
      (spin-project (first (first ps))))
    (tx/home-> (tpl/no-projects))))

(defn edit-site [] (tx/edit-site-> tpl/edit-site))
