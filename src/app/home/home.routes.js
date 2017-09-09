routes.$inject = ['$stateProvider','$httpProvider'];

export default function routes($stateProvider,$httpProvider) {

  $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  $stateProvider
    .state('home', {
      url: '/',
      template: require('./home.html'),
      controller: 'HomeController',
      controllerAs: 'home'
    })
    .state('imagem', {
      url: '/imagem',
      template: require('./imagem.html'),
      controller: 'ImagemController',
      controllerAs: 'imagem'
    })
    .state('autenticacao', {
      url: '/autenticacao',
      template: '<div>Logando...</div>',
      controllerAs: 'auth',
      controller: function($location, $http, $scope){
        var code = $location.search().code; 
        $http({
            method : 'POST',
            url : 'https://dribbble.com/oauth/token',
            data : {'client_id':'8c9b03aae9b8c213918ffc340705d35d5f3d54c24531d7ba845d797e419897d0',
                    'client_secret':'6d9a660ad2e131416608dc27b414b891f26a20a4b76439d323ce7ed940539e87',
                    'code':code},
        headers: {'Content-Type': 'application/json; charset=utf-8'}

        }).then(function (success){
            var retorno = success.data;
            
            var access_token = retorno.access_token;

            if(access_token != ''){
              $http({
                  method : 'GET',
                  url : 'https://api.dribbble.com/v1/user',
                  headers: {'Authorization': 'Bearer '+access_token}
              }).then(function (success){
                  var retornotoken = success.data;

                  window.localStorage.setItem('token', access_token);
                  window.localStorage.setItem('username', retornotoken.username);
                  window.localStorage.setItem('avatar_url', retornotoken.avatar_url);

                  console.log(retornotoken);

                  $location.path("/");
              },function (error){});
            }
            console.log(retorno);
        },function (error){});
      }
    });
}