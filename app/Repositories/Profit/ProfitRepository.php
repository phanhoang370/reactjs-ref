<?php
namespace  App\Repositories\Profit;
use App\Repositories\BaseRepository;
use App\Models\Profit;

class ProfitRepository extends BaseRepository implements ProfitInterface
{
    public function model()
    {
        return Profit::class;
    }
}
