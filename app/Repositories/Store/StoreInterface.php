<?php
namespace App\Repositories\Store;

interface StoreInterface
{
    public function searchByName($name, $select = ['*']);
    public function getStoreByType($id = null);
    public function findStore($id);
    public function findTypeAll();
    public function getStoreForCreateUser();
    public function createUser($store_id, $user);
}
