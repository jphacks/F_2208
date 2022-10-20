<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use PayPay\OpenPaymentAPI\Client;
use PayPay\OpenPaymentAPI\Models\CreateQrCodePayload;
// use PayPay\OpenPaymentAPI\Models\OrderItem;

class PayPayController extends Controller {
    public function createQRCode(Request $request) {
        $user = $request->user();
        // $userAgent = $request->header('User-Agent');
        $amount = $request->amount;
        $merchantPaymentId = Str::random(16) . Carbon::now()->timestamp;

        $client = new Client([
            'API_KEY' => env('PAYPAY_API_KEY'),
            'API_SECRET' => env('PAYPAY_API_SECRET'),
            'MERCHANT_ID' => env('PAYPAY_MERCHANT_ID')
        ], false);

        $CQCPayload = new CreateQrCodePayload();

        // Set merchant pay identifier
        $CQCPayload->setMerchantPaymentId($merchantPaymentId);

        // Log time of request
        $CQCPayload->setRequestedAt();
        // Indicate you want QR Code
        $CQCPayload->setCodeType("ORDER_QR");
        // User agent
        // $CQCPayload->setUserAgent($userAgent);
        // Save Cart totals
        $CQCPayload->setAmount([
            "amount" => $amount,
            "currency" => "JPY"
        ]);
        // Configure redirects
        $CQCPayload->setRedirectType('WEB_LINK');
        $CQCPayload->setRedirectUrl(env("FRONTEND_APP_URL") . '/users/#/users/' . $user->id . '?payment=paypay&merchant_payment_id=' . $merchantPaymentId);
        // Get data for QR code
        $response = $client->code->createQRCode($CQCPayload);

        $data = $response['data'];
        \Log::info($data);
        \Log::info($data["url"]);
        // return redirect()->to($data["url"])->send();
        return response()->json($data);
    }

    public function getPaymentDetails(Request $request) {
        \Log::info($request);
        $merchantPaymentId = $request->merchantPaymentId;
        $client = new Client([
            'API_KEY' => env('PAYPAY_API_KEY'),
            'API_SECRET' => env('PAYPAY_API_SECRET'),
            'MERCHANT_ID' => env('PAYPAY_MERCHANT_ID')
        ], false);

        $response =  $client->code->getPaymentDetails($merchantPaymentId);
        $data = $response['data'];
        \Log::info($response);
        return response()->json($data);
    }
}
