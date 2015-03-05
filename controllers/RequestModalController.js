angular.module('leaveManagement').controller('RequestModalController', ['$scope', '$log', 'request', '$data', '$modalInstance', function($scope, $log, request, $data, $modalInstance) {
	$scope.request = request.data;
	$scope.view = request.view;
	$scope.leaveType = {V:'Vacation (V)',SL:'Sick Leave (SL)',FS:'Family Sick Leave (FS)',CU:'Comp Time Used (CU)',HF:'Holiday Float (HF)',B:'Bereavement (B)',JD:'Jury Duty (JD)',WD:'Witness Duty (WD)',ML:'Military Leave (ML)',AL:'Admin Leave (AL)',IP:'Incentive Pay (IP)',LA:'Authorized Leave without Pay (LA)',LU:'Unathorized Leave without Pay (LU)'};
	
	$scope.newRequest = {
		date: moment().format('YYYY-MM-DD'),
		endDate: moment().format('YYYY-MM-DD'),
		status: 'new'
	};
	
	$scope.submitRequest = function(request) {
		$data.write.submitRequest(request).then(function(result) {
			$modalInstance.close();
		});
	};
	
	$scope.updateRequest = function(request) {
		$data.write.updateRequest(request).then(function(result) {
			$modalInstance.close();
		});
	};
	$scope.close = function() {
		$modalInstance.close();
	};
	
}]);