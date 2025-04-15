const { Pool } = require('pg');
const bytea = require('postgres-bytea');

const pool = new Pool({
    host: '127.0.0.1',
    database: 'commerce',
    // user: 'jhwjqhmy_postgres',
    user: 'postgres',
    password: '715525',
    // password: '=ETwcmi&mw&z',
    port: 5432,
});

const client = new Pool({
    host: '127.0.0.1',
    // user: 'jhwjqhmy_postgres',
    user: 'postgres',
    password: '715525',
    // password: '=ETwcmi&mw&z',
    port: 5432,
});

const createDatabase = async () => {
    try {
        await client.connect();                            // gets connection
        await client.query('CREATE DATABASE commerce');    // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        // await client.end();                                // closes connection 
        // important problem at here
    }
};

const createUserTable = async() => {
    try{
        await pool.query('CREATE TABLE IF NOT EXISTS users ("id" SERIAL PRIMARY KEY, "fullname" text, "email" text, "password" text, "phone" text, "address" text, "card" text, "premium" text)');
        return true;
    }catch(error){
        console.error(error.stack);
        return false;
    }
};

const createPartnerTable = async() => {
    try{
        await pool.query('CREATE TABLE IF NOT EXISTS partners ("id" SERIAL PRIMARY KEY, "companyid" text, "companyname" text, "companytype" text, "address" text, "address2" text, "address3" text, "address4" text, "address5" text, "address6" text, "courier" text, "name" text, "surname" text, "email" text, "phone" text, "password" text, "acceptance" text)');
        return true;
    }catch(error){
        console.error(error.stack);
        return false;
    }
};

const createCardTable = async() => {
    try{
        await pool.query('CREATE TABLE IF NOT EXISTS cards ("id" SERIAL PRIMARY KEY, "ownername" text, "cardnumber" text, "carddate" text, "cardcvv" text, "userid" text, "usertype" text, "cardtype" text)');
        return true;
    }catch(error){
        console.error(error.stack);
        return false;
    }
};

const createAddressTable = async() => {
    try{
        await pool.query('CREATE TABLE IF NOT EXISTS addresses ("id" SERIAL PRIMARY KEY, "city" text, "town" text, "neighborhood" text, "apartment" text, "floor" text, "no" text, "address" text, "ownerid" text, "ownertype" text)');
        return true;
    }catch(error){
        console.error(error.stack);
        return false;
    }
};

const createPhoneTable = async() => {
    try{
        await pool.query('CREATE TABLE IF NOT EXISTS phones ("id" SERIAL PRIMARY KEY, "phonenumber" text, "ownerid" text, "ownertype" text)');
        return true;
    }catch(error){
        console.error(error.stack);
        return false;
    }
};

const createProductTable = async() => {
    try{
        await pool.query('CREATE TABLE IF NOT EXISTS products ("id" SERIAL PRIMARY KEY, "name" text, "price" text, "type" text, "stocknumber" text, "picture" text, "partnerid" text, "acceptance" text)');
        return true;
    }catch(error){
        console.error(error.stack);
        return false;
    }
};

const createOrderTable = async() => {
    try{
        await pool.query('CREATE TABLE IF NOT EXISTS orders ("id" SERIAL PRIMARY KEY, "userid" text, "address" text, "paymentmethod" text, "products" text, "partnerid" text, "orderstatus" text)');
        return true;
    }catch(error){
        console.error(error.stack);
        return false;
    }
};

const createWorkhourTable = async() => {
    try{
        await pool.query('CREATE TABLE IF NOT EXISTS workhours ("id" SERIAL PRIMARY KEY, "monday" text, "tuesday" text, "wednesday" text, "thursday" text, "friday" text, "saturday" text, "sunday" text, "partnerid" text)');
        return true;
    }catch(error){
        console.error(error.stack);
        return false;
    }
};

const createPictureTable = async() => {
    try{
        await pool.query('CREATE TABLE IF NOT EXISTS pictures ("id" SERIAL PRIMARY KEY, "picture" bytea, "ownerid" text, "ownertype" text)');
        return true;
    }catch(error){
        console.error(error.stack);
        return false;
    }
};

const createBasketTable = async() => {
    try{
        await pool.query('CREATE TABLE IF NOT EXISTS basket ("id" SERIAL PRIMARY KEY, "orders" text, "fullname" text, "userid" text, "phone" text, "city" text, "address" text, "totalprice" text, "note" text, "basketstatus" text, "basketdate" text, "companyid" text, "mail" text, "paymentmethod" text, "username" text, "cardid" text)');
        return true;
    }catch(error){
        console.error(error.stack);
        return false;
    }
};

const createBillTable = async() => {
    try{
        await pool.query('CREATE TABLE IF NOT EXISTS bill ("id" SERIAL PRIMARY KEY, "fullname" text, "phone" text, "email" text, "city" text, "billaddress" text, "userid" text)');
        return true;
    }catch(error){
        console.error(error.stack);
        return false;
    }
};

const createDiscountTable = async() => {
    try{
        await pool.query('CREATE TABLE IF NOT EXISTS discount ("id" SERIAL PRIMARY KEY, "discountcode" text, "discountamount" text, "discounttime" text, "discountcompanyid" text, "discountuserid" text)');
        return true;
    }catch(error){
        console.error(error.stack);
        return false;
    }
}

const createDiscountAppliedTable = async() => {
    try{
        await pool.query('CREATE TABLE IF NOT EXISTS discountapplied ("id" SERIAL PRIMARY KEY, "discountcode" text, "discountamount" text, "discounttime" text, "discountcompanyid" text, "discountuserid" text)');
        return true;
    }catch(error){
        console.error(error.stack);
        return false;
    }
}

const createThreedsTable = async() => {
    try{
        await pool.query('CREATE TABLE IF NOT EXISTS threeds ("id" SERIAL PRIMARY KEY, "conversationid" text, "result" text)');
        return true;
    }catch(error){
        console.error(error.stack);
        return false;
    }
}

const createSubMerchantTable = async() => {
    try{
        await pool.query('CREATE TABLE IF NOT EXISTS submerchant ("id" SERIAL PRIMARY KEY, "partnerid" text, "conversationid" text, "submerchantkey" text)');
        return true;
    }catch(error){
        console.error(error.stack);
        return false;
    }
};

