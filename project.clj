(defproject silk-gui "0.5.0-SNAPSHOT"
  :description "Clojurescript silk gui"
  :url "http://www.silkyweb.org"
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [enfocus "2.0.2"]]
  :plugins [[lein-cljsbuild "0.3.2"]]
  :cljsbuild {:builds [{:source-paths ["src"],
                        :compiler {:output-to "resources/public/js/main.js"}}]})
