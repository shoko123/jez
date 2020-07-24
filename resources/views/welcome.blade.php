<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Jezreel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
        
        <!--mdi icons-->
        <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
        
        <!--google's material design icons-->
        <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' rel="stylesheet">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet"/>

    </head>
    <body>
        <div id="app">
            <main-app/>
        </div>
       
        
        <script src="/js/manifest.js"></script>
        <script src="/js/vendor.js"></script>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
