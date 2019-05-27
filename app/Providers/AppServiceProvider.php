<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App;
use URL;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if(App::environment() === 'heroku'){
            URL::forceScheme('https');
        }
    }
}
