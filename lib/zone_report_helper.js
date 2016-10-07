/**
 * Created by yxia on 6/25/15.
 */
var ktube_admin = angular.module('zone_report', ['angularSpinner', 'ngDialog']);

var ktube_buket = 'https://www.googleapis.com/storage/v1/b/ktube/o';

ktube_admin.filter('num', function () {
    return function (input) {
        var result = parseInt(input, 10);
        return result;
    }
});

ktube_admin.filter('pn_number', function () {
    return function (input) {
        var result = parseInt(input, 10);
        if (result > 0) {
            return "+" + result
        }
        else {
            return result
        }
    }
});


ktube_admin.filter('getDate', function () {
    return function (input) {
        return input.substring(0, 10);
    }
});
function getChangePercentage(new_number, old_number) {
    var n = (new_number - old_number) / old_number;
    return Number((n.toFixed(2) * 100).toFixed(0));
}

ktube_admin.controller('mongoHttpController', function ($scope, ktubeBucketService) {
    $scope.service = ktubeBucketService;
    ktubeBucketService.callBucketURL(ktube_buket);
    $scope.$watch('service.getBucketData()', function (newVal) {
        $scope.ktubeData = newVal["_embedded"]["rh:coll"][10]['_id']

    });
});


ktube_admin.controller('dataCollectionController_1', function ($scope, ktubeBucketService) {
    $scope.service = ktubeBucketService;
    ktubeBucketService.callBucketURL(ktube_buket);
    $scope.$watch('service.getBucketData()', function (response) {
        var response = response["_embedded"]["rh:coll"]
        var length = response.length;
        var collection1 = response[length - 1]["_id"];
        var collection2 = response[length - 2]["_id"];
        var collection3 = response[length - 3]["_id"];
        var collection4 = response[length - 4]["_id"];
        var collection5 = response[length - 5]["_id"];
        ktubeBucketService.callBucketURL(ktube_buket + collection1);
        $scope.$watch('service.getBucketData()', function (response) {
            $scope.dataCollection1 = response["_embedded"]["rh:doc"][0]['_links']['self']['href'] + " xxx2 " + collection1;
        })
    })
});

ktube_admin.controller('dataCollectionController_2', function ($scope, ktubeBucketService) {
    $scope.service1 = ktubeBucketService;
    ktubeBucketService.callBucketURL(ktube_buket);
    $scope.$watch('service1.getBucketData()', function (response) {
        var response = response["_embedded"]["rh:coll"]
        var length = response.length;
        var collection1 = response[length - 1]["_id"];
        var collection2 = response[length - 2]["_id"];
        var collection3 = response[length - 3]["_id"];
        var collection4 = response[length - 4]["_id"];
        var collection5 = response[length - 5]["_id"];
        ktubeBucketService.callBucketURL(ktube_buket + collection2);
        $scope.$watch('service1.getBucketData()', function (response) {
            $scope.dataCollection2 = response["_embedded"]["rh:doc"][0]['_links']['self']['href'] + " xxx1 " + collection2;
        })
    })
});

ktube_admin.service('ktubeBucketService', function ($http) {
    var that = this;
    this.ktubeData = [];

    this.callBucketURL = function (ktube_bucket_url) {
        $http.get(ktube_bucket_url).success(function (data) {
            that.ktubeData = data;
        });
    };

    this.getBucketData = function () {
        return this.ktubeData;
    };
});

ktube_admin.service('zoneReportMongoRootService', function ($http) {
    var that = this;
    this.ktubeData = [];

    this.callBucketURL = function () {
        $http.get(ktube_buket).success(function (data) {
            that.ktubeData = data;
        });
    };

    this.getBucketData = function () {
        return this.ktubeData;
    };
});


ktube_admin.factory('my_service_factory', function ($http) {
    return {
        getMongoRecord: function (id) {
            return $http.get(ktube_buket + id);
        }
    }
});

ktube_admin.service('my_service', function ($http) {
    this.getRecord = function () {
        return $http.get(ktube_buket + 'zoneReport_2015_06_26_155348')
            .then(
            function (response) {
                return {
                    xyresponse: response['data']["_embedded"]["rh:doc"][0]['_links']['self']['href']
                }
            }
        )
    }
});

ktube_admin.controller('request_controller', function ($scope, $http) {
    $http.get("https://www.googleapis.com/storage/v1/b/ktube/o")
        .then(function (response) {
            console.log("Print sth");
            var data = response.data["items"];
            console.log(data);
            $scope.result_for_table = data;

            console.log("this is the length:" + response.data);
            // var i;
            // for (i = 0; i < zoneReport1.length; ++i) {
            //
            // }
        });
});