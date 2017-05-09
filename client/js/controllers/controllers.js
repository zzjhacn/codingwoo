app
    .controller("repoScannerController", ['$scope', '$location', 'http', '$timeout', function($scope, $location, http, $timeout) {
        $scope.repos = {}
        $scope.loading = true

        $scope.oneAtATime = false
        $scope.selectedTot = 0
        $scope.selectedTotSize = 0
        $scope.selectedShell = ''

        $scope.sum = function(set) {
            $scope.selectedTot = 0
            $scope.selectedTotSize = 0
            $scope.selectedShell = ''
            // Object.keys($scope.repos).forEach(function(repo) {
            //     $scope.repos[repo].forEach(function(r) {
            //         if (set) {
            //             r.checked = set
            //         }
            //         if (r.checked) {
            //             $scope.selectedTot++
            //                 $scope.selectedTotSize += r.size
            //             $scope.selectedShell += ("rm -rf " + r.path + "/" + r.version + "\n")
            //         }
            //     })
            // })
        }

        $scope.myfilter = function(k,v){
          console.log(k)
            return k.contains('ant')
        }

        $timeout(
            function() {
                http.get("/mvntree").then(function(resp) {
                    $scope.repos = resp.data
                    $scope.loading = false
                    $scope.sum(true)
                    // $('.dd').nestable('collapseAll')//expandAll
                    // console.log($(".dd"))
                })
            }, 1000, false
        )

    }])