const handleError = async (error) => {
    let errorType = String(error.routine); 

    if(errorType == 'InitPostgres'){
        // Create Database
        await createDatabase().then((result) => {
            if (result) {
                console.log('Database commerce created.');
            }else{
                console.log("Error occured at creating database.");
            }
        });
        // Create User Table
        await createUserTable().then((result) => {
            if (result) {
                console.log('users table created.');
            }else{
                console.log("Error occured at creating users table.");
            }
        });
        // Create Partner Table
        await createPartnerTable().then((result) => {
            if (result) {
                console.log('partners table created.');
            }else{
                console.log("Error occured at creating partners table.");
            }
        });
        // Create Card Table
        await createCardTable().then((result) => {
            if (result) {
                console.log('cards table created.');
            }else{
                console.log("Error occured at creating cards table.");
            }
        });
        // Create Address Table
        await createAddressTable().then((result) => {
            if (result) {
                console.log('addresses table created.');
            }else{
                console.log("Error occured at creating addresses table.");
            }
        });
        // Create Phone Table
        await createPhoneTable().then((result) => {
            if (result) {
                console.log('phones table created.');
            }else{
                console.log("Error occured at creating phones table.");
            }
        });
        // Create Product Table
        await createProductTable().then((result) => {
            if (result) {
                console.log('products table created.');
            }else{
                console.log("Error occured at creating products table.");
            }
        });
        // Create Order Table
        await createOrderTable().then((result) => {
            if (result) {
                console.log('orders table created.');
            }else{
                console.log("Error occured at creating orders table.");
            }
        });
        // Create Workhour Table
        await createWorkhourTable().then((result) => {
            if (result) {
                console.log('workhours table created.');
            }else{
                console.log("Error occured at creating workhours table.");
            }
        });
        // Create Picture Table
        await createPictureTable().then((result) => {
            if (result) {
                console.log('pictures table created.');
            }else{
                console.log("Error occured at creating pictures table.");
            }
        });
        // Create Basket Table
        await createBasketTable().then((result) => {
            if (result) {
                console.log('basket table created.');
            }else{
                console.log("Error occured at creating basket table.");
            }
        });
        // Create Bill Table
        await createBillTable().then((result) => {
            if (result) {
                console.log('bill table created.');
            }else{
                console.log("Error occured at creating bill table.");
            }
        });
        // Create discount Table
        await createDiscountTable().then((result) => {
            if (result) {
                console.log('discount table created.');
            }else{
                console.log("Error occured at creating discount table.");
            }
        });
        // Create discountapplied Table
        await createDiscountAppliedTable().then((result) => {
            if (result) {
                console.log('discountapplied table created.');
            }else{
                console.log("Error occured at creating discountapplied table.");
            }
        });
        // Create threeds Table
        await createThreedsTable().then((result) => {
            if (result) {
                console.log('threeds table created.');
            }else{
                console.log("Error occured at creating threeds table.");
            }
        });
        // Create submerchant Table
        await createSubMerchantTable().then((result) => {
            if (result) {
                console.log('submerchant table created.');
            }else{
                console.log("Error occured at creating submerchant table.");
            }
        });
    }else if(errorType == 'parserOpenTable'){
        // Create User Table
        await createUserTable().then((result) => {
            if (result) {
                console.log('users table created in parserOpen.');
            }else{
                console.log("Error occured at creating users table.");
            }
        });
        // Create Partner Table
        await createPartnerTable().then((result) => {
            if (result) {
                console.log('partners table created in parserOpen.');
            }else{
                console.log("Error occured at creating partners table.");
            }
        });
        // Create Card Table
        await createCardTable().then((result) => {
            if (result) {
                console.log('cards table created.');
            }else{
                console.log("Error occured at creating cards table.");
            }
        });
        // Create Address Table
        await createAddressTable().then((result) => {
            if (result) {
                console.log('addresses table created.');
            }else{
                console.log("Error occured at creating addresses table.");
            }
        });
        // Create Phone Table
        await createPhoneTable().then((result) => {
            if (result) {
                console.log('phones table created.');
            }else{
                console.log("Error occured at creating phones table.");
            }
        });
        // Create Product Table
        await createProductTable().then((result) => {
            if (result) {
                console.log('products table created.');
            }else{
                console.log("Error occured at creating products table.");
            }
        });
        // Create Order Table
        await createOrderTable().then((result) => {
            if (result) {
                console.log('orders table created.');
            }else{
                console.log("Error occured at creating orders table.");
            }
        });
        // Create Workhour Table
        await createWorkhourTable().then((result) => {
            if (result) {
                console.log('workhours table created.');
            }else{
                console.log("Error occured at creating workhours table.");
            }
        });
        // Create Picture Table
        await createPictureTable().then((result) => {
            if (result) {
                console.log('pictures table created.');
            }else{
                console.log("Error occured at creating pictures table.");
            }
        });
        // Create Basket Table
        await createBasketTable().then((result) => {
            if (result) {
                console.log('basket table created.');
            }else{
                console.log("Error occured at creating basket table.");
            }
        });
        // Create Bill Table
        await createBillTable().then((result) => {
            if (result) {
                console.log('bill table created.');
            }else{
                console.log("Error occured at creating bill table.");
            }
        });
        // Create discount Table
        await createDiscountTable().then((result) => {
            if (result) {
                console.log('discount table created.');
            }else{
                console.log("Error occured at creating discount table.");
            }
        });
        // Create discountapplied Table
        await createDiscountAppliedTable().then((result) => {
            if (result) {
                console.log('discountapplied table created.');
            }else{
                console.log("Error occured at creating discountapplied table.");
            }
        });
        // Create threeds Table
        await createThreedsTable().then((result) => {
            if (result) {
                console.log('threeds table created.');
            }else{
                console.log("Error occured at creating threeds table.");
            }
        });
        // Create submerchant Table
        await createSubMerchantTable().then((result) => {
            if (result) {
                console.log('submerchant table created.');
            }else{
                console.log("Error occured at creating submerchant table.");
            }
        });
    }else{
        throw error;
    }
};

