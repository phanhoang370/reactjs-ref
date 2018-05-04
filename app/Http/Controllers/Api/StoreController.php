<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Store\StoreInterface;
use App\Repositories\Company\CompanyInterface;
use App\Repositories\User\UserInterface;
use App\Repositories\City\CityInterface;
use App\Repositories\Country\CountryInterface;
use App\Http\Requests\CreateStoreRequest;
use App\Jobs\SendUserVerificationEmail;
use App\Notifications\SMSNotification;
use Validator;
use DB;

class StoreController extends Controller
{
    protected $storeRepository;
    protected $companyRepository;
    protected $userRepository;
    protected $cityRepository;
    protected $countryRepository;

    public function __construct (
        StoreInterface $storeRepository,
        CompanyInterface $companyRepository,
        UserInterface $userRepository,
        CityInterface $cityRepository,
        CountryInterface $countryRepository
    )
    {
        $this->storeRepository = $storeRepository;
        $this->companyRepository = $companyRepository;
        $this->userRepository = $userRepository;
        $this->cityRepository = $cityRepository;
        $this->countryRepository = $countryRepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $limit = $request->limit;
        $stores = $this->companyRepository->getAllStore($limit);
//        dd($stores);

        return response()->json([
            'success' => true,
            'data'=> $stores
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        if ($request->exist_id) {
            $rules = [
                'dc_rate' => 'required|numeric',
                'company_fee_rate' => 'required|numeric',
            ];
        } else {
            $rules = [
                'name' => 'required|max:255',
                'phone' => 'required|max:13',
                'address' => 'required|max:255',
                'dc_rate' => 'required|numeric|min:0|max:100',
                'company_fee_rate' => 'required|numeric|min:0|max:100',
                'homepage' => 'required|max:255',
                'type' => 'required|numeric',
            ];
        }

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json($validator->messages(), 422);
        }

        $city = [
            'city_name' => $request->city,
        ];
        $country = [
            'country_name' => $request->country,
        ];

        $store = [
            'store_name' => $request->name,
            'store_phone' => $request->phone,
            'store_address' => $request->address,
            'home_page' => $request->homepage,
            'description' => $request->description,
            'type_id' => $request->type,
            'GPSX' => $request->lat,
            'GPSY' => $request->lng,
        ];
        $link_company_store = [
            'dc_rate' => $request->dc_rate,
            'company_fee_rate' => $request->company_fee_rate,
        ];
        DB::beginTransaction();
        try {
            if ($request->exist_id) {
                $store = $this->companyRepository->attachStore($request->exist_id, $link_company_store);
            } else {
                $city = $this->cityRepository->firstOrCreate($city);
                $store['city_id'] = $city->city_id;

                $country = $this->countryRepository->firstOrCreate($country);
                $store['country_id'] = $country->country_id;

                $store = $this->companyRepository->createStore($store, $link_company_store);
            }
            
            DB::commit();

            return response()->json([
                'success' => true,
                'data' => $store,
            ]);
        } catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                'success' => false,
                'data' => $e->getMessage(),
            ]);
        }
    }

    public function sendEmail($mailTo, $token)
    {
        $job = (new SendUserVerificationEmail($mailTo, $token))
            ->onConnection('database')
            ->onQueue('emails');
        $this->dispatch($job);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $store = $this->storeRepository->findStore($id);
        if ($store) {
            return response()->json([
                'success' => true,
                'data' => $store,
            ]);
        }

        return response()->json([
            'success' => false,
        ], 404);
        
    }
    public function getStoreByType($id = null)
    {
        $storeAll = $this->storeRepository->getStoreByType($id);

        return response()->json([
            'success' => true,
            'data' => $storeAll,
        ]);
    }

    public function showTypeAll()
    {

        $storeAll = $this->storeRepository->findTypeAll();

        return response()->json([
            'success' => true,
            'data' => $storeAll,
        ]);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if ($request->exist_id) {
            $rules = [
                'dc_rate' => 'required',
                'company_fee_rate' => 'required',
            ];
        } else {
            $rules = [
                'name' => 'required|max:255',
                'phone' => 'required|max:13',
                'address' => 'required|max:255',
                'dc_rate' => 'required|numeric|min:0|max:100',
                'company_fee_rate' => 'required|numeric|min:0|max:100',
                'homepage' => 'required|max:255',
                'type' => 'required|numeric',
            ];
        }

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json($validator->messages(), 422);
        }

        $store = [
            'store_name' => $request->name,
            'store_phone' => $request->phone,
            'store_address' => $request->address,
            'home_page' => $request->homepage,
            'description' => $request->description,
            'type_id' => $request->type,
            'GPSX' => $request->lat,
            'GPSY' => $request->lng,
        ];
        $link_company_store = [
            'dc_rate' => $request->dc_rate,
            'company_fee_rate' => $request->company_fee_rate,
        ];
         
        $store = $this->companyRepository->updateStore($id, $store, $link_company_store);

        return response()->json([
            'success' => true,
            'data' => $store,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $store_id = $request->id;
        $this->companyRepository->detactStore($store_id);

        return response()->json([
            'success' => true,
            'data' => $store_id,
        ]);
    }

    public function search(Request $request)
    {
        $select = [
            'store_id',
            'store_name',
        ];
        $stores = $this->storeRepository->searchByName($request->search, $select);

        return response()->json([
            'success' => true,
            'data' => $stores,
            'name' => $request->name,
        ]);
    }

    public function getStoreForCreateUser()
    {
        $stores = $this->storeRepository->getStoreForCreateUser();

        return response()->json([
            'success' => true,
            'data' => $stores,
        ]);
    }
}
