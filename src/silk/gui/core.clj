(ns silk.gui.core
  (:refer-clojure :exclude [flush read-line])
  (:use [seesaw.core]
        [seesaw.widgets.log-window]
        [seesaw.chooser]
        [me.raynes.conch :refer [programs with-programs let-programs]]
        [me.raynes.conch.low-level :as conch])
  (import java.io.File)
  (:gen-class))
 
(programs silk)

(defn- check-path-for-errors [path]
  (let [dir (File. path)]
    (cond 
      (= (.toString dir) "") "A directory was not selected."
      (not (.exists dir))    (str path " does not exist.")
      (.isFile dir)          (str path " is not a directory.")
      :else                  "")))
      
(defn- run-silk [arg path logger]
  (def ^:dynamic *silk* (silk arg :dir path {:verbose true :seq true :buffer 1}))
  (future 
    (doseq [x (seq (*silk* :stdout))](log logger x))
    (doseq [x (seq (*silk* :stderr))](log logger x))))

(defn- kill-silk [logger]
  (if (bound? #'*silk*)
    (do (conch/done (*silk* :proc))
        (log logger "Silk auto spin is now off.\n"))))
  
(defn- choose-file-dialog [field]
  (choose-file
    :remember-directory? true
    :selection-mode :dirs-only
    :success-fn (fn [fc file]
      (text! field (.getAbsolutePath file)))))

(defn- content []
  (let [choose-btn (button :text "Choose")
        spin-btn (button :text "Spin")
        logger (log-window :id :log-window :limit nil)
        fill 5
        hgap [:fill-h fill]
        vgap [:fill-v fill]
        field (text "")
        group (button-group)
        radio-on (radio :id "on" :text "On" :group group)
        radio-off (radio :id "off" :text "Off" :selected? true :group group)]
    ;Open folder chooser onload
    (choose-file-dialog field)
    ;Listener for choose button
    (listen choose-btn :action
      (fn [e]
        (choose-file-dialog field)))
    ;Listener for spin button
    (listen spin-btn :action 
      (fn [e]
        (let [error-msg (check-path-for-errors (text field))]
          (if (= error-msg "") (run-silk "" (text field) logger)
            (alert error-msg)))))
    ;Frame layout
    (border-panel :vgap fill :hgap fill :border fill
      :north (horizontal-panel 
        :items["Project Path" hgap field hgap choose-btn])
      :center (vertical-panel 
        :items[
          (let [panel (horizontal-panel
            :items["Auto Spin" radio-on radio-off spin-btn])]
            ;Listener for auto spin
            (listen group :selection
              (fn [e]
                (when-let [s (selection group)]
                  (let [id (.toString (id-of s))
                        error-msg (check-path-for-errors (text field))]
                    (if (= id ":on")
                      (if (= error-msg "") 
                        (do (run-silk "reload" (text field) logger) 
                            (hide! spin-btn))
                        (do (alert error-msg) 
                            (selection! radio-off 1)))
                      (do (kill-silk logger) 
                          (show! spin-btn)))))))
            panel)
          vgap
          (scrollable logger)]))))

;; =============================================================================
;; Application entry point
;; =============================================================================

(defn -main [& args]
  (if (contains? #{"-n" "--native"} (first args)) (native!))
  (invoke-later
    (-> (frame :title "Silk" :size [640 :by 480] :content (content) 
               :on-close :exit) show!)))

