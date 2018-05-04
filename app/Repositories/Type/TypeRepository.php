<?php
namespace  App\Repositories\Type;
use App\Repositories\BaseRepository;
use App\Models\Type;
use DB;

class TypeRepository extends BaseRepository implements TypeInterface
{
    public function model()
    {
        return Type::class;
    }
//    public function findTypeAll()
//    {
//        $storeAll = DB::table('types');
//
//        $storeAll=$storeAll->select(
//            'types.*'
//
//        )->get();
//        return $storeAll;
//
//    }
}
