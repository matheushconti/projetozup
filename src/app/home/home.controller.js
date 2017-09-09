const HTTP = new WeakMap();

export default class HomeController {
  constructor($http) {
    this.name = 'World';

    $http({
                  method : 'GET',
                  url : 'https://api.dribbble.com/v1/shots?per_page=15&page=1',
                  headers: {'Authorization': 'Bearer 903fcee2941def1912fdc5c99f18e299e7bf57d9b9e6eb2b7c987c0f4127353d'}
              }).then(function (success){
                  var retornotoken = success.data;
                  console.log(retornotoken);
              },function (error){});
  }

  changeName() {
    this.name = 'angular-tips';
  }
}