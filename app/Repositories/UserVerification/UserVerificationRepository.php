<?php
namespace  App\Repositories\UserVerification;
use App\Repositories\BaseRepository;
use App\Models\UserVerification;

class UserVerificationRepository extends BaseRepository implements UserVerificationInterface
{
    public function model()
    {
        return UserVerification::class;
    }
}
