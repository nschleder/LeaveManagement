angular.module('leaveManagement').controller('ManagerController', ['$scope', '$modal', '$log', '$q', '$data', '$http', function($scope, $modal, $log, $q, $data, $http) {
	var year = moment().format('YYYY');
	this.numOfDays = moment().daysInMonth();
	
	$data.read.grabEmployeeRequests().then(function(result) {
		$scope.empKeyReq = result.empKey;
		$scope.requests = result.results;
	});
	
	$scope.holidays = function(date) {
		var fdate = date.format("YYYY-MM-DD");
		var resp = false;
		switch(fdate) {
			case year+'-01-01':
				resp = 'newYears';
			break;
			case year+'-01-19':
				// Martin Luther King's Birthday
				resp = 'holiday';
			break;
			case year+'-02-12':
				// Lincoln's Birthday
				resp = 'holiday';
			break;
			case year+'-02-16':
				// Washignton's Birthday
				resp = 'holiday';
			break;
			case year+'-03-31':
				// Cesar Chavez Day
				resp = 'holiday';
			break;
			case year+'-05-25':
				// Memorial Day
				resp = 'holiday';
			break;
			case year+'-07-03':
				// Independence Day
				resp = 'holiday';
			break;
			case year+'-09-07':
				// Labor Day
				resp = 'holiday';
			break;
			case year+'-10-12':
				// Columbus Day
				resp = 'holiday';
			break;
			case year+'-09-11':
				// Veteran's Day
				resp = 'holiday';
			break;
			case year+'-11-26':
				// Thanksgiving Day
				resp = 'holiday';
			break;
			case year+'-11-27':
				// Day after Thanksgiving
				resp = 'holiday';
			break;
			case year+'-12-25':
				resp = 'christmas';
			break;
		}
		
		if(date.format("ddd") === 'Sun' || date.format("ddd") === 'Sat') {
			resp = 'inactive';
		}
		
		if(fdate === moment().format("YYYY-MM-DD") ) {
			resp = 'today';
		}
		
		if (resp) {
			return resp;
		} else {
			return false;
		}
	};
	
	$scope.week = {
		Sun: moment().startOf('week').format("MMM Do"),
		Mon: moment().startOf('week').add(1, 'days').format("MMM Do"),
		Tue: moment().startOf('week').add(2, 'days').format("MMM Do"),
		Wed: moment().startOf('week').add(3, 'days').format("MMM Do"),
		Thu: moment().startOf('week').add(4, 'days').format("MMM Do"),
		Fri: moment().startOf('week').add(5, 'days').format("MMM Do"),
		Sat: moment().startOf('week').add(6, 'days').format("MMM Do")
	};
	
	$scope.caliIcon = function(requests, date) {
		var response;
		var style;
		angular.forEach(requests, function(value, key) {
			if (value.date === date.format("YYYY-MM-DD")) {
				response = value;
			}
		});
		if (response) {
			switch (response.status) {
				case 'approved':
					style = 'fi-check green';
				break;
				case 'rejected':
				case 'cancelled':
					style = 'fi-x red';
				break;
				case 'new':
					style = 'fi-star yellow';
				break;
			}
		} else {
			style = false;
		}
		return style;
	};
	
	$scope.printRequest = function(requests, date, check) {
		
		var response = '';
		angular.forEach(requests, function(value, key) {
			if (value.date === date.format("YYYY-MM-DD")) {
				response = value;
			}
		});
		
		// if check is TRUE then check and see if there is a request on that date
		if (check) {
			if(response !== '') {
				return true;
			} else {
				return false;
			}
		}
		return response;
	};
	
	$scope.requestInfoPopup = function(request) {
		var req = {
			data: request,
			view: 'Request Info'
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
	
	$scope.days = [];
	for(var q = 0; q<4; q++) {
		for(var i = 0; i<7; i++) {
			var inc = ((q*7)+i);
			$scope.days.push(moment().startOf('week').add(inc+-7, 'days'));
		}
	}
	
}]);