<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\User\UserInterface;
use App\Repositories\User\UserRepository;
use App\Repositories\Bill\BillInterface;
use App\Repositories\Bill\BillRepository;
use App\Repositories\Company\CompanyInterface;
use App\Repositories\Company\CompanyRepository;
use App\Repositories\Guider\GuiderInterface;
use App\Repositories\Guider\GuiderRepository;
use App\Repositories\Profit\ProfitInterface;
use App\Repositories\Profit\ProfitRepository;
use App\Repositories\Store\StoreInterface;
use App\Repositories\Store\StoreRepository;
use App\Repositories\Percent\PercentInterface;
use App\Repositories\Percent\PercentRepository;
use App\Repositories\UserVerification\UserVerificationInterface;
use App\Repositories\UserVerification\UserVerificationRepository;
use App\Repositories\City\CityInterface;
use App\Repositories\City\CityRepository;
use App\Repositories\Role\RoleInterface;
use App\Repositories\Role\RoleRepository;
use App\Repositories\Permission\PermissionInterface;
use App\Repositories\Permission\PermissionRepository;
use App\Repositories\Country\CountryInterface;
use App\Repositories\Country\CountryRepository;
use App\Repositories\InfoGuiderFeeRate\InfoGuiderFeeRateInterface;
use App\Repositories\InfoGuiderFeeRate\InfoGuiderFeeRateRepository;
use App\Repositories\LinkQrCompany\LinkQrCompanyInterface;
use App\Repositories\LinkQrCompany\LinkQrCompanyRepository;
use App\Repositories\Report\ReportInterface;
use App\Repositories\Report\ReportRepository;
use App\Repositories\Type\TypeInterface;
use App\Repositories\Type\TypeRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        
        // $models = [
        //     'User',
        // ];
        // foreach ($models as $model) {
        //     $this->app->bind(
        //         app("App\Repositories\\{$model}\\{$model}Interface"),
        //         app("App\Repositories\\{$model}\\{$model}Repository")
        //     );
        // }
        $this->app->bind(UserInterface::class, UserRepository::class);
        $this->app->bind(BillInterface::class, BillRepository::class);
        $this->app->bind(CompanyInterface::class, CompanyRepository::class);
        $this->app->bind(GuiderInterface::class, GuiderRepository::class);
        $this->app->bind(ProfitInterface::class, ProfitRepository::class);
        $this->app->bind(StoreInterface::class, StoreRepository::class);
        $this->app->bind(PercentInterface::class, PercentRepository::class);
        $this->app->bind(UserVerificationInterface::class, UserVerificationRepository::class);
        $this->app->bind(CityInterface::class, CityRepository::class);
        $this->app->bind(RoleInterface::class, RoleRepository::class);
        $this->app->bind(PermissionInterface::class, PermissionRepository::class);
        $this->app->bind(CountryInterface::class, CountryRepository::class);
        $this->app->bind(InfoGuiderFeeRateInterface::class, InfoGuiderFeeRateRepository::class);
        $this->app->bind(LinkQrCompanyInterface::class, LinkQrCompanyRepository::class);
        $this->app->bind(ReportInterface::class, ReportRepository::class);
        $this->app->bind(TypeInterface::class, TypeRepository::class);
    }
}
