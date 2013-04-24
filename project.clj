(defproject silk-gui "0.0.1-SNAPSHOT"
  :description "Silk compile time graphical user interface."
  :url "http://www.silkyweb.org"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.4.0"]
                 [seesaw "1.4.3"]
                 [me.raynes/conch "0.5.0"]]

  :aot :all
  :main silk.gui.core)