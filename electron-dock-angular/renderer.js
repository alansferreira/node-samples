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
app.controller('testectrl', function($scope){
  $scope.msg = 'hello angu!'
});



var GoldenLayout = require('golden-layout');

console.log('golden-layout loaded!');

var config = {
  content: [{
    type: 'row',
    content: [
        {
        type:'component',
        componentName: 'example',
        componentState: { text: 'Component 1' }
        },
      {
        type:'component',
        componentName: 'example',
        componentState: { text: 'Component 2' }
        },
      {
        type:'component',
        componentName: 'example',
        componentState: { text: 'Component 3' }
        }
    ]
  }]
};
var myLayout = new GoldenLayout(config);

myLayout.registerComponent( 'example', function( container, state ){
  container.getElement().html( '<h2>' + state.text + '</h2>');
});

myLayout.init();    

