<?php
namespace  App\Repositories\Guider;
use App\Repositories\BaseRepository;
use App\Models\Guider;
use DB;
use JWTAuth;

class GuiderRepository extends BaseRepository implements GuiderInterface
{
    public function model()
    {
        return Guider::class;
    }

    public function findGuider($id)
    {
        $guider = $this->with('city')->findOrFail($id);

        return $guider;
    }

    public function getAllGuiderOfCompany ($id){
        return DB::table('guiders')
            ->join('companies', 'guiders.company_id', '=', 'companies.company_id')
            ->join('cities', 'cities.city_id','=', 'companies.city_id')
            ->where('companies.user_id', $id)
            ->select('guiders.guid_id as id', 'cities.city_name', 'guiders.*')
            ->get();
    }

    public function getManager($select = ['*'])
    {
        $guiders = $this->where('guid_level', '<', 5)->get();

        return $guiders;
    }

    public function getGuiderForCreateUser()
    {
        $user = JWTAuth::parseToken()->authenticate();
        $company = $user->company;
        
        $guiders = $this->wherehas('company', function($query) use ($company) {
            $query->where('company_id', '=', $company->company_id);
        })
        ->select('guid_id', 'guid_name')
        ->get();

        return $guiders;
    }

    public function updateUser($guid_id, $user)
    {
        $guider = $this->where('user_id', '=', $user['user_id'])->first();
        if ($guider) {
            $guider->update(['user_id' => null]);
        }

        $guider = $this->update($guid_id, $user);

        return $guider;
    }
}
