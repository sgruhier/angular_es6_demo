var moduleName = "app.controllers";

class GlobeController {
  constructor($http) {
    this.$http = $http;
    this._loadArcs();
  }

  _loadArcs () {
    this.$http.get('/data/arcs.json').then((response) => {
      this.arcs = response.data;
    })
  }
}

GlobeController.$inject = ['$http'];

angular.module(moduleName, [])
  .controller('globeController', GlobeController);

export {moduleName as default};