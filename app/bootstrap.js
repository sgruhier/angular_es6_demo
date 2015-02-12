import { default as controllersModuleName } from './app/controllers/globe';
import { default as directivesModuleName } from './app/directives/globe';

var app = angular
  .module('app', [directivesModuleName, controllersModuleName])

angular.bootstrap(document, ["app"]);
