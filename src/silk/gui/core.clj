(ns silk.gui.core
  (:use [seesaw.core]
        [seesaw.widgets.log-window]
        [seesaw.chooser]
        [me.raynes.conch :refer [programs with-programs let-programs]])
  (import java.io.File)
  (:gen-class))
  
(programs silk)

(defn- run-silk [arg dir logger]  
  (doseq [x (seq (silk arg :dir dir {:seq true :buffer :none}))]
    (log logger x)))

(defn- kill-silk [fut logger] 
  (future-cancel fut)
  (shutdown-agents)
  (log logger "Silk auto spin is now off.\n"))
  
(defn- choose-file-dialog [field]
  (choose-file
    :remember-directory? true
    :selection-mode :dirs-only
    :success-fn (fn [fc file]
      (text! field (.getAbsolutePath file)))))

(defn- content []
  (def choose-btn (button :text "Choose"))
  (def spin-btn (button :text "Spin"))
  (def logger (log-window :id :log-window :limit nil))
  (def fill 5)
  (def hgap [:fill-h fill])
  (def vgap [:fill-v fill])
  (def field (text ""))
  (def group (button-group))
  ;Open folder chooser onload
  (choose-file-dialog field)
  ;Listener for choose button
  (listen choose-btn :action
    (fn [e]
      (choose-file-dialog field)))
  ;Listener for spin button
  (listen spin-btn :action 
    (fn [e]
      (let [dir (File. (text field))]
      (cond 
        (not (.exists dir)) (alert (str dir " does not exist."))
        (.isFile dir)       (alert (str dir " is not a directory."))
        :else               (future (run-silk "" dir logger))))))
                        
  ;Frame layout
  (border-panel :vgap fill :hgap fill :border fill
    :north (horizontal-panel :items["Project Path" hgap field hgap choose-btn])
    :center (vertical-panel 
      :items[
        (let [panel (horizontal-panel
          :items[
            "Auto Spin"
            (radio :id "on" :text "On" :group group)
            (radio :id "off" :text "Off" :selected? true :group group)
            spin-btn])]
        ;Listener for auto spin
        (listen group :selection
          (fn [e]
            (when-let [s (selection group)]
              (let [id (.toString (id-of s)) 
                    dir (File. (text field))]
                (cond
                  (= id ":on") (def f (future (run-silk "reload" dir logger)))
                  :else        (kill-silk f logger))))))
        panel)
        vgap
        (scrollable logger)])))

;; =============================================================================
;; Application entry point
;; =============================================================================

(defn -main [& args]
  (if (contains? #{"-n" "--native"} (first args)) (native!))
  (invoke-later
    (-> (frame :title "Silk" :size [640 :by 480] :content (content) 
               :on-close :exit) show!)))

