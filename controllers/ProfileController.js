angular.module('leaveManagement').controller('ProfileController', ['$http', '$scope', 'ngDialog', '$modal', function ($http, $scope, ngDialog, $modal) {
	// var Nate={'John Smith':[{date:'2015-02-24',type:'SL',status:'pending',user:'jsmith',comments:'empty',managerComments:''},{date:'2015-02-25',type:'SL',status:'pending',user:'jsmith',comments:'empty',managerComments:''},{date:'2015-02-26',type:'SL',status:'pending',user:'jsmith',comments:'empty',managerComments:''}],'Jerry Schossow':[{date:'2015-02-28',type:'SL',status:'pending',user:'jschossow',comments:'empty',managerComments:''},{date:'2015-02-29',type:'SL',status:'pending',user:'jschossow',comments:'empty',managerComments:''},{date:'2015-02-30',type:'SL',status:'pending',user:'jschossow',comments:'empty',managerComments:''}]};var profile={name:'Nate Henson',user:'nHenson',email:'nhenson@sjcourts.org',role:'mangager',leave:{v:2,sl:4,fs:0,cu:0,hf:1,b:0,jd:0,wd:0,ml:0,al:0,ip:0,la:0,lu:0}}
	$scope.profile = {name:"Nate Henson",user:"nHenson",email:"nhenson@sjcourts.org",role:"mangager",manager:"John Smithy",employees:"Jerry Schossow, Nick Schleder",leave:{V:{startBalance:0,earned:0,taken:0,adjustments:0,endBalance:0},SL:{startBalance:0,earned:0,taken:0,adjustments:0,endBalance:0},FS:{startBalance:0,earned:0,taken:0,adjustments:0,endBalance:0},CU:{startBalance:0,earned:0,taken:0,adjustments:0,endBalance:0},HF:{startBalance:0,earned:0,taken:0,adjustments:0,endBalance:0},B:{startBalance:0,earned:0,taken:0,adjustments:0,endBalance:0},JD:{startBalance:0,earned:0,taken:0,adjustments:0,endBalance:0},WD:{startBalance:0,earned:0,taken:0,adjustments:0,endBalance:0},ML:{startBalance:0,earned:0,taken:0,adjustments:0,endBalance:0},AL:{startBalance:0,earned:0,taken:0,adjustments:0,endBalance:0},IP:{startBalance:0,earned:0,taken:0,adjustments:0,endBalance:0},LA:{startBalance:0,earned:0,taken:0,adjustments:0,endBalance:0},LU:{startBalance:0,earned:0,taken:0,adjustments:0,endBalance:0}}};
	$scope.userData = [{date:'2015-03-15',groupId:1,type:'SL',status:'pending',user:'jschossow',comments:'Woke up with a cough',managerComments:''},{date:'2015-03-16',groupId:1,type:'SL',status:'pending',user:'jschossow',comments:'Woke up with a cough',managerComments:''},{date:'2015-03-03',groupId:0,type:'V',status:'pending',user:'jschossow',comments:'Going to Reno',managerComments:''},{date:'2015-03-26',groupId:0,type:'V',status:'pending',user:'jschossow',comments:'Meh Dont Care enought to go',managerComments:''}];
	$scope.leaveType = {V:'Vacation (V)',SL:'Sick Leave (SL)',FS:'Family Sick Leave (FS)',CU:'Comp Time Used (CU)',HF:'Holiday Float (HF)',B:'Bereavement (B)',JD:'Jury Duty (JD)',WD:'Witness Duty (WD)',ML:'Military Leave (ML)',AL:'Admin Leave (AL)',IP:'Incentive Pay (IP)',LA:'Authorized Leave without Pay (LA)',LU:'Unathorized Leave without Pay (LU)'};
	
	// GetRequest takes the one request object and then will loop and check groupID to see if there is any
	// matches and passthoughs to the modle popup.
	$scope.getRequest = function(dateRequested) {
		var group = [];
		if (dateRequested.groupId !== 0) {
			angular.forEach ($scope.userData, function (value, index) {
				if (dateRequested.groupId == value.groupId) {
						group.push(value);
				}
			})
		} else {
			group.push(dateRequested);
		}
		
		return group;
	};
	
	$scope.requestInfoPopup = function(req) {
		var selectedRequest = req[0];
		selectedRequest.endDate='2000-01-01';

		angular.forEach (req, function (value, index) {
			selectedRequest.endDate=moment.max(moment(selectedRequest.endDate), moment(value.date));
			selectedRequest.date=moment.min(moment(selectedRequest.date), moment(value.date));
		})
		
		selectedRequest.endDate=moment(selectedRequest.endDate).format("YYYY-MM-DD");
		selectedRequest.date=moment(selectedRequest.date).format("YYYY-MM-DD");
		
		console.log(selectedRequest);
		req = {};
		req.data = selectedRequest;
		req.view = 'Pending Request'
		
		modalInstance = $modal.open({
			templateUrl: '/wp-content/themes/twentyeleven-child/leaveManagement/views/requestModal.html',
			controller: 'RequestModalController',
			resolve: {
				request: function () {
					return req;
				}
			}
		});
	};
}]);