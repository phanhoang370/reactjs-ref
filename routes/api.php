<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['namespace' => 'Api'], function() {

    Route::post('password/email', 'Auth\ForgotPasswordController@getResetToken');
    Route::get('password/reset/{token}', 'Auth\ResetPasswordController@getUserResetPassword');
    Route::post('password/reset', 'Auth\ResetPasswordController@reset');

    Route::post('login', 'AuthController@login');
    Route::get('verify/{token}', 'AuthController@verifyUser');
    Route::get('store-all/{id?}', 'StoreController@getStoreByType');
    Route::get('type-all', 'StoreController@showTypeAll');
    Route::group(['middleware' => 'jwt.auth'], function() {
        Route::get('user/get-permission', 'AuthController@getPermission');
        Route::post('logout', 'AuthController@logout');
        Route::put('user/password/reset/{id}', 'UserController@resetPasswordByUser');

        // user
        Route::group(['prefix' => 'user'], function() {
            // company
            Route::get('company', 'CompanyController@getCompanyForCreateUser')->middleware('role:primarynet');
            Route::get('guider', 'GuiderController@getGuiderForCreateUser')->middleware('role:company');
            Route::get('store', 'StoreController@getStoreForCreateUser')->middleware('role:company');
            Route::get('/', 'UserController@index')->middleware('permission:user-view');
            Route::post('/', 'UserController@store')->middleware('permission:user-create');
            Route::get('{user}', 'UserController@show')->middleware('permission:user-view');
            Route::put('{user}', 'UserController@update')->middleware('permission:user-edit');
            Route::post('delete', 'UserController@destroy')->middleware('permission:user-delete');
        });

        // role for create/update user
        Route::get('role/get-role', 'RoleController@getRole')->middleware('permission:role-view');

        // primarynet
        Route::group(['middleware' => ['role:primarynet']], function() {
            // role
            Route::group(['prefix' => 'role'], function() {
                Route::get('/', 'RoleController@index')->middleware('permission:role-view');
                Route::post('/', 'RoleController@store')->middleware('permission:role-create');
                Route::get('{role}', 'RoleController@show')->middleware('permission:role-view');
                Route::put('{role}', 'RoleController@update')->middleware('permission:role-edit');
                Route::post('delete', 'RoleController@destroy')->middleware('permission:role-delete');
            });
            // permission
            Route::get('permission', 'PermissionController@index');
        });

        // city
        Route::get('city', 'CityController@index');
        // Route::get('city', 'CityController@index')->middleware('permission:location-view');
        Route::post('city', 'CityController@store')->middleware('permission:location-create');
        Route::get('city/{city}', 'CityController@show')->middleware('permission:location-view');
        Route::put('city/{city}', 'CityController@update')->middleware('permission:location-edit');
        Route::post('city/delete', 'CityController@destroy')->middleware('permission:location-delete');

        // country
        Route::get('country', 'CountryController@index');
        // Route::get('country', 'CountryController@index')->middleware('permission:location-view');
        Route::post('country', 'CountryController@store')->middleware('permission:location-create');
        Route::get('country/{country}', 'CountryController@show')->middleware('permission:location-view');
        Route::put('country/{country}', 'CountryController@update')->middleware('permission:location-edit');
        Route::post('country/delete', 'CountryController@destroy')->middleware('permission:location-delete');

        // store
        Route::post('bill/register', 'BillController@register');
        Route::post('qrcode/dc-rate', 'BillController@dcrate');
        Route::post('bill', 'BillController@index');
        Route::put('bill/{id}', 'BillController@update');
        Route::post('store/report', 'BillController@reportGuider');
        Route::post('store/report/date', 'BillController@reportDate');
        Route::get('store/company', 'BillController@company');

        //guider
        Route::post('guider/qrcode', 'QrCodeController@guiderQrcode1');
        Route::post('guider/qrcode2', 'QrCodeController@guiderQrcode2');
        Route::post('guider/report', 'GuiderController@report');
        Route::get('guider/company','GuiderController@company');

        Route::group(['middleware' => ['role:company']], function() {
            // store
            Route::get('store', 'StoreController@index')->middleware('permission:store-view');
            Route::post('store', 'StoreController@store')->middleware('permission:store-create');
            Route::get('store/search', 'StoreController@search')->middleware(['permission:store-create', 'permission:store-edit']);
            Route::get('store/{store}', 'StoreController@show')->middleware('permission:store-view');
            // guider

            Route::get('guider', 'GuiderController@index')->middleware('permission:guider-view');
            Route::post('guider', 'GuiderController@store');
            Route::get('guider/manager', 'GuiderController@getManager')->middleware(['permission:guider-create', 'permission:guider-edit']);
            Route::delete('guider/{id}', 'GuiderController@destroy');
            Route::get('guider/{id}', 'GuiderController@show');
            Route::put('guider/{id}', 'GuiderController@update');
            Route::post('guider/delete', 'GuiderController@destroy')->middleware('permission:guider-delete');

            Route::get('company/policy', 'CompanyController@getCompanyPolicy');
            Route::post('company/policy', 'CompanyController@updateCompanyPolicy');
            Route::get('company/guider', 'GuiderController@getCompanyGuider');
            Route::get('company/store', 'CompanyController@getAllStoreForMap');
            Route::get('company/store-top', 'CompanyController@getStoreTop');

            // report
            Route::post('report/guider-store', 'ReportController@reportGuiderStore');
            Route::post('report/company-store', 'ReportController@reportCompanyStore');
            Route::post('report/company-guider', 'ReportController@reportCompanyGuider');
        });

        Route::put('store/{store}', 'StoreController@update')->middleware('permission:store-edit');
        Route::post('store/delete', 'StoreController@destroy')->middleware('permission:store-delete');

        //qrcode
        Route::post('qrcode', 'QrCodeController@generateQrCode1');
        Route::post('qrcode2', 'QrCodeController@generateqrcode2');

        // company
        Route::get('company/generate-qrcode-1', 'QrCodeController@getQrCode1');
        Route::post('company/store/generate-qrcode-1', 'QrCodeController@storeQrCode1');
        Route::put('company/qrcode-1/{id}', 'QrCodeController@updateQrCode1');
        Route::get('company', 'CompanyController@index')->middleware('role:company|primarynet');
        Route::post('company', 'CompanyController@store')->middleware('role:company|primarynet');
        Route::get('company/print/{serial}', 'QrCodeController@printQrCode');
        Route::get('company/qrcode-1', 'CompanyController@getCompanyQrCode1');
        Route::get('company/guider/qrcode-1', 'CompanyController@getCompanyGuiderQrCode1');
        Route::get('company/store/{store}', 'CompanyController@showStore');
        Route::get('company/{company}', 'CompanyController@show')->middleware('role:company|primarynet');
        Route::put('company/{company}', 'CompanyController@update')->middleware('role:company|primarynet');
        Route::post('company/delete', 'CompanyController@destroy')->middleware('role:company|primarynet');

        //Report
        Route::post('report', 'ReportController@guider');

        // type
        Route::get('type', 'TypeController@index');

    });
});
