<?php
namespace App\Repositories\Company;

interface CompanyInterface
{
    public function allCompany();
    public function createCompany($data);
    public function findCompany($id);
    public function createStore($store, $link_company_store);
    public function getAllStore($limit);
    public function getOneStore($id);
    public function updateStore($id, $store, $linkCompanyStore);
    public function deleteCompany($id);
    public function getCompanyForCreateUser();
    public function getGuiderForCreateQrCode1();
    public function createQrCode1($serial, $guide);
    public function createGuider($guider);
    public function getAllQrCode1();
    public function findQrCode1($serial);
    public function getAllStoreForMap();
    public function getStoreTop($limit);
    public function getAllGuider();
    public function deleteGuider($id);
    public function getCompanyPolicy();
    public function updatePolicy($data);
    public function getQrCode1();
}
