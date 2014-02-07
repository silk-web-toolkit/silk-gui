(ns silk.gui.macros
  (:use [enfocus.macros :only [defsnippet deftemplate]]))

(defmacro deftpl [mname page]
  (let [page-uri #(str %1 page %2)]
    `(deftemplate ~(symbol mname) :compiled ~(page-uri "public/templates/" ".html") [])))

(defmacro defpage [mname page]
  (let [page-uri #(str %1 page %2)]
    `(defsnippet ~(symbol mname) :compiled ~(page-uri "public/" ".html") [:#stage] [])))


