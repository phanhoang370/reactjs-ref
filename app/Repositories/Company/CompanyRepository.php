<?php
namespace  App\Repositories\Company;
use App\Repositories\BaseRepository;
use App\Models\Company;
use App\Repositories\Store\StoreInterface;
use App\Repositories\Guider\GuiderInterface;
use App\Repositories\LinkQrCompany\LinkQrCompanyInterface;
use JWTAuth;
use DB;
use Exception;

class CompanyRepository extends BaseRepository implements CompanyInterface
{
    protected $storeRepository;
    protected $guiderRepository;
    protected $linkQrCompanyRepository;

    public function __construct (
        StoreInterface $storeRepository,
        GuiderInterface $guiderRepository,
        LinkQrCompanyInterface $linkQrCompanyRepository
    ) {
        $this->storeRepository = $storeRepository;
        $this->guiderRepository = $guiderRepository;
        $this->linkQrCompanyRepository = $linkQrCompanyRepository;
        parent::__construct();
    }

    public function model()
    {
        return Company::class;
    }

    public function allCompany()
    {
        $user = JWTAuth::parseToken()->authenticate();
        $company = $user->company;
        $companies = $this->with([
            'city' => function($q) {
                $q->select('city_id', 'city_name');
            },
            'country' => function($q) {
                $q->select('country_id', 'country_name');
            },
        ]);
        if ($company && $user->hasRole('company')) {
            $companies = $companies->where('parent_company', '=', $company->company_id)
            ->get();
        } else {
            $companies = $companies->where('parent_company', '=', null)
            ->get();
        }

        return $companies;
    }

    public function createCompany($data)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $company = $user->company;
        if ($company && $user->hasRole('company')) {
            $data['parent_company'] = $company->company_id;
        }

        $company = $this->create($data);

