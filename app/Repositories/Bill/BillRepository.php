<?php
namespace  App\Repositories\Bill;
use App\Models\LinkQrCompany;
use App\Models\Store;
use App\Repositories\BaseRepository;
use App\Models\Bill;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;

class BillRepository extends BaseRepository implements BillInterface
{
    public function model()
    {
        return Bill::class;
    }
}
