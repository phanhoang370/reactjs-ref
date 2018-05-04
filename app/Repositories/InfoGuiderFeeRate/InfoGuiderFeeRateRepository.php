<?php
namespace  App\Repositories\InfoGuiderFeeRate;
use App\Repositories\BaseRepository;
use App\Models\InfoGuiderFeeRate;

class InfoGuiderFeeRateRepository extends BaseRepository implements InfoGuiderFeeRateInterface
{
    public function model()
    {
        return InfoGuiderFeeRate::class;
    }
}
