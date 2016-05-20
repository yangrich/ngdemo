!function(e,n,t){"use strict";n.module("ui.nested.combobox",[]).constant("nestedComboBoxConfig",{options:{childrenParam:"children"}}).controller("NestedComboBoxController",["$scope","$element","$attrs","nestedComboBoxConfig","$timeout",function(e,t,o,l,i){function s(e,t){var o,l,i;if(e===t.id)return t;if(n.isArray(t[c.options.childrenParam]))for(o=0;o<t[c.options.childrenParam].length;o+=1)if(l=t[c.options.childrenParam][o],i=s(e,l),i!==!1)return i;return!1}var c=this,a=null;this.isOpen=!1,this.options=n.isDefined(e.options)?e.options:l.options,this.selectedItem={};var r=!1;e.$watch("collection",function(t){if(e.collection){n.isArray(e.collection)||(e.collection=[e.collection]);for(var o=0;o<e.collection.length;o+=1)r=s(e.nsNgModel,e.collection[o]),r!==!1&&n.extend(c.selectedItem,r)}}),this.toggleOpen=function(){return e.controlDisabled?(this.isOpen=!1,!1):void(this.isOpen=!this.isOpen)},this.toggleBlur=function(){i(function(){c.isOpen=!1},200)},this.toggleFocus=function(){return e.controlDisabled?(this.isOpen=!1,!1):void(c.isOpen=!1)},this.selectValue=function(t,o){return a===o.id?!0:(e.changeEvent(o),n.extend(c.selectedItem,o),e.nsNgModel=o.id,void(a=o.id))}}]).directive("nestedComboBox",["$templateCache",function(e){return{restrict:"E",controller:"NestedComboBoxController",controllerAs:"gs",replace:!0,template:e.get("select-group.html"),scope:{collection:"=?",controlClass:"@?",controlDisabled:"=?",changeEvent:"=?",options:"=?",nsNgModel:"=?"}}}])}(window,window.angular),function(e){try{e=angular.module("ui.nested.combobox")}catch(n){e=angular.module("ui.nested.combobox",[])}e.run(["$templateCache",function(e){e.put("select-group.html",'<div class="custom-select" data-ng-disabled="controlDisabled" data-ng-class="controlClass" data-ng-click="gs.toggleOpen()"  >\n    <input data-ng-model="gs.selectedItem.name" ng-blur="gs.toggleBlur()" ng-focus="gs.toggleFocus()" readonly />\n    <span><i class="icon-sort-down"></i></span>\n    <div class="list" data-ng-show="gs.isOpen">\n        <ul>\n            <li data-ng-class="{\'active\':ngNgModel.id === member.id}" data-ng-include="\'sub-level.html\'"\n                data-ng-repeat="member in collection"></li>\n        </ul>\n    </div>\n\n</div>')}])}(),function(e){try{e=angular.module("ui.nested.combobox")}catch(n){e=angular.module("ui.nested.combobox",[])}e.run(["$templateCache",function(e){e.put("sub-level.html",'<a href="" data-ng-click="gs.selectValue(e,member)"><span>{{member.name}}</span></a>\n<ul>\n    <li data-ng-class="{\'active\':gs.selectedItem.id === member.id}"\n        ng-repeat="member in member[gs.options.childrenParam]" ng-include="\'sub-level.html\'"></li>\n</ul>\n')}])}();