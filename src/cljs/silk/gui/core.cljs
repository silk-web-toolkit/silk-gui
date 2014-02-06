(ns silk.gui.core
  (:require [enfocus.core :as ef]
            [enfocus.events :as events]
            [clojure.browser.repl :as repl]
            [silk.gui.pipeline :as pipe])
  (:use-macros [enfocus.macros :only [deftemplate defsnippet defaction]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Dev functions
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(def dev-mode true)

(defn repl-connect []
 (when dev-mode
   (repl/connect "http://localhost:9000/repl")))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Initialisation
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(set! (.-onload js/window)
      #(do
         (repl-connect)
         (pipe/init)
         (pipe/home)))
