<?php
namespace  App\Repositories\Country;
use App\Repositories\BaseRepository;
use App\Models\Country;

class CountryRepository extends BaseRepository implements CountryInterface
{
    public function model()
    {
        return Country::class;
    }
}
