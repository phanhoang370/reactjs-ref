<?php
namespace App\Repositories\LinkQrCompany;

interface LinkQrCompanyInterface
{
    public function findSerial($serial);
    public function findLinkQrCompany($id);
}
