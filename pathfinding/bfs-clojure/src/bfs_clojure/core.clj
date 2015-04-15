(ns bfs-clojure.core)

(defn parse-cols
  ([row coord-map y-coord] (parse-cols row coord-map y-coord 0))
  ([row coord-map y-coord x-coord]
   (if (empty? row)
     coord-map
     (parse-cols
       (rest row)
       (assoc coord-map [x-coord y-coord] (str (first row)))
       y-coord
       (+ 1 x-coord)))))

(defn parse-rows
  ([row-seq] (parse-rows row-seq {} 0))
  ([row-seq coord-map y-coord]
   (if (empty? row-seq)
     coord-map
     (parse-rows
       (rest row-seq)
       (parse-cols (first row-seq) coord-map y-coord)
       (+ 1 y-coord)))))

(defn parse-landscape [landscape-string]
  (parse-rows (clojure.string/split landscape-string #"\n")))

(defn landscape-file [filename]
  (slurp (.getFile (clojure.java.io/resource filename))))

(defn start-pos [ls-map]
  (first (first (filter (fn [pair] (= "S" (last pair))) ls-map))))

