import { getPackageId } from '@dbux/common-node/src/util/moduleUtil';
import StaticProgramContext from '@dbux/common/src/types/StaticProgramContext';
import SubscribableQuery from '../queries/SubscribableQuery';
import PackageInfo from './PackageInfo';

// export class CacheMap {
//   map = new Map();
//   creator;

//   constructor(creator) {
//     this.creator = creator;
//   }

//   has(key) {
//     return this.map.has(key);
//   }

//   add(key) {
//     const { creator } = this;
//     const value = creator(key);
//     this.map.set(key, value);
//     return value;
//   }

//   getOrCreate(key) {
//     const { map } = this;
//     let value = map.get(key);
//     if (!value) {
//       value = this.add(key);
//     }
//     return value;
//   }
// }

export default class PackageQuery extends SubscribableQuery {
  // packageInfos = new CacheMap(this.createPackageInfo);

  constructor() {
    super('packages', {
      collectionNames: ['staticProgramContexts']
    });
  }

  /** ###########################################################################
   * Interface implementation
   * ##########################################################################*/

  on = {
    /**
     * @param {StaticProgramContext[]} programs 
     */
    staticProgramContexts(programs) {
      for (const program of programs) {
        const packageId = getPackageId(program.filePath);
        const key = packageId.folder;
        // const packageInfo = this.packageInfos.getOrCreate(packageId);

        /**
         * @type {PackageInfo}
         */
        let packageInfo = this.lookup(key);
        if (!packageInfo) {
          packageInfo = new PackageInfo(packageId);
          this.storeByKey(key, packageInfo);
        }
        packageInfo.programs.push(program);
      }
    }
  };

  getAll() {
    return Array.from(this._cache.values);
  }

  handleClearCache() {
    this.packagesInOrder = null;
  }
}
