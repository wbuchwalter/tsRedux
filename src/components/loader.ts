import {IRegionActionCreator} from '../actions/regionActionCreators';
import {IPermissionActionCreator} from '../actions/permissionActionCreators';

export default function regionLoader() {
  return {
    restrict: 'E',
    controllerAs: 'vm',
    controller: LoaderController,
    template: "<button type='button' ng-click='vm.load()'>Load</button>",
    scope: {}
  };
}

class LoaderController {  

  constructor(private permissionActions: IPermissionActionCreator, private regionActions: IRegionActionCreator) {
  }

  load() {
    this.permissionActions.loadPermissionsAsync();
    this.regionActions.loadRegionsAsync();
  }
}