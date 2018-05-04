<?php
namespace App\Repositories\Guider;

interface GuiderInterface
{
    public function findGuider($id);
    public function getAllGuiderOfCompany ($id);
    public function getManager($select = ['*']);
    public function getGuiderForCreateUser();
    public function updateUser($guid_id, $user);
}
