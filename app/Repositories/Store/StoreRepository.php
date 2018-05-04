<?php
namespace  App\Repositories\Store;
use App\Repositories\BaseRepository;
use App\Models\Store;
use DB;
use JWTAuth;

class StoreRepository extends BaseRepository implements StoreInterface
{
    public function model()
    {
        return Store::class;
    }

    public function findTypeAll()
    {
        $storeAll = DB::table('types');

        $storeAll=$storeAll->select(
            'types.*'

        )->get();
        
        return $storeAll;
    }

    public function getStoreByType($id = null)
    {
        if ($id) {
            $stores = $this->has('type')->with([
                'type', 
                'linkCompanyStores' => function ($query) {
                    $query->select(
                        'link_company_store.store_id', 
                        DB::raw('max(link_company_store.dc_rate) as max_rate'), 
                        DB::raw('min(link_company_store.dc_rate) as min_min')
                    );
                    $query->groupBy('link_company_store.store_id');
                }
            ])
            ->where('type_id', '=', $id)
            ->get();
        } else {
            $stores = $this->has('type')->with([
                'type', 
                'linkCompanyStores' => function ($query) {
                    $query->select(
                        'link_company_store.store_id', 
                        DB::raw('max(link_company_store.dc_rate) as max_rate'), 
                        DB::raw('min(link_company_store.dc_rate) as min_rate')
                    );
                    $query->groupBy('link_company_store.store_id');
                }
            ])
            ->get();
        }

        return $stores;
    }

    public function findStore($id)
    {
        $store = DB::table('stores')
            ->join('types', 'types.type_id', '=', 'stores.type_id')
            ->where('stores.store_id', '=', $id)
            ->select(
                'stores.*',
                'types.type_name as type_name'
            )
            ->first();
        if ($store) {
            return $store;
        }

        return false;
    }

    public function searchByName($name, $select = ['*'])
    {
        $stores = $this->where('store_name', 'like', '%' . $name . '%')->get($select);

        return $stores;
    }

    public function getStoreForCreateUser()
    {
        $user = JWTAuth::parseToken()->authenticate();
        $company = $user->company;
        
        $stores = $this->wherehas('companies', function($query) use ($company) {
            $query->where('company_id', '=', $company->company_id);
        })
        ->select('store_id', 'store_name')
        ->get();

        return $stores;
    }

    public function createUser($store_id, $user)
    {
        $userLoggedIn = JWTAuth::parseToken()->authenticate();
        $company = $userLoggedIn->company;
        if (count($user->store) > 0) {
            DB::table('link_company_store')->where('company_id', '=', $company->company_id)
                ->where('store_id', '=', $user->store[0]->store_id)
                ->update(['user_id' => null]);
        }
        $store = DB::table('link_company_store')->where('company_id', '=', $company->company_id)
            ->where('store_id', '=', $store_id)
            ->update(['user_id' => $user['user_id']]);

        return $store;
    }
}
