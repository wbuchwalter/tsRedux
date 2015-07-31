import reselect = require('reselect');
import {Region, RegionMap} from '../reducers/region';
import {authorizedRegionsSelector} from './authorizedRegions';


/*returns all regions matching the searchterm, and there parents (since we want to show the full hierarchy of a result)*/
export const matchingRegionsSelector = reselect.createSelector(
  [authorizedRegionsSelector, state => state.regions.regionMap, state => state.regions.filter],
  (regionIds, regionMap: RegionMap, filter: string) => filter
    ? _.filter(regionIds, rId => regionMatches(regionMap[rId], filter))
    : regionIds);


/*Only returns active regions*/
function regionMatches(region: Region, searchterm: string): boolean {
  return region.isActive && region.name.toLowerCase().indexOf(searchterm.toLowerCase()) > -1;
}