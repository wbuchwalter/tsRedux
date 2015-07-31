import reselect = require('reselect');
import {Region, RegionMap} from '../reducers/region';

/*
A region is authorized if it's id, or the id of one of it's parent is present in the permission.
if '*' is present in the permissions, then all regions are authorized
*/

export const authorizedRegionsSelector = reselect.createSelector(
  [state => state.regions.regionIds, state => state.regions.regionsById, state => state.permissions.authorizedRegionIds],
  (regionIds: string[], regionMap: RegionMap, authorizedIds: string[]) => {
    if (_.any(authorizedIds, id => id === '*')) { return regionIds };

    let authorized = angular.copy(authorizedIds);
    return _.filter(regionIds, (rId: string) => {
      let region = regionMap[rId];
      let isAuthorized = _.any(authorized, (id) => {
        let isParentAuthorized = region.parentId ? id === regionIds[region.parentId].id : false;
        return isParentAuthorized || id === region.id;
      });

      if (isAuthorized) {
        authorized.push(region.id);
      }
      return isAuthorized;
    });
  }
  );
