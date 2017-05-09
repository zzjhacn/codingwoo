'use strict';

/* Filters */
// need load the moment.js to use this filter.
angular.module('MyTools')
    .filter('dict', function() {
        return function(data) {
            return data
        }
    })
    .filter("none", function() {
        return function(obj, content) {
            if (obj == null || obj == '') {
                return content;
            }
            return obj;
        }
    })
    .filter("tfFlag", function() {
        return function(obj) {
            switch (obj) {
                case "1":
                case "true":
                case true:
                    return "是";
                default:
                    return "否";
            }
        }
    })
    .filter("merge", function() {
        return function(ls, key, n, omit) {
            var a = [];
            ls = ls || [];
            angular.forEach(ls, function(v, i) {
                if (n && n <= i)
                    return false;
                a.push(v[key]);
            });
            if (n && ls.length > n)
                return a.join(',') + (omit || '');
            return a.join(',');
        }
    })
    .filter("keyFilter", function() {
        return function(items, field) {
            if (!field || field.length < 1) {
                return items
            }
            var result = {}
            angular.forEach(items, function(value, key) {
                if (key.indexOf(field) >= 0) {
                    result[key] = value
                }
            })
            return result
        }
    })
    .filter("highlight", ['$sce', function($sce) {
        return function(content, key) {
            if (!key || key.length < 1) {
                return content
            }
            var nk = content.replace(key, "<em>" + key + "</em>")
            return $sce.trustAsHtml(nk)
        }
    }])
