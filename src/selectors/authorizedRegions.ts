import reselect = require('reselect');
import {Region} from '../reducers/region';

export const authorizeRegionsSelector = reselect.createSelector(
  [state => state.regions.regionList, state => state.permissions.authorizedRegionUids],
  (regions, authorizedUids) => {
    return {
      regionList: _.filter(regions, (r) => {
        return _.any(authorizedUids, (uid) => uid === r.uid);       
      })
    };
  });

export interface AuthorizedRegionsSelectorData {
  regionList: Region[];
}