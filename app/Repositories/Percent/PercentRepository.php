<?php
namespace  App\Repositories\Percent;
use App\Repositories\BaseRepository;
use App\Models\Percent;

class PercentRepository extends BaseRepository implements PercentInterface
{
    public function model()
    {
        return Percent::class;
    }
}
