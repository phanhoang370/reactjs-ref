<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\User\UserInterface;
use App\Repositories\Company\CompanyInterface;
use App\Jobs\SendUserVerificationEmail;
use DB;
use Validator;
use Exception;
use App\Http\Requests\CreateCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Http\Requests\PolicyRequest;
use App\Notifications\SMSNotification;
use App\Repositories\City\CityInterface;
use App\Repositories\Country\CountryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CompanyController extends Controller
{
    protected $userRepository;
    protected $companyRepository;
    protected $cityRepository;
    protected $countryRepository;

    public function __construct (
        UserInterface $userRepository,
        CompanyInterface $companyRepository,
        CityInterface $cityRepository,
        CountryInterface $countryRepository
    ) {
        $this->userRepository = $userRepository;
        $this->companyRepository = $companyRepository;
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
        if ($limit) {
            $companies = $this->companyRepository->paginate($limit);
        } else {
            $companies = $this->companyRepository->allCompany();
        }

        return response()->json([
            'success' => true, 
            'data'=> $companies
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateCompanyRequest $request)
    {
        $company = [

            'company_name' => $request->name,
            'company_address' => $request->address,
            'company_tel' => $request->tel,
            'ceo_name' => $request->seo,
            'home_page' => $request->homepage,
            'contact_persion' => $request->contact_persion,
            'contact_email' => $request->contact_email,
            'parent_commission_rate' => $request->parent_commission_rate,
        ];

        $city = [
            'city_name' => $request->city,
        ];
        $country = [
            'country_name' => $request->country,
        ];

        DB::beginTransaction();
        try {

            $city = $this->cityRepository->firstOrCreate($city);
            $company['city_id'] = $city->city_id;

            $country = $this->countryRepository->firstOrCreate($country);
            $company['country_id'] = $country->country_id;

            $company = $this->companyRepository->createCompany($company);

            // $company->notify(new SMSNotification());

            // $this->sendEmail($user->email, $token);

            DB::commit();

            return response()->json([
                'success' => true, 
                'data' => $company,
                'message' => 'Create company successfully',
            ]);
        } catch (Exception $e) {
            DB::rollback();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
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

    public function generateToken()
    {
        return str_random(30);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (!is_numeric($id)) {
            return response()->json([
                'success' => false,
            ], 404);
        }
        try {
            $company = $this->companyRepository->findCompany($id);

            return response()->json([
                'success'=> true,
                'data' => $company,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCompanyRequest $request, $id)
    {
        $company = [
            'company_name' => $request->name,
            'company_address' => $request->address,
            'company_tel' => $request->tel,
            'ceo_name' => $request->seo,
            'home_page' => $request->homepage,
            'contact_persion' => $request->contact_persion,
            'contact_email' => $request->contact_email,
            'parent_commission_rate' => $request->parent_commission_rate,
        ];

        $city = [
            'city_name' => $request->city,
        ];
        $country = [
            'country_name' => $request->country,
        ];

        DB::beginTransaction();
        try {
            $city = $this->cityRepository->firstOrCreate($city);
            $company['city_id'] = $city->city_id;

            $country = $this->countryRepository->firstOrCreate($country);
            $company['country_id'] = $country->country_id;

            $company = $this->companyRepository->update($id, $company);
            
            DB::commit();

            return response()->json([
                'success' => true, 
                'data' => $company,
                'message' => 'Update company successfully',
            ]);
        } catch (Exception $e) {
            DB::rollback();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
            
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $id = $request->id;
         if ($this->companyRepository->deleteCompany($id)) {
            return response()->json([
                'success' => true, 
                'data' => $id,
                'message' => 'Delete company successfully',
            ]);
         }

        return response()->json([
            'success' => false, 
            'data' => $id,
            'message' => 'Update company fail',
        ]);
    }

    public function showStore($id)
    {
        $store = $this->companyRepository->getOneStore($id);
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

    public function getCompanyForCreateUser()
    {
        $companies = $this->companyRepository->getCompanyForCreateUser();

        return response()->json([
            'success' => true,
            'data' => $companies,
        ]);
    }

    public function getCompanyGuiderQrCode1()
    {
        $companies = $this->companyRepository->getGuiderForCreateQrCode1();

        return response()->json([
            'success' => true,
            'data'=> $companies,
        ]);
    }

    public function getCompanyQrCode1()
    {
        $qrcodes = $this->companyRepository->getAllQrCode1();

        return response()->json([
            'success' => true,
            'data'=> $qrcodes,
        ]);
    }

    public function getAllStoreForMap()
    {
        $stores = $this->companyRepository->getAllStoreForMap();

        return response()->json([
            'success' => true,
            'data'=> $stores,
        ]);
    }

    public function getStoreTop(Request $request)
    {
        $limit = $request->limit;
        $stores = $this->companyRepository->getStoreTop($limit);

        return response()->json([
            'success' => true,
            'data'=> $stores,
        ]);
    }

    public function getCompanyPolicy()
    {
        $company = $this->companyRepository->getCompanyPolicy();

        return response()->json([
            'success' => true,
            'data'=> $company,
        ]);
    }

    public function updateCompanyPolicy(PolicyRequest $request)
    {
        $company = [
            'guid_fee_rate' => $request->guid_fee_rate,
            'guide_level' => $request->level,
            'commission_rate' => $request->commission_rate,
        ];
        $company = $this->companyRepository->updatePolicy($company);

        return response()->json([
            'success' => true,
            'data'=> $company,
        ]);
    }
}
