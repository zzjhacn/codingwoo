angular.module('MyTools')
    .directive('mCheck', [function() {
        return {
            restrict: 'A',
            replace: false,
            link: function(scope, elm) {
                elm.find('thead tr').each(function() {
                    $(this).append('<th><input type="checkbox"><th>')
                })
                elm.find('tbody tr').each(function() {
                    $(this).append('<td><input type="checkbox"><td>')
                })

                var all = "thead input[type='checkbox']"
                var item = "tbody input[type='checkbox']"

                elm.on("change", all, function() {
                    var o = $(this).prop("checked")
                    var tds = elm.find(item)
                    tds.each(function(i, check) {
                        $(check).prop("checked", o)
                    })
                })

                elm.on("change", item, function() {
                    var o = $(this).prop("checked")
                    var isChecked = true
                    if (o) {
                        elm.find(item).each(function() {
                            if (!$(this).prop("checked")) {
                                isChecked = false
                                return false
                            }
                            return true
                        })
                    }
                    elm.find(all).prop("checked", o && isChecked)
                })
            }
        }
    }])
