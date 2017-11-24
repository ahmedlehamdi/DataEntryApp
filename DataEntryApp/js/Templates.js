var FLYER = function () {
    return {
        FLYER_ID: 0,
        USER_ID: 0,
        FLYER_NAME_EN: '',
        FLYER_NAME_AR: '',
        PROVIDER_ID: 0,
        PROVIDER_NAME_EN : '',
        FRAME_ID: 0,
        OFFER_TYPE_ID: 0,
        OFFER_TYPE_NAME_EN: '',
        FLYER_IMAGE_URL: '',
        FLYER_APPROVED: false,
        ADMIN_ID: 0,
        FLYER_EXPIRED: false,
        DATE_FROM: '',
        DATE_TO: '',

        IMAGES_ARR: [],
        IMAGES_COUNT : 0
    }
}

var PRODUCT = function () {
    return {
        PRODUCT_ID : 0 ,
        FLYER_ID: 0,
        Parent_ID: 0,
		
        PRODUCT_NAME_EN : '' ,
        PRODUCT_NAME_AR: '',
        PRODUCT_PRICE: '',
		
        TYPE_ID: 0,
        CATEGORY_ID: 0,
        MANUFACTURE_ID: 0,

        TYPE_SPECS : new Array(),

        PRODUCT_IMAGE : '' ,
        LOCATION_ID : 0 ,
		
        PRODUCT_TAGS : '' ,
		
        DATE_FROM : '' ,
        DATE_TO : '' ,

        PROD_OFF_TYPE_ID : 0,

        PROD_OFF_TYP_ATTR_ID: 0,
        PROD_OFF_TYP_SPECS: new PRODUCT_OFFER_TYPE_SPECS(),
        
        bundleList: new Array(),
		
        PRODUCT_ATTR_1 : '' ,
        PRODUCT_ATTR_2 : '' ,
        PRODUCT_ATTR_3 : '' ,
        PRODUCT_ATTR_4 : '' ,
        PRODUCT_ATTR_5 : '' ,
        PRODUCT_ATTR_6 : '' ,
        PRODUCT_ATTR_7 : '' ,
        PRODUCT_ATTR_8 : '' ,
        PRODUCT_ATTR_9 : '' ,
        PRODUCT_ATTR_10 : '' ,
    }
}

var PRODUCT_TYPE_SPECS = function () {
    return {
        TYPE_SPECS_ID : 0,
        TEMPLATE_ID : 0,
		TEMPLATE_VALUE : '',
        TYPE_ID : 0,
        PRODUCT_ID : 0
    }
}

var PRODUCT_OFFER_TYPE_SPECS = function()
{
    return {
        PROD_OFF_TYP_ATTR_ID : 0,
        PROD_OFF_TYPE_ID : 0,
        PROD_OFF_TYP_ATTR_1 : '',
        PROD_OFF_TYP_ATTR_2 : '',
        PROD_OFF_TYP_ATTR_3 : '',
        PROD_OFF_TYP_ATTR_4 : '',
        PROD_OFF_TYP_ATTR_5 : '',
        PROD_OFF_TYP_ATTR_6 : '',
        PROD_OFF_TYP_ATTR_7 : '',
        PROD_OFF_TYP_ATTR_8 : '',
        PROD_OFF_TYP_ATTR_9 : '',
        PROD_OFF_TYP_ATTR_10 : ''
    }
}

var MANUFACTURE = function () {
    return {
        MANUFACTURE_ID: 0,
        MANUFACTURE_NAME_EN: '',
        MANUFACTURE_NAME_AR: '',
        MANUFACTURE_BUSINESS_AREA: '',
    }
}

var CATEGORY = function () {
    return {
        CATEGORY_ID: '',

        CATEGORY_NAME_EN: '',
        CATEGORY_NAME_AR: '',

        CATEGORY_SPECS: '',
        CATEGORY_ATTR_1: '',
        CATEGORY_ATTR_2: '',
        CATEGORY_ATTR_3: '',
        CATEGORY_ATTR_4: '',
        CATEGORY_ATTR_5: '',
        CATEGORY_ATTR_6: '',
        CATEGORY_ATTR_7: '',
        CATEGORY_ATTR_8: '',
        CATEGORY_ATTR_9: '',
        CATEGORY_ATTR_10: ''
    }
}