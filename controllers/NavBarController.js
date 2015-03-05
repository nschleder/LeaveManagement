angular.module('leaveManagement').controller('NavBarController', ['$location', '$scope', '$modal', function($location, $scope, $modal) {
	// runs 11 times on page load?
	$scope.checkLoc = function(page) {
		if ($location.path() === '/'+page) {
			return 'active';
		}
	};
	
	$scope.newRequestPopup = function() {
		var req = {};
		req.view = 'New Request';
		req.data = {
			date: moment().format('YYYY-MM-DD'),
			endDate: moment().format('YYYY-MM-DD'),
			status: 'new'
		};
		$modal.open({
			templateUrl: '/wp-content/themes/twentyeleven-child/leaveManagement/views/requestModal.html',
			controller: 'RequestModalController as RequestModalCtrl',
			resolve: {
				request: function () {
					return req;
				}
			}
		});
	};
}]);