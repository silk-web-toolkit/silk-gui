(ns silk.gui.utils)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Helper functions
;;
;; For pure functions and definitions, unrelated to environment.
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn log [m] (.log js/console m))

(defn cmap->jobj [cmap]
  (let [out (js-obj)]
    (doall (map #(aset out (name (first %)) (second %)) cmap))
    out))
