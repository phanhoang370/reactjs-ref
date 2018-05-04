<?php
namespace  App\Repositories\City;
use App\Repositories\BaseRepository;
use App\Models\City;

class CityRepository extends BaseRepository implements CityInterface
{
    public function model()
    {
        return City::class;
    }
}
