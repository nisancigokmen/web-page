var Iyzipay = require('iyzipay');

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

var requestContent = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: '123456789',
    price: '1',
    paidPrice: '13',
    currency: Iyzipay.CURRENCY.TRY,
    installment: '1',
    basketId: 'B67832',
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.LISTING,
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
        //     price: '0.3'
        // },
        // {
        //     id: 'BI102',
        //     name: 'Game code',
        //     category1: 'Game',
        //     category2: 'Online Game Items',
        //     itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
        //     price: '0.5'
        // },
        // {
        //     id: 'BI103',
        //     name: 'Usb',
        //     category1: 'Electronics',
        //     category2: 'Usb / Cable',
        //     itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        //     price: '0.2'
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

// const pay = (req, res) => {
//     const { conversationId, paidPrice, cardHolderName, cardNumber, expireMonth, expireYear, cvc, registerCard, name, gsmNumber, email, city, registrationAddress } = req.body;

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

//     iyzipay.payment.create(requestContent, function (err, result) {
//         // console.log(result);
//         res.status(200).json(result);
//     });
// };

const pay = (req, res) => {
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

    iyzipay.payment.create(requestContent, function (err, result) {
        // console.log(result);
        requestContent.basketItems = [];
        res.status(200).json(result);
    });
};

module.exports = {
    pay
}