import '../public/css/font-awesome/css/font-awesome.min.css';
import '../public/css/bootstrap.min.css';
import '../public/css/style.css';
import '../public/css/default.css';



import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './app.config';
import home from './home';

angular.module('app', [uirouter, home])
  .config(routing);