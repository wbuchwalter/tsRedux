import reselect = require('reselect');
import {Region} from '../reducers/region';
import {authorizedRegionsSelector} from './authorizedRegions';

export const matchingRegionsSelector = reselect.createSelector(
  [authorizedRegionsSelector, state => state.regions.filter],
  (regions: Region[], filter) => {
    let regionList;

    if (!filter) {
      console.log('no filter!');
      return regions;
    }
    
    console.log('filter!');
    return _.filter(regions, (r: Region) => { return r.name.toLowerCase().indexOf(filter.toLowerCase()) > -1; });
  });

