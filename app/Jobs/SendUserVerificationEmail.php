<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Mail\UserVerification;
use Mail;

class SendUserVerificationEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $mailTo;
    protected $token;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($mailTo, $token)
    {
        $this->mailTo = $mailTo;
        $this->token = $token;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to($this->mailTo)->send(new UserVerification($this->token));
    }
}
