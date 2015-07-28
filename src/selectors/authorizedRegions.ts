import reselect = require('reselect');

const taxSelector = reselect.createSelector(
  [state => state.regions, state => state.authorizedRegionUids],
  (regions, authorizedUids) => {
    return _.map(regions, (r) => {
      let region = angular.copy(r);
      region.isAuthorized = _.any(authorizedUids, (uid) => uid === '*' || uid === region.uid);
      return region; 
    })
  }
);