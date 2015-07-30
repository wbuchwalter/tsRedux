import reselect = require('reselect');
import {Region} from '../reducers/region';
import {authorizedRegionsSelector} from './authorizedRegions';

export const matchingRegionsSelector = reselect.createSelector(
  [authorizedRegionsSelector, state => state.regions.filter],
  (regions, filter) => {
      return filter 
      ? _.filter(regions, r => r.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)
      : regions;
  });

