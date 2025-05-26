@extends('installation.installation')
@section('content')
@php
function generateRandomCode() {
	$characters = '0123456789abcdefghijklmnopqrstuvwxyz';
	$code = '';

	for ($i = 0; $i < 36; $i++) {
		if (in_array($i, [8, 13, 18, 23])) {
			$code .= '-';
		} else {
			$code .= $characters[rand(0, strlen($characters) - 1)];
		}
	}

	return $code;
}

$randomCode = generateRandomCode();
@endphp
    <div class="mar-ver pad-btm text-center">
        <h1 class="h3">Verify purchase</h1>
        <p>Fill this form with valid purchase code and author username</p>
    </div>
    @if(session()->has('error'))
        <div class="row" style="margin-top: 20px;">
            <div class="col-md-12">
                <div class="alert alert-danger">
                    {{session()->get('error')}}
                </div>
            </div>
        </div>
    @endif
    <p class="text-muted font-13">
    <form method="POST" action="{{route('verify.purchase')}}">
        @csrf
        <div class="form-group">
            <label for="username">Author Username</label>
            <input type="text" class="form-control" id="username" name="username" value="xxxxx" required>
        </div>
        <div class="form-group">
            <label for="purchase_code">Email</label>
            <input type="email" class="form-control" id="purchase_code" value="****@gmail.com" name="email" required>
        </div>
        <div class="form-group">
            <label for="purchase_code">Purchase Code</label>
            <input type="text" class="form-control" id="purchase_code" value="{{ $randomCode }}" name="purchase_code" required>
        </div>
        <div class="text-center">
            <button type="submit" class="btn btn-primary">Verify</button>
        </div>
    </form>
    </p>
@endsection
