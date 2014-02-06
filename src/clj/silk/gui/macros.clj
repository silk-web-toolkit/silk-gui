(ns silk.gui.macros
	(:use [enfocus.macros :only [defsnippet deftemplate]]))

;(defmacro defndoc [fname args docs & body]
;  `(defn ~fname ~docs [~@args] ~@body))

;Let's discuss the differences between this and our non-macro attempt.

;First we use a syntax-quote (`). This is going to allow us to choose which bits of our list our evaluated and which are not. 
;For example, the defn we want to be evaluated but the other parts we don't.

;The next symbol is unquote (~) which tells clojure to evaluate these symbols.

;The last symbol is unquote-split (~@) which tells clojure that there is a list of things here that needs to be expanded in place.

;now if you do call macroexpand-1 using our defndoc macro on our function with the docstring following the arguments you will get the following

;(clojure.core/defn something "Adds two things together" [x y] (+ x y))

;Perfect, now we can sprinkle defndoc all over our code and have the docstring in the place we want it, but also keep clojure happy. 


;(defmacro doge [[func arg1 arg2]] `(~func "wow " ~arg1 " such "
;         ~arg2 "!"))
; (doge (str "hello" "wat"))
; yields : "wow hello such wat!"

; iteration 1 (defmacro defpage [[func arg1]] `(~func "wow " ~arg1 " such " ~arg2 "!"))
;(defmacro defpage [[snipname func arg]]
;  `(defsnippet ~snipname :compiled (~func ~arg) [:#stage] []))


; working sample - unrelated
;(defmacro defndoc [fname args docs & body]
;  `(defn ~fname ~docs [~@args] ~@body))


;(defsnippet  home-snip   :compiled "public/index.html" [:#stage] [])
(defmacro defpage [snipname func arg]
  (let [uri (func arg)]
  `(defsnippet ~snipname :compiled ~uri [:#stage] [])))