const createUser = (request, response) => {
    const { fullname, email, password, phone, address, card, premium } = request.body;

    pool.query('INSERT INTO users (fullname, email, password, phone, address, card, premium) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id', [fullname, email, password, phone, address, card, premium], async (error, results) => {
        if (error){
            await handleError(error);
            createUser(request, response);
        }else{
            response.status(201).send(`User added with ID: ${results.rows[0].id}`);
        } 
    });
};

// const getUsers = (request, response) => {
//     pool.query('SELECT * FROM users ORDER BY id', async (error, results) => {
//         if(error){
//             await handleError(error);
//             getUsers(request, response);
//         }else{
//             response.status(200).json(results.rows);
//         }
//     });
// };

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM users WHERE id = $1', [id], async (error, results) => {
        if(error){
            await handleError(error);
            getUserById(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { fullname, email, phone, password } = request.body;

    pool.query('UPDATE users SET fullname = $1, email = $2, phone = $3, password = $4 WHERE id = $5',
                [fullname, email, phone, password, id],
                async (error, results) => {
                    if(error){
                        await handleError(error);
                        updateUser(request, response);
                    }else{
                        response.status(200).send(`User updated with ID: ${id}`);
                    }
                });
};

// const updateUserPassword = (request, response) => {
//     const id = parseInt(request.params.id);
//     const { password } = request.body;

//     pool.query('UPDATE users SET password = $1 WHERE id = $2',
//                 [password, id],
//                 async (error, results) => {
//                     if(error){
//                         await handleError(error);
//                         updateUserPassword(request, response);
//                     }else{
//                         response.status(200).send(`User password updated with ID: ${id}`);
//                     }
//                 });
// };

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM users WHERE id = $1', [id], async (error, results) => {
        if(error){
            await handleError(error);
            deleteUser(request, response);
        }else{
            response.status(200).send(`User deleted with ID: ${id}`);
        }
    });
};

const checkUser = (request, response) => {
    const email = request.params.email;
    const password = request.params.password;

    pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], async (error, results) => {
        if(error){
            await handleError(error);
            checkUser(request, response);
        }else{
            response.status(201).json(results.rows);
        }
    });
}

const checkUserPhone = (request, response) => {
    const phone = request.params.phone;
    const password = request.params.password;

    pool.query('SELECT * FROM users WHERE phone = $1 AND password = $2', [phone, password], async (error, results) => {
        if(error){
            await handleError(error);
            checkUserPhone(request, response);
        }else{
            response.status(201).json(results.rows);
        }
    });
}

