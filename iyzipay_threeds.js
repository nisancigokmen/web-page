var Iyzipay = require('iyzipay');
// var Pay = require('./controller/user/pay/pay3d');
// const app = require('./app');
var https = require('https');
var fs = require('fs');
// const path = require('path');
// const rootCas = require('ssl-root-cas').create();
// rootCas.addFile(path.resolve(__dirname, 'Private_Key.txt'));
// rootCas.addFile(path.resolve(__dirname, 'Certificate.txt'));
// const httpsAgent = new https.Agent({ca: rootCas});

// var iyzipay = new Iyzipay({
//     apiKey: "sandbox-ZjlGX7Vo1mRMSEkycVDPP5Kxfu96rPy5",
//     secretKey: "sandbox-XYm4jVzYadWxs99a7HllLRFhpXfDkBqH",
//     uri: 'https://sandbox-api.iyzipay.com'
// });

var iyzipay = new Iyzipay({
    apiKey: "rc4gUWTp0H3iFe7qkLm6YcPAbnECcfnI",
    secretKey: "ucEuaDPjiAjUfEIyDAiDBQGwmMNvR7UG",
    uri: 'https://api.iyzipay.com'
});

var subMerchantKey_value = "YlSu9InL4h/ZN0j1wmHdTHFBXPo=";

var options = {
    host: "localhost",
    "rejectUnauthorized": false,
    // host : "yebea.net",
    port: 3000,
    path: '/threeds_result/',
    method: 'PUT',
};

var options2 = {
    host: "localhost",
    "rejectUnauthorized": false,
    // host : "yebea.net",
    port: 3000,
    path: '/threeds_fail_result/',
    method: 'PUT',
};

var resultOf3DPayment = "failure";

var requestContent = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: '123456789',
    price: '1',
    paidPrice: '1.2',
    currency: Iyzipay.CURRENCY.TRY,
    installment: '1',
    basketId: 'B67832',
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: 'http://localhost:3000/payment/threeds/complete',
    // callbackUrl: 'https://yebea.net:3000/payment/threeds/complete',
    paymentCard: {
        cardHolderName: 'John Doe',
        cardNumber: '5528790000000008',
        expireMonth: '12',
        expireYear: '2030',
        cvc: '123',
        registerCard: '0'
    },
    buyer: {
        id: 'BY789',
        name: 'John',
        surname: 'Doe',
        gsmNumber: '+905350000000',
        email: 'email@email.com',
        identityNumber: '74300864791',
        lastLoginDate: '2015-10-05 12:43:35',
        registrationDate: '2013-04-21 15:12:09',
        registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        ip: '85.34.78.112',
        city: 'Istanbul',
        country: 'Turkey',
        zipCode: '34732'
    },
    shippingAddress: {
        contactName: 'Jane Doe',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        zipCode: '34742'
    },
    billingAddress: {
        contactName: 'Jane Doe',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        zipCode: '34742'
    },
    basketItems: [
        // {
        //     id: 'BI101',
        //     name: 'Binocular',
        //     category1: 'Collectibles',
        //     category2: 'Accessories',
        //     itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        //     price: '5',
        //     subMerchantKey: subMerchantKey_value,
        //     subMerchantPrice: "2"
        // },
        // {
        //     id: 'BI102',
        //     name: 'Game code',
        //     category1: 'Game',
        //     category2: 'Online Game Items',
        //     itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
        //     price: '5',
        //     subMerchantKey: subMerchantKey_value,
        //     subMerchantPrice: "2"
        // },
        // {
        //     id: 'BI103',
        //     name: 'Usb',
        //     category1: 'Electronics',
        //     category2: 'Usb / Cable',
        //     itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        //     price: '5',
        //     subMerchantKey: subMerchantKey_value,
        //     subMerchantPrice: "2"
        // }
    ]
};

var basketItem = {
    id: 'BI101',
    name: 'Meal',
    category1: 'Meal',
    category2: 'Meal',
    itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
    price: '5',
    subMerchantKey: subMerchantKey_value,
    subMerchantPrice: "2"
}


