import { Scene } from '../utils/scene';

var moduleName = "app.directives";

class GlobeDirective  {
  constructor() {
    this.link = this.link.bind(this)
    this.restrict = "AE";
    this.scope = {
      arcs: "="
    }
  }

  link(scope, element, attrs) {
    this.scene = new Scene(element[0])
    scope.$watch("arcs", (newValue, oldValue) => {
      if (newValue) {
        this.scene.setArcs(newValue)
      }
    })
  }
}

angular.module(moduleName, [])
  .directive('globe', () => { return new GlobeDirective() });

export {moduleName as default};