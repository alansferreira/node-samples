// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
console.log('hello world!')

document.body.addEventListener('click', () => {
  console.log('hello vscode!')
})
var angular = require('angular');
var fs = require('fs');


var app = angular.module('app', []);
app.controller('testectrl', function ($scope) {
  $scope.msg = 'hello angu!'
});



var GoldenLayout = require('golden-layout');

console.log('golden-layout loaded!');

var config = {
  content: [{
    type: 'column',
    content: [{
      type: 'row',
      content: [
        { type: 'component', componentName: 'example', componentState: { text: 'left tools' } },
        {
          type: 'column',
          content: [
            { type: 'component', componentName: 'example', componentState: { text: 'documents' } },
            {
              type: 'stack',
              content: [
                { type: 'component', componentName: 'example', componentState: { text: 'bottom left tools' } },
                { type: 'component', componentName: 'example', componentState: { text: 'bottom right tools' } },
              ]
            }
          ]
        }]
    }]
  }]
};
var myLayout = new GoldenLayout(config);

myLayout.registerComponent('example', function (container, state) {
  container.getElement().html('<h2>' + state.text + '</h2>');
});

myLayout.init();

