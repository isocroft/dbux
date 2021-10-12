
import AdmZip from 'adm-zip';

/**
 * 
 * @param {string} data 
 * @param {string} filename 
 * 
 * @see https://www.npmjs.com/package/adm-zip
 */
export function zipToFile(data, filename, zipFilename) {
  let zip = new AdmZip();
  zip.addFile(filename, Buffer.from(data));
  zip.writeZip(zipFilename);
}