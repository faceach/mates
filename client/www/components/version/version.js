'use strict';

angular.module('mates.version', [
  'mates.version.interpolate-filter',
  'mates.version.version-directive'
])

.value('version', '0.1');