const getUserByEmail = (request, response) => {
    const email = request.params.email;

    pool.query('SELECT * FROM users WHERE email = $1', [email], async (error, results) => {
        if(error){
            await handleError(error);
            getUserByEmail(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const getUserByPhone = (request, response) => {
    const phone = request.params.phone;

    pool.query('SELECT * FROM users WHERE phone = $1', [phone], async (error, results) => {
        if(error){
            await handleError(error);
            getUserByPhone(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const createPartner = (request, response) => {
    const { companyid, companyname, companytype, address, address2, address3, address4, address5, address6, courier, name, surname, email, phone, password, acceptance } = request.body;

    pool.query('INSERT INTO partners (companyid, companyname, companytype, address, address2, address3, address4, address5, address6, courier, name, surname, email, phone, password, acceptance) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id', [companyid, companyname, companytype, address, address2, address3, address4, address5, address6, courier, name, surname, email, phone, password, acceptance], async (error, results) => {
        if (error){
            await handleError(error);
            createPartner(request, response);
        }else{
            response.status(201).send(`User added with ID: ${results.rows[0].id}`);
        } 
    });
};

// const getPartners = (request, response) => {
//     pool.query('SELECT * FROM partners  ORDER BY id', async (error, results) => {
//         if(error){
//             await handleError(error);
//             getPartners(request, response);
//         }else{
//             response.status(200).json(results.rows);
//         }
//     });
// };

const getPartnerById = (request, response) => {
    const id = (request.params.id);

    pool.query('SELECT * FROM partners WHERE companyid = $1', [id], async (error, results) => {
        if(error){
            await handleError(error);
            getPartnerById(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

// const updatePartner = (request, response) => {
//     const id = parseInt(request.params.id);
//     const { fullname, email, phone, password } = request.body;

//     pool.query('UPDATE partners SET fullname = $1, email = $2, phone = $3, password = $4 WHERE id = $5',
//                 [fullname, email, phone, password, id],
//                 async (error, results) => {
//                     if(error){
//                         await handleError(error);
//                         updatePartner(request, response);
//                     }else{
//                         response.status(200).send(`Partner updated with ID: ${id}`);
//                     }
//                 });
// };

// const updatePartnerPassword = (request, response) => {
//     const id = parseInt(request.params.id);
//     const { password } = request.body;

//     pool.query('UPDATE partners SET password = $1 WHERE id = $2',
//                 [password, id],
//                 async (error, results) => {
//                     if(error){
//                         await handleError(error);
//                         updateUserPassword(request, response);
//                     }else{
//                         response.status(200).send(`User password updated with ID: ${id}`);
//                     }
//                 });
// };

const deletePartner = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM partners WHERE id = $1', [id], async (error, results) => {
        if(error){
            await handleError(error);
            deleteUser(request, response);
        }else{
            response.status(200).send(`Partner deleted with ID: ${id}`);
        }
    });
};

const checkPartner = (request, response) => {
    const companyid = request.params.companyid;
    const password = request.params.password;

    pool.query('SELECT * FROM partners WHERE companyid = $1 AND password = $2', [companyid, password], async (error, results) => {
        if(error){
            await handleError(error);
            checkUser(request, response);
        }else{
            response.status(201).json(results.rows);
        }
    });
};

const getPartnersid = (request, response) => {
    pool.query('SELECT companyid FROM partners', async (error, results) => {
        if(error){
            await handleError(error);
            getPartnersid(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const getImageById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(`SELECT picture::bytea FROM pictures WHERE id = $1`, [id], async (error, results) => {
        if(error){
            await handleError(error);
            getImageById(request, response);
        }else{
            let buf = Buffer.from(results.rows[0].picture);
            results.rows[0].picture = buf.toString();

            response.status(200).json(results.rows);
        }
    });
};

const createImage = (request, response) => {
    let { picture, ownerid, ownertype } = request.body;
    var buf = Buffer.from(picture, 'utf8');

    pool.query('INSERT INTO pictures (picture, ownerid, ownertype) VALUES ($1, $2, $3) RETURNING id', [buf, ownerid, ownertype], async (error, results) => {
        if (error){
            await handleError(error);
            createImage(request, response);
        }else{
            response.status(201).send(`Image added with ID: ${results.rows[0].id}`);
        } 
    });
};

const updateImage = (request, response) => {
    const id = parseInt(request.params.id);
    const { picture } = request.body;

    pool.query('UPDATE pictures SET picture = $1 WHERE id = $2',
                [picture, id],
                async (error, results) => {
                    if(error){
                        await handleError(error);
                        updateImage(request, response);
                    }else{
                        response.status(200).send(`Image updated with ID: ${id}`);
                    }
                });
};

const deleteImage = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM pictures WHERE id = $1', [id], async (error, results) => {
        if(error){
            await handleError(error);
            deleteImage(request, response);
        }else{
            response.status(200).send(`Image deleted with ID: ${id}`);
        }
    });
};

const getProductById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM products WHERE id = $1  ORDER BY id', [id], async (error, results) => {
        if(error){
            await handleError(error);
            getProductById(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const getProductsByCompanyId = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM products WHERE partnerid = $1  ORDER BY id', [id], async (error, results) => {
        if(error){
            await handleError(error);
            getProductsByCompanyId(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const createProduct = (request, response) => {
    const { name, price, type, stocknumber, picture, partnerid, acceptance } = request.body;

    pool.query('INSERT INTO products (name, price, type, stocknumber, picture, partnerid, acceptance) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id', [name, price, type, stocknumber, picture, partnerid, acceptance], async (error, results) => {
        if (error){
            await handleError(error);
            createProduct(request, response);
        }else{
            response.status(201).send(`Product added with ID: ${results.rows[0].id}`);
        }
    });
};

const updateProduct = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, price, stocknumber, picture, partnerid, acceptance } = request.body;

    pool.query('UPDATE products SET name = $1, price = $2, stocknumber = $3, picture = $4, partnerid = $5, acceptance = $6 WHERE id = $7',
                [name, price, stocknumber, picture, partnerid, acceptance, id],
                async (error, results) => {
                    if(error){
                        await handleError(error);
                        updateProduct(request, response);
                    }else{
                        response.status(200).send(`Product updated with ID: ${id}`);
                    }
                });
};

const deleteProduct = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM products WHERE id = $1', [id], async (error, results) => {
        if(error){
            await handleError(error);
            deleteProduct(request, response);
        }else{
            response.status(200).send(`Product deleted with ID: ${id}`);
        }
    });
};

const getProductForMenuForUser = (request, response) => {
    pool.query(`
        SELECT 
            products.id AS product_id,
            products.name AS product_name,
            products.price AS product_price,
            products.type AS product_type,
            products.partnerid AS product_partnerid,
            products.acceptance AS product_acceptance,
            partners.companyname AS product_owner_name,
            partners.acceptance AS product_owner_status,
            partners.address2 AS product_owner_city,
            partners.address3 AS product_owner_town,
            partners.address4 AS product_owner_neighborhood,
            pictures.picture::bytea AS product_picture,
            workhours.monday AS product_monday_work,
            workhours.tuesday AS product_tuesday_work,
            workhours.wednesday AS product_wednesday_work,
            workhours.thursday AS product_thursday_work,
            workhours.friday AS product_friday_work,
            workhours.saturday AS product_saturday_work,
            workhours.sunday AS product_sunday_work
        FROM products
        LEFT JOIN partners ON products.partnerid = partners.companyid
        LEFT JOIN pictures ON products.picture::integer = pictures.id
        LEFT JOIN workhours ON products.partnerid = workhours.partnerid
        WHERE products.acceptance = 'accepted'
        ORDER BY products.id
    `, async (error, results) => {
        if(error){
            await handleError(error);
            getProductForMenuForUser(request, response);
        }else{
            for(let i = 0; i < results.rows.length; i++){
                let buf = Buffer.from(results.rows[i].product_picture);
                results.rows[i].product_picture = buf.toString();
            }

            response.status(200).json(results.rows);
        }
    });
};

const getProductByCityForMenuForUser = (request, response) => {
    const city = (request.params.city);

    pool.query(`
        SELECT 
            products.id AS product_id,
            products.name AS product_name,
            products.price AS product_price,
            products.type AS product_type,
            products.partnerid AS product_partnerid,
            products.acceptance AS product_acceptance,
            partners.companyname AS product_owner_name,
            partners.acceptance AS product_owner_status,
            partners.address2 AS product_owner_city,
            partners.address3 AS product_owner_town,
            partners.address4 AS product_owner_neighborhood,
            pictures.picture::bytea AS product_picture,
            workhours.monday AS product_monday_work,
            workhours.tuesday AS product_tuesday_work,
            workhours.wednesday AS product_wednesday_work,
            workhours.thursday AS product_thursday_work,
            workhours.friday AS product_friday_work,
            workhours.saturday AS product_saturday_work,
            workhours.sunday AS product_sunday_work
        FROM products
        LEFT JOIN partners ON products.partnerid = partners.companyid
        LEFT JOIN pictures ON products.picture::integer = pictures.id
        LEFT JOIN workhours ON products.partnerid = workhours.partnerid
        WHERE products.acceptance = 'accepted'
            AND partners.acceptance = 'accepted'
            AND partners.companyname IS NOT null
            AND partners.address2 = $1
        ORDER BY products.id
    `,[city], async (error, results) => {
        if(error){
            await handleError(error);
            getProductByCityForMenuForUser(request, response);
        }else{
            for(let i = 0; i < results.rows.length; i++){
                let buf = Buffer.from(results.rows[i].product_picture);
                results.rows[i].product_picture = buf.toString();
            }

            response.status(200).json(results.rows);
        }
    });
};

const getProductByCityAndTownForMenuForUser = (request, response) => {
    const city = (request.params.city);
    const town = (request.params.town);

    pool.query(`
        SELECT 
            products.id AS product_id,
            products.name AS product_name,
            products.price AS product_price,
            products.type AS product_type,
            products.partnerid AS product_partnerid,
            products.acceptance AS product_acceptance,
            partners.companyname AS product_owner_name,
            partners.acceptance AS product_owner_status,
            partners.address2 AS product_owner_city,
            partners.address3 AS product_owner_town,
            partners.address4 AS product_owner_neighborhood,
            pictures.picture::bytea AS product_picture,
            workhours.monday AS product_monday_work,
            workhours.tuesday AS product_tuesday_work,
            workhours.wednesday AS product_wednesday_work,
            workhours.thursday AS product_thursday_work,
            workhours.friday AS product_friday_work,
            workhours.saturday AS product_saturday_work,
            workhours.sunday AS product_sunday_work
        FROM products
        LEFT JOIN partners ON products.partnerid = partners.companyid
        LEFT JOIN pictures ON products.picture::integer = pictures.id
        LEFT JOIN workhours ON products.partnerid = workhours.partnerid
        WHERE products.acceptance = 'accepted'
            AND partners.acceptance = 'accepted'
            AND partners.companyname IS NOT null
            AND partners.address2 = $1
            AND partners.address3 = $2
        ORDER BY products.id
    `,[city, town], async (error, results) => {
        if(error){
            await handleError(error);
            getProductByCityAndTownForMenuForUser(request, response);
        }else{
            for(let i = 0; i < results.rows.length; i++){
                let buf = Buffer.from(results.rows[i].product_picture);
                results.rows[i].product_picture = buf.toString();
            }

            response.status(200).json(results.rows);
        }
    });
};

const getProductByCityAndTownAndNeighborhoodForMenuForUser = (request, response) => {
    const city = (request.params.city);
    const town = (request.params.town);
    const neighborhood = (request.params.neighborhood);

    pool.query(`
        SELECT 
            products.id AS product_id,
            products.name AS product_name,
            products.price AS product_price,
            products.type AS product_type,
            products.partnerid AS product_partnerid,
            products.acceptance AS product_acceptance,
            partners.companyname AS product_owner_name,
            partners.acceptance AS product_owner_status,
            partners.address2 AS product_owner_city,
            partners.address3 AS product_owner_town,
            partners.address4 AS product_owner_neighborhood,
            pictures.picture::bytea AS product_picture,
            workhours.monday AS product_monday_work,
            workhours.tuesday AS product_tuesday_work,
            workhours.wednesday AS product_wednesday_work,
            workhours.thursday AS product_thursday_work,
            workhours.friday AS product_friday_work,
            workhours.saturday AS product_saturday_work,
            workhours.sunday AS product_sunday_work
        FROM products
        LEFT JOIN partners ON products.partnerid = partners.companyid
        LEFT JOIN pictures ON products.picture::integer = pictures.id
        LEFT JOIN workhours ON products.partnerid = workhours.partnerid
        WHERE products.acceptance = 'accepted'
            AND partners.acceptance = 'accepted'
            AND partners.companyname IS NOT null
            AND partners.address2 = $1
            AND partners.address3 = $2
            AND partners.address4 = $3
        ORDER BY products.id
    `,[city, town, neighborhood], async (error, results) => {
        if(error){
            await handleError(error);
            getProductByCityAndTownAndNeighborhoodForMenuForUser(request, response);
        }else{
            for(let i = 0; i < results.rows.length; i++){
                let buf = Buffer.from(results.rows[i].product_picture);
                results.rows[i].product_picture = buf.toString();
            }

            response.status(200).json(results.rows);
        }
    });
};

const getProductForMenuForPartner = (request, response) => {
    const id = request.params.id;

    pool.query(`
        SELECT 
            products.id AS product_id,
            products.name AS product_name,
            products.price AS product_price,
            products.partnerid AS product_partnerid,
            products.acceptance AS product_acceptance,
            products.picture AS product_picture_id,
            partners.companyname AS product_owner_name,
            pictures.picture::bytea AS product_picture
        FROM products
        LEFT JOIN partners ON products.partnerid = partners.companyid
        LEFT JOIN pictures ON products.picture::integer = pictures.id
        WHERE products.partnerid = '` + id + `'
        ORDER BY products.id
    `, async (error, results) => {
        if(error){
            await handleError(error);
            getProductForMenuForPartner(request, response);
        }else{
            for(let i = 0; i < results.rows.length; i++){
                let buf = Buffer.from(results.rows[i].product_picture);
                results.rows[i].product_picture = buf.toString();
            }

            response.status(200).json(results.rows);
        }
    });
};

const getProductForBasketForUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(`
        SELECT 
			orders.id AS order_id,
			orders.userid AS order_user_id,
			orders.address AS order_address,
			orders.paymentmethod AS order_payment_method,
			orders.orderstatus AS order_order_status,
            products.id AS product_id,
            products.name AS product_name,
            products.price AS product_price,
            products.partnerid AS product_partnerid,
            products.acceptance AS product_acceptance,
            partners.companyname AS product_owner_name,
            partners.acceptance AS product_owner_status,
            pictures.picture::bytea AS product_picture
        FROM orders
		LEFT JOIN products ON orders.products::integer = products.id
        LEFT JOIN partners ON products.partnerid = partners.companyid
        LEFT JOIN pictures ON products.picture::integer = pictures.id
		WHERE orders.userid = '` + id + `' AND orders.orderstatus = 'added'
        ORDER BY products.id
    `, async (error, results) => {
        if(error){
            await handleError(error);
            getProductForBasketForUser(request, response);
        }else{
            for(let i = 0; i < results.rows.length; i++){
                let buf = Buffer.from(results.rows[i].product_picture);
                results.rows[i].product_picture = buf.toString();
            }

            response.status(200).json(results.rows);
        }
    });
};

const createOrder = (request, response) => {
    const { userid, address, paymentmethod, products, partnerid, orderstatus } = request.body;

    pool.query('INSERT INTO orders (userid, address, paymentmethod, products, partnerid, orderstatus) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [userid, address, paymentmethod, products, partnerid, orderstatus], async (error, results) => {
        if (error){
            await handleError(error);
            createOrder(request, response);
        }else{
            response.status(201).send(`Order added with ID: ${results.rows[0].id}`);
        }
    });
};

const updateOrder = (request, response) => {
    const id = parseInt(request.params.id);
    const { userid, address, paymentmethod, products, partnerid, orderstatus } = request.body;

    pool.query('UPDATE orders SET name = $1, price = $2, stocknumber = $3, picture = $4, partnerid = $5, acceptance = $6 WHERE id = $7',
                [name, price, stocknumber, picture, partnerid, acceptance, id],
                async (error, results) => {
                    if(error){
                        await handleError(error);
                        updateOrder(request, response);
                    }else{
                        response.status(200).send(`Product updated with ID: ${id}`);
                    }
                });
};

const deleteOrder = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM orders WHERE id = $1', [id], async (error, results) => {
        if(error){
            await handleError(error);
            deleteOrder(request, response);
        }else{
            response.status(200).send(`Order deleted with ID: ${id}`);
        }
    });
};

const updateOrderStatus = (request, response) => {
    const id = parseInt(request.params.id);
    const { orderstatus } = request.body;

    pool.query('UPDATE orders SET orderstatus = $1 WHERE id = $2',
                [orderstatus, id],
                async (error, results) => {
                    if(error){
                        await handleError(error);
                        updateOrderStatus(request, response);
                    }else{
                        response.status(200).send(`Order status updated with ID: ${id}`);
                    }
                });
};

const createBasket = (request, response) => {
    const { orders, fullname, userid, phone, city, address, totalprice, note, basketstatus, basketdate, companyid, mail, paymentmethod, username, cardid } = request.body;

    pool.query('INSERT INTO basket (orders, fullname, userid, phone, city, address, totalprice, note, basketstatus, basketdate, companyid, mail, paymentmethod, username, cardid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id', [orders, fullname, userid, phone, city, address, totalprice, note, basketstatus, basketdate, companyid, mail, paymentmethod, username, cardid], async (error, results) => {
        if (error){
            await handleError(error);
            createBasket(request, response);
        }else{
            response.status(201).send(`Basket added with ID: ${results.rows[0].id}`);
        } 
    });
};

const updateBasketStatus = (request, response) => {
    const id = parseInt(request.params.id);
    const { basketstatus, totalprice } = request.body;

    pool.query('UPDATE basket SET basketstatus = $1, totalprice = $2 WHERE id = $3',
                [basketstatus, totalprice, id],
                async (error, results) => {
                    if(error){
                        await handleError(error);
                        updateBasketStatus(request, response);
                    }else{
                        response.status(200).send(`Basket status updated with ID: ${id}`);
                    }
                });
};

const updateBasketStatus2 = (request, response) => {
    const id = parseInt(request.params.id);
    const { basketstatus } = request.body;

    pool.query('UPDATE basket SET basketstatus = $1 WHERE id = $2',
                [basketstatus, id],
                async (error, results) => {
                    if(error){
                        await handleError(error);
                        updateBasketStatus2(request, response);
                    }else{
                        response.status(200).send(`Basket status updated with ID: ${id}`);
                    }
                });
};

const createCard = (request, response) => {
    const { ownername, cardnumber, carddate, cardcvv, userid, usertype, cardtype } = request.body;

    pool.query('INSERT INTO cards (ownername, cardnumber, carddate, cardcvv, userid, usertype, cardtype) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id', [ownername, cardnumber, carddate, cardcvv, userid, usertype, cardtype], async (error, results) => {
        if (error){
            await handleError(error);
            createCard(request, response);
        }else{
            response.status(201).send(`Card added with ID: ${results.rows[0].id}`);
        } 
    });
};

const getOrderForPayForUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(`
    SELECT
        *
        FROM basket
        WHERE userid = '` + id + `' AND basketstatus='notpaid'
    `, async (error, results) => {
        if(error){
            await handleError(error);
            getOrderForPayForUser(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const getActiveOrdersProducts = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(`
    SELECT 
        orders.id AS order_id,
        orders.userid AS order_userid,
        orders.address AS order_address,
        orders.paymentmethod AS order_paymentmethod,
        orders.orderstatus AS order_status,
        products.id AS product_id,
        products.name AS product_name,
        products.price AS product_price,
        products.picture AS product_picture,
        products.partnerid AS partnerid
    FROM orders
    LEFT JOIN products ON orders.products::integer = products.id
    WHERE orders.id = $1
    `, [id], async (error, results) => {
        if(error){
            await handleError(error);
            getActiveOrdersProducts(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const getActiveBaskets = (request, response) => {
    const id = (request.params.id);
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if(month < 10){
        month = "0" + month;
    }
    if(day < 10){
        day = "0" + day;
    }
    let search_date = year + "-" + month + "-" + day;

    var date_val = new Date();
    date_val.setDate(date_val.getDate() - 1);
    let yesterday_year = date_val.getFullYear();
    let yesterday_month = date_val.getMonth() + 1;
    let yesterday_day = date_val.getDate();
    if(yesterday_month < 10){
        yesterday_month = "0" + yesterday_month;
    }
    if(yesterday_day < 10){
        yesterday_day = "0" + yesterday_day;
    }
    let search_date_yesterday = yesterday_year + "-" + yesterday_month + "-" + yesterday_day;

    pool.query(`SELECT * FROM basket WHERE companyid = $1 AND (basketdate LIKE '` + search_date +`%' OR basketdate LIKE '` + search_date_yesterday +`%') ORDER BY basketstatus DESC`, [id], async (error, results) => {
        if(error){
            await handleError(error);
            getActiveBaskets(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const getActiveBasketsForUser = (request, response) => {
    const id = parseInt(request.params.id);
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if(month < 10){
        month = "0" + month;
    }
    if(day < 10){
        day = "0" + day;
    }
    let search_date = year + "-" + month + "-" + day;

    var date_val = new Date();
    date_val.setDate(date_val.getDate() - 1);
    let yesterday_year = date_val.getFullYear();
    let yesterday_month = date_val.getMonth() + 1;
    let yesterday_day = date_val.getDate();
    if(yesterday_month < 10){
        yesterday_month = "0" + yesterday_month;
    }
    if(yesterday_day < 10){
        yesterday_day = "0" + yesterday_day;
    }
    let search_date_yesterday = yesterday_year + "-" + yesterday_month + "-" + yesterday_day;

    // console.log(search_date);
    // console.log(search_date_yesterday);

    pool.query(`SELECT * FROM basket WHERE userid = $1 AND (basketdate LIKE '` + search_date +`%' OR basketdate LIKE '` + search_date_yesterday +`%') AND (basketstatus = 'paid' OR basketstatus = 'accepted') ORDER BY basketdate`, [id], async (error, results) => {
        if(error){
            await handleError(error);
            getActiveBasketsForUser(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const createWorkHours = (request, response) => {
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday, partnerid } = request.body;

    pool.query('INSERT INTO workhours (monday, tuesday, wednesday, thursday, friday, saturday, sunday, partnerid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id', [monday, tuesday, wednesday, thursday, friday, saturday, sunday, partnerid], async (error, results) => {
        if (error){
            await handleError(error);
            createWorkHours(request, response);
        }else{
            response.status(201).send(`Workhours added with ID: ${results.rows[0].id}`);
        } 
    });
};

const getWorkhours = (request, response) => {
    const id = (request.params.id);

    pool.query(`SELECT * FROM workhours WHERE partnerid = $1`, [id], async (error, results) => {
        if(error){
            await handleError(error);
            getWorkhours(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const updateWorkHours = (request, response) => {
    const id = (request.params.id);

    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = request.body;

    pool.query('UPDATE workhours SET monday = $1, tuesday = $2, wednesday = $3, thursday = $4, friday = $5, saturday = $6, sunday = $7 WHERE partnerid = $8', [monday, tuesday, wednesday, thursday, friday, saturday, sunday, id], async (error, results) => {
        if (error){
            await handleError(error);
            updateWorkHours(request, response);
        }else{
            response.status(200).send(`Workhours updated with ID: ${id}`);
        } 
    });
};

const getProductForMenuForUserFromPartner = (request, response) => {
    const id = (request.params.id);

    pool.query(`
        SELECT 
            products.id AS product_id,
            products.name AS product_name,
            products.price AS product_price,
            products.partnerid AS product_partnerid,
            products.acceptance AS product_acceptance,
            partners.companyname AS product_owner_name,
            partners.acceptance AS product_owner_status,
            pictures.picture::bytea AS product_picture,
            workhours.monday AS product_monday_work,
            workhours.tuesday AS product_tuesday_work,
            workhours.wednesday AS product_wednesday_work,
            workhours.thursday AS product_thursday_work,
            workhours.friday AS product_friday_work,
            workhours.saturday AS product_saturday_work,
            workhours.sunday AS product_sunday_work
        FROM products
        LEFT JOIN partners ON products.partnerid = partners.companyid
        LEFT JOIN pictures ON products.picture::integer = pictures.id
        LEFT JOIN workhours ON products.partnerid = workhours.partnerid
        WHERE products.acceptance = 'accepted' AND products.partnerid = '` + id + `'
        ORDER BY products.id
    `, async (error, results) => {
        if(error){
            await handleError(error);
            getProductForMenuForUserFromPartner(request, response);
        }else{
            for(let i = 0; i < results.rows.length; i++){
                let buf = Buffer.from(results.rows[i].product_picture);
                results.rows[i].product_picture = buf.toString();
            }

            response.status(200).json(results.rows);
        }
    });
};

const getProductInformationsFromOrder = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(`
        SELECT 
            products.name,
            products.price
            FROM orders
            LEFT JOIN products ON orders.products::integer = products.id
            WHERE orders.id = '` + id + `'
    `, async (error, results) => {
        if(error){
            await handleError(error);
            getProductInformationsFromOrder(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const getCardById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM cards WHERE userid = $1  ORDER BY id', [id], async (error, results) => {
        if(error){
            await handleError(error);
            getCardById(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const setBillInfo = (request, response) => {
    const { fullname, phone, email, city, billaddress, userid } = request.body;

    pool.query('INSERT INTO bill (fullname, phone, email, city, billaddress, userid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [fullname, phone, email, city, billaddress, userid], async (error, results) => {
        if (error){
            await handleError(error);
            setBillInfo(request, response);
        }else{
            response.status(201).send(`Bill added with ID: ${results.rows[0].id}`);
        } 
    });
};

const getBillInfo = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM bill WHERE userid = $1  ORDER BY id', [id], async (error, results) => {
        if(error){
            await handleError(error);
            getBillInfo(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const updateBillInfo = (request, response) => {
    const { fullname, phone, email, city, billaddress, userid } = request.body;

    pool.query('UPDATE bill SET fullname = $1, phone = $2, email = $3, city = $4, billaddress = $5 WHERE userid = $6', [fullname, phone, email, city, billaddress, userid], async (error, results) => {
        if (error){
            await handleError(error);
            updateBillInfo(request, response);
        }else{
            response.status(200).send(`Bill updated with ID: ${userid}`);
        } 
    });
};

const getPartnerPaymentInfo = (request, response) => {
    const id = (request.params.id);

    pool.query(`SELECT
                    partners.name,
                    partners.surname,
                    partner_payment_info.accountno,
                    partner_payment_info.bankname,
                    partner_payment_info.billaddress,
                    partner_payment_info.iban,
                    partner_payment_info.paymentdate,
                    partner_payment_info.contact,
                    partner_payment_info.companyname,
                    partner_payment_info.partnerid
                    FROM partner_payment_info
                    LEFT JOIN partners ON partner_payment_info.partnerid = partners.companyid
                    WHERE partner_payment_info.partnerid = $1`, [id], async (error, results) => {
        if(error){
            await handleError(error);
            getPartnerPaymentInfo(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const getCardInfo = (request, response) => {
    const cardnumber = parseInt(request.params.cardnumber);
    const userid = parseInt(request.params.userid);

    pool.query('SELECT * FROM cards WHERE cardnumber = $1 AND userid = $2 ORDER BY id', [cardnumber, userid], async (error, results) => {
        if(error){
            await handleError(error);
            getCardInfo(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const deleteCardInfo = (request, response) => {
    const cardnumber = parseInt(request.params.cardnumber);
    const userid = parseInt(request.params.userid);

    pool.query('DELETE FROM cards WHERE cardnumber = $1 AND userid = $2', [cardnumber, userid], async (error, results) => {
        if(error){
            await handleError(error);
            deleteCardInfo(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const getBaskets = (request, response) => {
    const partnerid = (request.params.partnerid);

    pool.query(`SELECT * FROM basket WHERE companyid = $1 AND (basketstatus = 'paid' OR basketstatus = 'accepted') ORDER BY id`, [partnerid], async (error, results) => {
        if(error){
            await handleError(error);
            getBaskets(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const getDiscounts = (request, response) => {
    const discountcode_value = request.params.discountcode;
    // console.log(discountcode_value);
    
    pool.query(`SELECT * FROM discount WHERE discountcode = $1 ORDER BY id`, [discountcode_value], async (error, results) => {
        if(error){
            await handleError(error);
            getDiscounts(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const updateDiscount = (request, response) => {
    const discountcode = parseInt(request.params.discountcode);
    const { userid } = request.body;

    pool.query('UPDATE discount SET discountuserid = $1 WHERE discountcode = $2', [userid, discountcode], async (error, results) => {
        if (error){
            await handleError(error);
            updateDiscount(request, response);
        }else{
            response.status(200).send(`Bill updated with ID: ${userid}`);
        } 
    });
};

const getLastDiscount = (request, response) => {
    pool.query(`SELECT * FROM discount ORDER BY id DESC LIMIT 1`, [], async (error, results) => {
        if(error){
            await handleError(error);
            getLastDiscount(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const getDiscountApplied = (request, response) => {
    const discountcode_value = request.params.discountcode;
    const discountuserid_value = request.params.userid;
    // console.log(discountcode_value);
    
    pool.query(`SELECT * FROM discountapplied WHERE discountcode = $1 AND discountuserid = $2 ORDER BY id`, [discountcode_value, discountuserid_value], async (error, results) => {
        if(error){
            await handleError(error);
            getDiscountApplied(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const setDiscountApplied = (request, response) => {
    const { discountcode, discountamount, discounttime, discountcompanyid, discountuserid } = request.body;

    pool.query('INSERT INTO discountapplied (discountcode, discountamount, discounttime, discountcompanyid, discountuserid) VALUES ($1, $2, $3, $4, $5) RETURNING id', [discountcode, discountamount, discounttime, discountcompanyid, discountuserid], async (error, results) => {
        if(error){
            await handleError(error);
            setDiscountApplied(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const getThreeds = (request, response) => {
    const conversationId = request.params.conversationId;
    
    pool.query(`SELECT * FROM threeds WHERE conversationid = $1 ORDER BY id`, [conversationId], async (error, results) => {
        if(error){
            await handleError(error);
            getThreeds(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const setThreeds = (request, response) => {
    const { conversationId, result } = request.body;

    pool.query('INSERT INTO threeds (conversationid, result) VALUES ($1, $2) RETURNING id', [conversationId, result], async (error, results) => {
        if(error){
            await handleError(error);
            setThreeds(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const updateThreeds = (request, response) => {
    const conversationId = (request.params.conversationId);

    pool.query(`UPDATE threeds SET result = 'success' WHERE conversationid = $1`, [conversationId], async (error, results) => {
        if (error){
            await handleError(error);
            updateThreeds(request, response);
        }else{
            response.status(200).send(`Threeds updated with ID: ${conversationId}`);
        } 
    });
};

const updateFailThreeds = (request, response) => {
    const conversationId = (request.params.conversationId);

    pool.query(`UPDATE threeds SET result = 'failure' WHERE conversationid = $1`, [conversationId], async (error, results) => {
        if (error){
            await handleError(error);
            updateFailThreeds(request, response);
        }else{
            response.status(200).send(`Threeds updated with ID: ${conversationId}`);
        } 
    });
};

const setSubmerchants = (request, response) => {
    const { partnerid, conversationid, submerchantkey } = request.body;

    pool.query('INSERT INTO submerchant (partnerid, conversationid, submerchantkey) VALUES ($1, $2, $3) RETURNING id', [partnerid, conversationid, submerchantkey], async (error, results) => {
        if(error){
            await handleError(error);
            setSubmerchants(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const getSubmerchants = (request, response) => {
    pool.query(`SELECT * FROM submerchant  ORDER BY id DESC`, [], async (error, results) => {
        if(error){
            await handleError(error);
            getSubmerchants(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const getSubmerchantsById = (request, response) => {
    const partnerid = request.params.partnerid;

    pool.query(`SELECT * FROM submerchant WHERE partnerid = $1 ORDER BY id DESC`, [partnerid], async (error, results) => {
        if(error){
            await handleError(error);
            getSubmerchantsById(request, response);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

module.exports = {
    createUser,
    // getUsers,
    getUserById,
    updateUser,
    // updateUserPassword,
    deleteUser,
    checkUser,
    checkUserPhone,
    getUserByEmail,
    getUserByPhone,
    createPartner,
    // getPartners,
    getPartnerById,
    // updatePartner,
    // updatePartnerPassword,
    deletePartner,
    checkPartner,
    getPartnersid,
    getImageById,
    createImage,
    updateImage,
    deleteImage,
    getProductById,
    getProductsByCompanyId,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductForMenuForUser,
    getProductByCityForMenuForUser,
    getProductByCityAndTownForMenuForUser,
    getProductByCityAndTownAndNeighborhoodForMenuForUser,
    getProductForMenuForPartner,
    getProductForBasketForUser,
    createOrder,
    updateOrder,
    deleteOrder,
    createBasket,
    updateBasketStatus,
    updateBasketStatus2,
    createCard,
    getOrderForPayForUser,
    updateOrderStatus,
    getActiveOrdersProducts,
    getActiveBaskets,
    getActiveBasketsForUser,
    createWorkHours,
    getWorkhours,
    updateWorkHours,
    getProductForMenuForUserFromPartner,
    getProductInformationsFromOrder,
    getCardById,
    setBillInfo,
    getBillInfo,
    updateBillInfo,
    getPartnerPaymentInfo,
    getCardInfo,
    deleteCardInfo,
    getBaskets,
    getDiscounts,
    updateDiscount,
    getLastDiscount,
    getDiscountApplied,
    setDiscountApplied,
    getThreeds,
    setThreeds,
    updateThreeds,
    updateFailThreeds,
    setSubmerchants,
    getSubmerchants,
    getSubmerchantsById,
};