var subMerchantRequestContent = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: '123456789',
    subMerchantExternalId: 'S49222',
    subMerchantType: Iyzipay.SUB_MERCHANT_TYPE.PRIVATE_COMPANY,
    address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
    taxOffice: 'Tax office',
    legalCompanyTitle: 'John Doe inc',
    email: 'email@submerchantemail.com',
    gsmNumber: '+905013532136',
    name: 'Yebea',
    iban: 'TR180001000104977239255001',
    identityNumber: '31300864726',
    currency: Iyzipay.CURRENCY.TRY
}

// const payment_submerchant = (req, res) => {
//     iyzipay.subMerchant.create(subMerchantRequestContent, function (err, result) {
//         if(err){
//             throw err;
//         }else{
//             res.status(200).json(result);
//         }
//     });
// }

const payment_submerchant = (req, res) => {
    subMerchantRequestContent.conversationId = req.body.conversationId;
    subMerchantRequestContent.identityNumber = req.body.identityNumber;
    subMerchantRequestContent.legalCompanyTitle = req.body.legalCompanyTitle;
    subMerchantRequestContent.name = req.body.name;
    subMerchantRequestContent.address = req.body.address;
    subMerchantRequestContent.iban = req.body.iban;
    subMerchantRequestContent.gsmNumber = req.body.gsmNumber;
    subMerchantRequestContent.email = req.body.email;
    subMerchantRequestContent.subMerchantExternalId = req.body.subMerchantExternalId;

    // console.log(subMerchantRequestContent);

    iyzipay.subMerchant.create(subMerchantRequestContent, function (err, result) {
        if(err){
            throw err;
        }else{
            res.status(200).json(result);
        }
    });
};

// const pay_threeds = (req, res) => {
//     const { conversationId, paidPrice, cardHolderName, cardNumber, expireMonth, expireYear, cvc, registerCard, name, gsmNumber, email, city, registrationAddress } = req.body;

//     resultOf3DPayment = "failure";
//     requestContent.conversationId = conversationId;
//     requestContent.paidPrice = paidPrice;
//     requestContent.paymentCard.cardHolderName = cardHolderName;
//     requestContent.paymentCard.cardNumber = cardNumber;
//     requestContent.paymentCard.expireMonth = expireMonth;
//     requestContent.paymentCard.expireYear = expireYear;
//     requestContent.paymentCard.cvc = cvc;
//     requestContent.paymentCard.registerCard = registerCard;
//     requestContent.buyer.name = name;
//     requestContent.buyer.gsmNumber = gsmNumber;
//     requestContent.buyer.email = email;
//     requestContent.buyer.city = city;
//     requestContent.buyer.registrationAddress = registrationAddress;
//     requestContent.shippingAddress.contactName = name;
//     requestContent.shippingAddress.city = city;
//     requestContent.shippingAddress.address = registrationAddress;
//     requestContent.billingAddress.contactName = name;
//     requestContent.billingAddress.city = city;
//     requestContent.billingAddress.address = registrationAddress;

//     iyzipay.threedsInitialize.create(requestContent, function (err, result) {
//         if(err){
//             throw err;
//         }else{
//             res.status(200).json(result);
//         }
//     });
// }

// const pay_threeds = (req, res) => {
//     req.body.locale = Iyzipay.LOCALE.TR;
//     req.body.currency = Iyzipay.CURRENCY.TRY;
//     req.body.paymentChannel = Iyzipay.PAYMENT_CHANNEL.WEB;
//     req.body.paymentGroup = Iyzipay.PAYMENT_GROUP.PRODUCT;

//     for(let i = 0; i < req.body.basketItems.length; i++){
//         req.body.basketItems[i].itemType = Iyzipay.BASKET_ITEM_TYPE.PHYSICAL;
//     }

//     iyzipay.threedsInitialize.create(req, function (err, result) {
//         if(err){
//             throw err;
//         }else{
//             res.status(200).json(result);
//         }
//     });
// };

