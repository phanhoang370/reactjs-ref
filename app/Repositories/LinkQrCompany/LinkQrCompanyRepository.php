<?php
namespace  App\Repositories\LinkQrCompany;
use App\Repositories\BaseRepository;
use App\Models\LinkQrCompany;

class LinkQrCompanyRepository extends BaseRepository implements LinkQrCompanyInterface
{
    public function model()
    {
        return LinkQrCompany::class;
    }

    public function findSerial($serial)
    {
        $serial = $this->where('qr_code', '=' ,$serial)->firstOrFail();

        return $serial;
    }

    public function findLinkQrCompany($id)
    {
        $linkQrCompany = $this->with([
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
        )->find($id);

        return $linkQrCompany;
    }
}
