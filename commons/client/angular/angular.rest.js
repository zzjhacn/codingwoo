(function(window, angular) {
  'use strict';

  var absController = function($scope, $attrs, http, toaster, utils, $state) {
    $scope.baseurl = $attrs.serverUrl //基础URL
    $scope.what = $attrs.serverWhat //
    $scope.profileUrl = $scope.baseurl + 'profile/' + $scope.what //配置URL
    $scope.serverUrl = $scope.baseurl + $scope.what
    $scope.adding = false

    $scope.page = {
      size: 10,
      number: 0
    }


    //从远端读取配置，并与本地配置合并
    $scope.columns = []
    if (pg_cfg[$state.current.name]) {
      $scope.methods = pg_cfg[$state.current.name].methods || "R"
      $scope.title = pg_cfg[$state.current.name].title || $state.current.name
      $scope.resolver = pg_cfg[$state.current.name].resolver || function() {}
    }
    http.get($scope.profileUrl).then(function(resp) {
      resp.data.alps.descriptors.forEach(function(desc) {
        if (desc.href == $scope.profileUrl) {
          var columnDesc = pg_cfg[$state.current.name].desc
          desc.descriptors.forEach(function(f) {
            if (columnDesc[f.name]) {
              angular.extend(f, columnDesc[f.name])
              $scope.columns.push(f)
            }
          })
        }
      })
    })

    // 查询方法
    $scope.query = function() {
      http.get($scope.serverUrl, {
        size: $scope.page.size,
        page: $scope.page.number - 1
      }).then(function(resp) {
        $scope.list = resp.data._embedded[$scope.what]
        $scope.page = {
          size: resp.data.page.size,
          number: resp.data.page.number + 1,
          totalPages: resp.data.page.totalPages,
          totalElements: resp.data.page.totalElements
        }
      })
    }
    $scope.append = function() {
      if ($scope.adding && $scope.adding == true) {
        return
      }
      $scope.list.unshift(new Object({
        editing: true,
        isNew: true
      }))
      $scope.adding = true
    }
    $scope.cancel = function(item) {
      if (item.isNew) {
        $scope.list.shift(item)
        $scope.adding == false
        return
      }
      var orig = item.orig
      delete item.orig
      angular.extend(item, orig)
      item.editing = false
    }
    $scope.edit = function(item) {
      item.orig = angular.copy(item)
      item.editing = true;
    }
    $scope.delete = function(item) {
      utils.confirm({
        msg: 'Confirm to delete ? ',
        ok: 'Yes',
        cancel: 'No'
      }).result.then(function() {
        http.delete(item._links.self.href, item).then(function(resp) {
          $scope.list.remove(item)
          toaster.pop('success', 'Success', 'Delete success')
        })
      }, function() {
        // console.log('cancel')
      })
    }
    $scope.save = function(item) {
      console.log(item)
      if (item.isNew) {
        http.post($scope.serverUrl, item).then(function(resp) {
          angular.extend(item, resp.data)
          item.editing = false
          item.isNew = false
          $scope.adding = false
          toaster.pop('success', 'Success', 'Add success')
        })
        return
      }
      delete item.orig
      http.put(item._links.self.href, item).then(function(resp) {
        angular.extend(item, resp.data)
        item.editing = false
        toaster.pop('success', 'Success', 'Save success')
      })
    }

    $scope.query()
  }

  angular
    .module('grayAngularRest', [])
    .directive('grayRestCrud', ['$parse', function($parse) {
      return {
        restrict: 'AE',
        replace: true,
        templateUrl: function(elem, attrs) {
          return attrs.templateUrl
        },
        controller: absController,
        link: function(scope, elm, attrs, grayRestCrudController) {
          // angular.extend(grayRestCrudController, absController)
          // grayRestCrudController = absController
          // console.log(grayRestCrudController)
        }
      }
    }])

})(window, window.angular);
