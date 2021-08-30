import pluginsObject from "./plugins.js";
import { paths } from "./variables.js";

const {
  newer,
  webp,
  imagemin,
  gulp: { src, dest },
} = pluginsObject;

const {
  project: { webpImg },
  made: { webpFolder, imgFolder },
} = paths;

const makeImages = () => {
  return src(webpImg)
    .pipe(newer(imgFolder))
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
      ])
    )
    .pipe(dest(imgFolder));
};

const createWebp = () => {
  makeImages();
  return src(webpImg)
    .pipe(newer({ dest: webpFolder, ext: ".webp" }))
    .pipe(webp())
    .pipe(dest(webpFolder));
};

export default createWebp;