        return $company;
    }

    public function findCompany($id)
    {
        $company = $this->with(['user', 'city', 'country'])->findOrFail($id);

        return $company;
    }

    public function getCompanyFromUserLoggedIn()
    {
        $user = JWTAuth::parseToken()->authenticate();
        $company = $user->company;

        return $company;
    }

    public function createStore($store, $linkCompanyStore)
    {
        $company = $this->getCompanyFromUserLoggedIn();

        $store = $this->storeRepository->create($store);

        $company->stores()->attach($store->store_id, $linkCompanyStore);

        return $store;
    }

    public function attachStore($storeId, $linkCompanyStore)
    {
        $company = $this->getCompanyFromUserLoggedIn();

        $company->stores()->attach($storeId, $linkCompanyStore);

        $store = $this->storeRepository->find($storeId);

        return $store;
    }

    public function getAllStore($limit)
    {
        $company = $this->getCompanyFromUserLoggedIn();

        $stores = DB::table('stores')
            ->join('cities', 'cities.city_id','=','stores.city_id')
            ->join('countries', 'countries.country_id','=','stores.country_id')
            ->join('link_company_store', 'link_company_store.store_id','=','stores.store_id')
            ->leftJoin('users', 'users.user_id','=','link_company_store.user_id')
            ->join('companies', 'link_company_store.company_id','=','companies.company_id')
            ->where('companies.company_id', '=', $company->company_id)
            ->select(
                'stores.*',
                'link_company_store.link_store_id',
                'users.email as store_email',
                'link_company_store.dc_rate',
                'link_company_store.company_fee_rate',
                'cities.city_name',
                'countries.country_name'
            )
            ->get();

        return $stores;
    }

    public function getOneStore($id)
    {
        $company = $this->getCompanyFromUserLoggedIn();

        $store = DB::table('stores')
            ->join('cities', 'cities.city_id','=','stores.city_id')
            ->join('countries', 'countries.country_id','=','stores.country_id')
            ->join('types', 'types.type_id','=','stores.type_id')
            ->join('link_company_store', 'link_company_store.store_id','=','stores.store_id')
            ->leftJoin('users', 'users.user_id','=','link_company_store.user_id')
            ->join('companies', 'link_company_store.company_id','=','companies.company_id')
            ->where('companies.company_id', '=', $company->company_id)
            ->where('link_company_store.link_store_id', '=', $id)
            ->select(
                'stores.*',
                'users.email as store_email',
                'link_company_store.link_store_id',
                'link_company_store.dc_rate',
                'link_company_store.company_fee_rate',
                'cities.city_name',
                'countries.country_name',
                'types.type_name'
            )
            ->first();

        if ($store) {
            return $store;
        }

        return false;
    }

    public function updateStore($id, $store, $linkCompanyStore)
    {
        DB::beginTransaction();
        try {
            $company = $this->getCompanyFromUserLoggedIn();

            $store = $this->storeRepository->update($id, $store);

            $company->stores()->updateExistingPivot($id, $linkCompanyStore);

            DB::commit();

            return $store;
        } catch (\Exception $e) {
            DB::rollback();

            throw new Exception($e->getMessage());
        }
        
        return $id;
    }

    public function detactStore($id)
    {
        $company = $this->getCompanyFromUserLoggedIn();

        $company->stores()->detach([$id]);

        return $id;
    }

    public function deleteCompany($id)
    {
        DB::beginTransaction();
        try {
            $company = $this->find($id);
            $company->user()->delete();
            $company->delete();

            DB::commit();

            return true;
        } catch (Exception $e) {
            DB::rollback();

            return false;
        }
    }

    public function getCompanyForCreateUser()
    {
        $companies = $this->select(['company_id', 'company_name'])->get();

        return $companies;
    }

    public function getGuiderForCreateQrCode1()
    {
        $company = $this->getCompanyFromUserLoggedIn();
        $guiders = $this->guiderRepository
            ->where('company_id', '=', $company->company_id)
            ->get();

        return $guiders;
    }

    public function createQrCode1($serial, $guide)
    {
        $company = $this->getCompanyFromUserLoggedIn();

        $guider = $this->guiderRepository->find($guide);

        $linkQrCompany = [
            'qr_code' => $serial,
            'city_id' => $guider->city_id,
            'company_id' => $company->company_id,
            'guid_id' => $guider->guid_id,
        ];

        $linkQrCompany = $this->linkQrCompanyRepository->create($linkQrCompany);

        return $linkQrCompany;
    }

    public function createGuider($guider)
    {
        DB::beginTransaction();
        try {
            $company = $this->getCompanyFromUserLoggedIn();

            $guider['company_id'] = $company->company_id;

            $guider = $this->guiderRepository->create($guider);

            DB::commit();

            return $guider;
        } catch (Exception $e) {
            DB::rollback();

            return false;
        }
        
    }

    public function getAllQrCode1()
    {
        $company = $this->getCompanyFromUserLoggedIn();

        $qrcodes = $this->linkQrCompanyRepository->whereHas('company', function($query) use ($company) {
            $query->where('company_id', '=', $company->company_id);
        })->with([
            'city' => function($query) {
                $query->select('city_id', 'city_name');
            }, 
            'guider' => function($query) {
                $query->select('guid_id', 'guid_name');
            }
        ])
        ->select(
            'link_qr_id',
            'qr_code',
            'city_id',
            'guid_id'
        )
        ->get();

        return $qrcodes;
    }

    public function findQrCode1($serial)
    {
        $company = $this->getCompanyFromUserLoggedIn();

        $qrcodes = $this->linkQrCompanyRepository->whereHas('company', function($query) use ($company) {
            $query->where('company_id', '=', $company->company_id);
        })
        ->with(['guider' => function($query) {
            $query->select(
                'guid_id',
                'guid_name'
            );
        }])
        ->where('qr_code', '=', $serial)
        ->select(
            'link_qr_id',
            'qr_code',
            'guid_id'
        )
        ->first();

        return $qrcodes;
    }
    
    public function getAllStoreForMap()
    {
        $company = $this->getCompanyFromUserLoggedIn();

        $company = $company->with(['stores' => function ($query) {
            $query->select('stores.store_id as id', 'stores.GPSX as lat', 'stores.GPSY as lng');
        }])->first();
        $stores = $company->stores;

        return $stores;
    }

    public function getStoreTop($limit)
    {
        $company = $this->getCompanyFromUserLoggedIn();

        $company = $company->with(['stores' => function ($query) use ($limit) {
            $query->select('stores.store_id', 'stores.store_name', 'stores.type_id', 'link_company_store.dc_rate');
            $query->with(['type' => function($q) {
                $q->select('types.type_id', 'types.type_name');
            }]);
            $query->orderBy('dc_rate', 'DESC');
            $query->take($limit);
        }])->first();
        $stores = $company->stores;

        return $stores;
    }

    public function getAllGuider()
    {
        $company = $this->getCompanyFromUserLoggedIn();

        $guiders = DB::table('guiders')
            ->join('companies', 'guiders.company_id', '=', 'companies.company_id')
            ->join('cities', 'cities.city_id','=', 'guiders.city_id')
            ->leftJoin('users', 'users.user_id','=', 'guiders.user_id')
            ->where('companies.company_id', $company->company_id)
            ->select('guiders.guid_id as id', 'cities.city_name', 'guiders.*', 'users.email as guid_email')
            ->get();

        return $guiders;
    }

    public function deleteGuider($id)
    {
        DB::beginTransaction();
        try {
            $company = $this->getCompanyFromUserLoggedIn();

            $guider = $this->guiderRepository->find($id);
            $guider->user()->delete();
            $guider->linkQrCompany()->delete();
            $guider->delete();

            DB::commit();

            return $guider;
        } catch (Exception $e) {
            DB::rollback();

            return false;
        }
    }

    public function getCompanyPolicy()
    {
        $company = $this->getCompanyFromUserLoggedIn();

        // $company = $company->select('guid_fee_rate', 'guide_level', 'commission_rate');

        return $company;
    }

    public function updatePolicy($data)
    {
        $company = $this->getCompanyFromUserLoggedIn();
        $company->update($data);

        return $company;
    }

    public function getQrCode1()
    {
        $company = $this->getCompanyFromUserLoggedIn();
        $lastLinkCompanyStore = $this->linkQrCompanyRepository
            ->where('company_id', '=', $company->company_id)
            ->orderBy('link_qr_id', 'desc')
            ->first();

        if (count(explode("_", $lastLinkCompanyStore->qr_code)) > 1) {
            $autoNumber = (intval(explode("_", $lastLinkCompanyStore->qr_code)[1]) + 1);
        } else {
            $autoNumber = 1;
        }
        
        $qrcode1 = $company->company_id . '_' . $autoNumber;

        return $qrcode1;
    }
}
