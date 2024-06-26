import fs, { promises as fsAsync } from 'fs';
import path from 'path';

/**
 * @see https://stackoverflow.com/a/53530146
 */
export function isFolder(fpath) {
  try {
    const stat = fs.lstatSync(fpath);
    return stat.isDirectory();
  } catch (e) {
    // NOTE: lstatSync throws an error if path doesn't exist
    return false;
  }
}

/**
 * Returns relative file path of all files in given folder or folders.
 * @param {string | string[]} filesOrFolders One or more files or folders from which we want to enumerate all files they contain.
 * @param {boolean} recurse Whether to do this recursively.
 */
export function getAllFilesInFolders(filesOrFolders, recurse = true, prefix = '') {
  filesOrFolders = Array.isArray(filesOrFolders) ? filesOrFolders : [filesOrFolders];
  return Array.from(new Set(
    filesOrFolders.flatMap(fileOrFolder =>
      (recurse && isFolder(fileOrFolder)) ?
        getAllFilesInFolders(
          fs.readdirSync(fileOrFolder).map(f => path.join(fileOrFolder, f)),
          true,
          path.isAbsolute(fileOrFolder) ? fileOrFolder : path.join(prefix, fileOrFolder)
        ) :
        fileOrFolder
    )
    // ).map(f => path.isAbsolute(f) ? f : path.join(prefix, f))
  ));
}

console.log(getAllFilesInFolders('../case-studies').join('\n'));
console.log(getAllFilesInFolders(path.resolve('../case-studies')).join('\n'));