(ns silk.gui.pipeline
  (:require [enfocus.core :as ef]
            [enfocus.events :as events]
            [clojure.browser.repl :as repl]
            [silk.gui.template :as tpl])
  (:use-macros [enfocus.macros :only [deftemplate defsnippet defaction]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Pipelines
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn init [] (tpl/init->))

(defn home [] (tpl/home->))

(defn edit-site [] (tpl/edit-site->))
