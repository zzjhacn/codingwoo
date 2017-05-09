'use strict';
angular.module('MyTools')
    //封装所有Http 请求方法，统一处理服务器错误信息
    .factory("http", ['$http', '$window', '$uibModal', 'utils', function($http, $window, $uibModal, utils) {
        var methods = {
            'call': function(type, url, params, data) {
                // $http.useApplyAsync(true);
                return $http({
                    useApplyAsync: true,
                    method: type,
                    url: url,
                    params: params,
                    data: data
                }).then(methods.success, methods.errorModal);
            },
            'success': function(data, status, headers, config) {
                return data;
            },
            'errorModal': function(data, status, headers, config) {
                $uibModal.open({
                    templateUrl: 'pages/blocks/err.html',
                    backdrop: "static",
                    controller: "errorModal",
                    resolve: {
                        error: function() {
                            return data;
                        }
                    }
                });
            },
            'get': function(url, params) {
                return methods.call('GET', url, params);
            },
            'put': function(url, data) {
                return methods.call('PUT', url, null, data);
            },
            'post': function(url, data) {
                return methods.call('POST', url, null, data);
            },
            'delete': function(url, data) {
                return methods.call('DELETE', url, data, null);
            }
        }
        return methods;
    }])
    .factory("rest", ["http", function(http) {
        var methods = {
            list: function(urlPrefix) {
                return {
                    "get": function(params) {
                        return http.get(urlPrefix, params);
                    },
                    "getOne": function(params) {
                        return http.get(urlPrefix + params.id, params);
                    },
                    "put": function(params) {
                        return http.put(urlPrefix + params.id, params);
                    },
                    "post": function(params) {
                        return http.post(urlPrefix, params);
                    },
                    "delete": function(params) {
                        return http.delete(urlPrefix + params.id);
                    }
                }
            }
        }
        return methods;
    }])
    //公共方法服务
    .factory("utils", ["$http", '$uibModal', function($http, $uibModal) {
        var methods = {
            //确认窗口
            confirm: function(text) {
                return $uibModal.open({
                    templateUrl: 'pages/blocks/modal.html',
                    backdrop: "static",
                    controller: "confirmmModal",
                    resolve: {
                        items: function() {
                            return text;
                        }
                    }
                });
            },
            //飘窗提示窗口
            notify: function(content, type) {
                $.notify(content, {
                    type: type,
                    delay: 1000,
                    z_index: 1000000,
                    placement: {
                        from: 'top',
                        align: 'right'
                    }
                });
            },
            //从列表中移除指定的项目
            remove: function(list, item, fn) {
                angular.forEach(list, function(i, v) {
                    if (fn ? (fn(i, item)) : (i.$$hashKey === item.$$hashKey)) {
                        list.splice(v, 1);
                        return false;
                    }
                    return true;
                });
            },
            //判断当前项目是否在array 中存在
            inArray: function(val, array, fn) {
                var has = false;
                angular.forEach(array, function(v) {
                    if (fn && fn(val, v) || val === v) {
                        has = true;
                        return false;
                    }
                    return true;
                });
                return has;
            }
        }
        return methods;
    }])
    //确认弹窗服务
    .controller("confirmmModal", ['$scope', '$uibModalInstance', 'items', function($scope, $uibModalInstance, items) {
        var methods = {
            //用户点击确认按钮
            ok: function() {
                $uibModalInstance.close(true);
            },
            //用户点击取消按钮
            cancel: function() {
                $uibModalInstance.dismiss('cancel');
            },
            text: items
        };
        //将方法集合并到$scope中
        $.extend($scope, methods);
    }])
    // 错误提示窗口服务
    .controller("errorModal", ['$scope', '$uibModalInstance', 'error', function($scope, $uibModalInstance, error) {
        $scope.error = error;
        var methods = {
            cancel: function() {
                $uibModalInstance.dismiss('cancel');
            },
            report: function() {
                $uibModalInstance.close(true);
            }
        }
        angular.extend($scope, methods, error);
    }])