const pay_threeds = (req, res) => {
    req.body.locale = Iyzipay.LOCALE.TR;
    req.body.currency = Iyzipay.CURRENCY.TRY;
    req.body.paymentChannel = Iyzipay.PAYMENT_CHANNEL.WEB;
    req.body.paymentGroup = Iyzipay.PAYMENT_GROUP.PRODUCT;
    
    requestContent.conversationId = req.body.conversationId;
    requestContent.price = req.body.price;
    requestContent.paidPrice = req.body.paidPrice;
    requestContent.price = req.body.paidPrice;
    requestContent.paymentCard.cardHolderName = req.body.paymentCard.cardHolderName;
    requestContent.paymentCard.cardNumber = req.body.paymentCard.cardNumber;
    requestContent.paymentCard.expireMonth = req.body.paymentCard.expireMonth;
    requestContent.paymentCard.expireYear = req.body.paymentCard.expireYear;
    requestContent.paymentCard.cvc = req.body.paymentCard.cvc;
    
    requestContent.buyer.name = req.body.buyer.name;
    requestContent.buyer.gsmNumber = req.body.buyer.gsmNumber;
    requestContent.buyer.email = req.body.buyer.email;
    requestContent.buyer.registrationAddress = req.body.buyer.registrationAddress;
    requestContent.buyer.city = req.body.buyer.city;
    
    requestContent.shippingAddress.contactName = req.body.shippingAddress.contactName;
    requestContent.shippingAddress.city = req.body.shippingAddress.city;
    requestContent.shippingAddress.address = req.body.shippingAddress.address;
    
    requestContent.billingAddress.contactName = req.body.billingAddress.contactName;
    requestContent.billingAddress.city = req.body.billingAddress.city;
    requestContent.billingAddress.address = req.body.billingAddress.address;

    for(let i = 0; i < req.body.basketItems.length; i++){
        basketItem.id = req.body.basketItems[i].id;
        basketItem.price = req.body.basketItems[i].price;
        basketItem.subMerchantPrice = req.body.basketItems[i].subMerchantPrice;
        basketItem.subMerchantKey = req.body.basketItems[i].subMerchantKey;
        
        if(i != req.body.basketItems.length - 1){
            requestContent.basketItems.push(basketItem);
            requestContent.basketItems.push(",");
        }else{
            requestContent.basketItems.push(basketItem);
        }
        
    }

    iyzipay.threedsInitialize.create(requestContent, function (err, result) {
        if(err){
            requestContent.basketItems = [];
            throw err;
        }else{
            requestContent.basketItems = [];
            res.status(200).json(result);
        }
    });
};


const response_from_iyzico = (req, resp) => {
    // console.log(req.body);

    iyzipay.threedsPayment.create({
        conversationId: req.body.conversationId,
        locale: Iyzipay.LOCALE.TR,
        paymentId: req.body.paymentId,
        conversationData: req.body.conversationData
    }, async function (err, result) {
        // console.log(err, result);

        // console.log(result.status);

        // return result.status;
        resultOf3DPayment = result.status;
        // res.status(200).json({message: resultOf3DPayment});
        // <script>window.close();</script >
        // Pay.is3dPaymentCompleted(resultOf3DPayment);
        if(resultOf3DPayment == "success"){
            // app('/threeds_result/' + req.body.conversationId);
            options.path = options.path + req.body.conversationId;
            // https.request(options, { httpsAgent } , function(res) {
            https.request(options , function(res) {
                // console.log('STATUS: ' + res.statusCode);
                // console.log('HEADERS: ' + JSON.stringify(res.headers));
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                //   console.log('BODY: ' + chunk);
                });
            }).end();
        }else{
            options.path = options.path + req.body.conversationId;
            // https.request(options, { httpsAgent }, function(res) {
            https.request(options, function(res) {
                // console.log('STATUS: ' + res.statusCode);
                // console.log('HEADERS: ' + JSON.stringify(res.headers));
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                //   console.log('BODY: ' + chunk);
                });
            }).end();
        }

        // res.send(`
        //     <script type="text/javascript" src="./controller/user/pay/pay3d.js">is3dPaymentCompleted(` + resultOf3DPayment + `);</script>
            
        // `);

        await sleep(3000);
        
        resp.send(`
            <script>
                window.close();
            </script >
        `);
    });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const result_of_3d_payment = (req, res) => {
    // console.log("I am here");
    // res.status(200).json(resultOf3DPayment);
}

module.exports = {
    payment_submerchant,
    pay_threeds,
    response_from_iyzico,
    result_of_3d_payment
}