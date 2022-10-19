<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PayPay\OpenPaymentAPI\Client;
use PayPay\OpenPaymentAPI\Models\CreateQrCodePayload;
use PayPay\OpenPaymentAPI\Models\OrderItem;

class PayPayController extends Controller {
    public function createQRCode() {
        $client = new Client([
            'API_KEY' => env('PAYPAY_API_KEY'),
            'API_SECRET' => env('PAYPAY_API_SECRET'),
            'MERCHANT_ID' => env('PAYPAY_MERCHANT_ID')
        ], false);

        $CQCPayload = new CreateQrCodePayload();

        // Set merchant pay identifier
        $CQCPayload->setMerchantPaymentId("YOUR_TRANSACTION_ID");

        // Log time of request
        $CQCPayload->setRequestedAt();
        // Indicate you want QR Code
        $CQCPayload->setCodeType("ORDER_QR");

        // Provide order details for invoicing
        $OrderItems = [];
        $OrderItems[] = (new OrderItem())
            ->setName('Cake')
            ->setQuantity(1)
            ->setUnitPrice('amount' => 20, 'currency' => 'JPY']);
        $CQCPayload->setOrderItems($OrderItems);

        // Save Cart totals
        $amount = [
            "amount" => 1,
            "currency" => "JPY"
        ];
        $CQCPayload->setAmount($amount);
        // Configure redirects
        $CQCPayload->setRedirectType('WEB_LINK');
        $CQCPayload->setRedirectUrl($_SERVER['SERVER_NAME']);

        // Get data for QR code
        $response = $client->code->createQRCode($CQCPayload);

        $data = $response['data'];
        \Log::info($data);
    }
}
