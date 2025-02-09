const express=require('express');


const { users,
    usersSignup,
    usersLogin,
    usersGatUserData,
    usersUserData,
    usersQuantityUpdate,
    usersDetail,
    usersRemoveProduct,
    usersAddress,
    userprofile,
    getUser,
    changeProfilePicture,
    cartDataEmpty,
    orderHistory,
    getOrderHistory,
    searchHistory,
    searchItems,
    deleteHistory}=require('../controllers/user.controller');

    const router=express.Router();

    router.post('/users',users);
   
    router.post('/signup', usersSignup);
    router.post('/login', usersLogin);
    router.post('/getUserData', usersGatUserData);
    router.post('/userData', usersUserData);
    router.post('/quantityUpdate', usersQuantityUpdate);
    router.post('/detail', usersDetail);
    router.post('/removeProduct', usersRemoveProduct);
    router.post('/address', usersAddress);
    router.post('/profile', userprofile);
    router.post('/getUser', getUser);
    router.post('/changeProfilePicture', changeProfilePicture);
    router.post('/cartDataEmpty', cartDataEmpty);
    router.post('/orderHistory', orderHistory);
    router.post('/getOrderHistory', getOrderHistory);
    router.post('/searchHistory', searchHistory);
    router.post('/searchItems', searchItems);
    router.post('/deleteHistory', deleteHistory);

    

    module.exports=router;
    