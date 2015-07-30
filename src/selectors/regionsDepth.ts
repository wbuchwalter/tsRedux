import reselect = require('reselect');
import {Region} from '../reducers/region';
import {matchingRegionsSelector} from './matchingRegions';

export const regionUIDepthSelector = reselect.createSelector(
  [matchingRegionsSelector],
  (regions: Region[]) => {
    if (_.any(regions)) {
      let depthMap: { [s: string]: number; } = {};
      extractDepthMap(regions, 0, 0, depthMap);
      return depthMap;
    }
    return {};
  });

function extractDepthMap(tree: Region[], index: number, baseDepth: number, depthMap: { [s: string]: number; }) {
  depthMap[index] = baseDepth;
  if (tree[index].childrenIds) {
    for (let childId of tree[index].childrenIds) {
      extractDepthMap(tree, childId, baseDepth + 1, depthMap);
    }
  }
}

