const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')
const port = 3000;
const db = require('./queries');
const iyzipay = require('./iyzipay');
const iyzipay_threeds = require('./iyzipay_threeds');

app.use(bodyParser.json({limit: '200mb'}));
app.use(
    bodyParser.urlencoded({
      limit: '200mb',
      extended: true
    })
);
app.use(cors());

// Swagger
var swaggerUI = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app
  .route('/users')
  .post(db.createUser)
app
  .route('/users/:id')
  .get(db.getUserById)
  .put(db.updateUser)
  .delete(db.deleteUser)
app
  .route('/check_user/:email/:password')
  .get(db.checkUser)
app
  .route('/check_user/:email')
  .get(db.getUserByEmail)

app
  .route('/check_user_phone/:phone')
  .get(db.getUserByPhone)
app
  .route('/check_user_phone/:phone/:password')
  .get(db.checkUserPhone)

app
  .route('/partners')
  .post(db.createPartner)
app
  .route('/partners/:id')
  .get(db.getPartnerById)
  .delete(db.deletePartner)
app
  .route('/check_partner/:companyid/:password')
  .get(db.checkPartner)
app
  .route('/partnersid')
  .get(db.getPartnersid)

app
  .route('/image')
  .post(db.createImage)

app
  .route('/image/:id')
  .get(db.getImageById)
  .put(db.updateImage)
  .delete(db.deleteImage)

app
  .route('/product')
  .get(db.getProductById)
  .post(db.createProduct)

app
  .route('/product/:id')
  .get(db.getProductsByCompanyId)
  .put(db.updateProduct)
  .delete(db.deleteProduct)

app
  .route('/get_product_for_menu')
  .get(db.getProductForMenuForUser)

app
  .route('/get_product_by_city_for_menu/:city')
  .get(db.getProductByCityForMenuForUser)

app
  .route('/get_product_by_city_town_for_menu/:city/:town')
  .get(db.getProductByCityAndTownForMenuForUser)

app
  .route('/get_product_by_city_town_neighborhood_for_menu/:city/:town/:neighborhood')
  .get(db.getProductByCityAndTownAndNeighborhoodForMenuForUser)

app
  .route('/get_product_for_basket/:id')
  .get(db.getProductForBasketForUser)

app
  .route('/get_product_for_menu_for_partner/:id')
  .get(db.getProductForMenuForPartner)

app
  .route('/order')
  .post(db.createOrder)

app
  .route('/order/:id')
  .delete(db.deleteOrder)

app
  .route('/basket')
  .post(db.createBasket)

app
  .route('/card')
  .post(db.createCard)

app
  .route('/getOrderForPayForUser/:id')
  .get(db.getOrderForPayForUser)

app
  .route('/updateOrderStatus/:id')
  .post(db.updateOrderStatus)

app
  .route('/updateBasketStatus/:id')
  .post(db.updateBasketStatus)

app
  .route('/updateBasketStatus2/:id')
  .post(db.updateBasketStatus2)

app
  .route('/active_orders_products/:id')
  .get(db.getActiveOrdersProducts)

app
  .route('/active_baskets/:id')
  .get(db.getActiveBaskets)

app
  .route('/active_baskets_for_user/:id')
  .get(db.getActiveBasketsForUser)

app
  .route('/workhours')
  .post(db.createWorkHours)

app
  .route('/workhours/:id')
  .get(db.getWorkhours)
  .put(db.updateWorkHours)

app
  .route('/get_product_for_menu_from_partner/:id')
  .get(db.getProductForMenuForUserFromPartner)

app
  .route('/payment')
  .post(iyzipay.pay)

app
  .route('/payment_threeds')
  // .get(iyzipay_threeds.pay_threeds)
  .post(iyzipay_threeds.pay_threeds)

app
  .route('/payment_submerchant')
  .post(iyzipay_threeds.payment_submerchant)

app
  .route('/payment/threeds/complete')
  .post(iyzipay_threeds.response_from_iyzico)

app
  .route('/product_information/:id')
  .get(db.getProductInformationsFromOrder)

app
  .route('/get_cards/:id')
  .get(db.getCardById)

app
  .route('/set_bill')
  .post(db.setBillInfo)
  .put(db.updateBillInfo)

app
  .route('/get_bill/:id')
  .get(db.getBillInfo)

app
  .route('/get_partner_payment_info/:id')
  .get(db.getPartnerPaymentInfo)

app
  .route('/get_card/:cardnumber/:userid')
  .get(db.getCardInfo)
  .delete(db.deleteCardInfo)

app
  .route('/get_baskets/:partnerid')
  .get(db.getBaskets)

app
  .route('/discount/:discountcode')
  .get(db.getDiscounts)
  .put(db.updateDiscount)

app
  .route('/last_discount')
  .get(db.getLastDiscount)

app
  .route('/discount_applied/:discountcode/:userid')
  .get(db.getDiscountApplied)
  .post(db.setDiscountApplied)

app
  .route('/threeds_result/:conversationId')
  .get(db.getThreeds)
  .put(db.updateThreeds)

app
  .route('/threeds_fail_result/:conversationId')
  .put(db.updateFailThreeds)

app
  .route('/threeds_result_insert')
  .post(db.setThreeds)

app
  .route('/submerchant')
  .get(db.getSubmerchants)
  .post(db.setSubmerchants)

app
  .route('/submerchant_by_id/:partnerid')
  .get(db.getSubmerchantsById)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});