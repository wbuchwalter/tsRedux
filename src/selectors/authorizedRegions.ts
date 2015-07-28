import reselect = require('reselect');
import {Region} from '../reducers/region';

/*
A region is authorized if it's uid, or the uid of one of it's parent is present in the permission.
if '*' is present in the permissions, then all regions are authorized
*/

export const authorizedRegionsSelector = reselect.createSelector(
  [state => state.regions.regionList, state => state.permissions.authorizedRegionUids],
  (regions, authorizedUids) => {
    if (_.any(authorizedUids, uid => uid === '*')) { return regions };

    let authorized = angular.copy(authorizedUids);
    return _.filter(regions, (r: Region) => {
      let isAuthorized = _.any(authorized, (uid) => {
        let isParentAuthorized = r.parentId ? uid === regions[r.parentId].uid : false;
        return isParentAuthorized || uid === r.uid;
      });

      if (isAuthorized) {
        authorized.push(r.uid);
      }
      return isAuthorized;
    });
  }
  );
