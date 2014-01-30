(defproject silk-gui-spike "0.1.0-SNAPSHOT"
  :description "Clojurescript silk gui"
  :url "http://www.silkyweb.org"
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [ring/ring-core "1.1.8"]
                 [ring/ring-jetty-adapter "1.1.8"]
                 [enfocus "2.0.2"]]
  :plugins [[lein-cljsbuild "0.3.2"]
            [lein-ring "0.8.3"]]
  :cljsbuild {:builds [{:source-paths ["src"],
                        :compiler {:output-to "resources/public/js/main.js"}}]}
  :ring {:handler silk-gui.server/app})
