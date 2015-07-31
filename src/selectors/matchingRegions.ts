import reselect = require('reselect');
import {Region, RegionMap} from '../reducers/region';
import {authorizedRegionsSelector} from './authorizedRegions';

export const matchingRegionsSelector = reselect.createSelector(
  [authorizedRegionsSelector, state => state.regions.regionsById, state => state.regions.filter],
  (regionIds, regionMap: RegionMap, filter: string) => {
      return filter 
      ? _.filter(regionIds, rId => regionMap[rId].name.toLowerCase().indexOf(filter.toLowerCase()) > -1)
      : regionIds;
  });

