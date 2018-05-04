@component('mail::message')
# Introduction
<a href="#">{{ $token }}</a>

@component('mail::button', ['url' => ''])
Button Text
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
