import pluginsObject from "./plugins.js";
import { paths } from "./variables.js";

const {
  gulp: { src, dest },
  zip,
} = pluginsObject;

const { distFolder, distFolderZip } = paths;

const creteArchive = () => {
  return src([`${distFolder}/*/**`, `${distFolder}/*`])
    .pipe(zip(distFolderZip))

    .pipe(dest(`./`));
};

export default creteArchive;
