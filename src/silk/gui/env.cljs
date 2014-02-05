(ns silk.gui.env
  (:require [cljs.nodejs :as nd]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Silk environment
;;
;; Includes domain level information, SILK_PATH etc and environment concerns
;; like file system and process control (governed by Node-webkit integration).
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn env [k] (aget (-> nd/process.env) k))

(def fs (nd/require "fs"))

(def spawn (nd/require "child_process"))

(defn exec [cmd opt fn] (.exec spawn cmd opt fn))

(def SILK_PATH (or (env "SILK_PATH") (str (env "HOME") "/.silk")))

(def PROJECTS_FILE (str SILK_PATH "/spun-projects.txt"))
