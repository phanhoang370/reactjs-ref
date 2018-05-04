<?php
namespace App\Repositories\User;

interface UserInterface
{
    public function getAllUser();
    public function findUser($id);
    public function getAuthenticateUser($token);
    public function createVerification($user, $token);
    public function verification($token);
    public function createWithRole($user, $role);
    public function resetPasswordByUser($id, $data);
    public function createUser($user);
}
