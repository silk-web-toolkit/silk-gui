(defproject silk-gui "0.5.0-SNAPSHOT"
  :description "Clojurescript silk gui"
  :url "http://www.silkyweb.org"
  :source-paths ["src/clj" "src/cljs"]
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [org.clojure/clojurescript "0.0-2156"]
                 [enfocus "2.1.0-SNAPSHOT"]]
  :plugins [[lein-cljsbuild "1.0.0"]]
  :cljsbuild {:builds [{:source-paths ["src/cljs"],
                        :compiler {:output-to "resources/public/js/main.js"}}]})
