/**
 * Created by yuanyuan on 17/3/19.
 */
const debug = require('debug');
const Promise = require('bluebird');
const faker   = require('faker');

faker.locale = 'zh_CN';

const address = debug('address');
const commerce = debug('commerce');
const company = debug('company');
const database = debug('database');
const date = debug('date');
const fake = debug('fake');
const finance = debug('finance');
const hacker = debug('hacker');
const helpers = debug('helpers');
const image = debug('image');
const internet = debug('internet');
const lorem = debug('lorem');
const name = debug('name');
const phone = debug('phone');
const random = debug('random');
const system = debug('system');


address('zipCode',faker.address.zipCode());
address('city',faker.address.city());
address('cityPrefix',faker.address.cityPrefix());
address('citySuffix',faker.address.citySuffix());
address('streetName',faker.address.streetName());
address('streetAddress',faker.address.streetAddress());
address('streetSuffix',faker.address.streetSuffix());
address('streetPrefix',faker.address.streetPrefix());
address('secondaryAddress',faker.address.secondaryAddress());
address('county',faker.address.county());
address('country',faker.address.country());
address('countryCode',faker.address.countryCode());
address('state',faker.address.state());
address('stateAbbr',faker.address.stateAbbr());
address('latitude',faker.address.latitude());
address('longitude',faker.address.longitude());


commerce('color',faker.commerce.color());
commerce('department',faker.commerce.department());
commerce('productName',faker.commerce.productName());
commerce('price',faker.commerce.price());
commerce('productAdjective',faker.commerce.productAdjective());
commerce('productMaterial',faker.commerce.productMaterial());
commerce('product',faker.commerce.product());

company('suffixes',faker.company.suffixes());
company('companyName',faker.company.companyName());
company('companySuffix',faker.company.companySuffix());
company('catchPhrase',faker.company.catchPhrase());
company('bs',faker.company.bs());
company('catchPhraseAdjective',faker.company.catchPhraseAdjective());
company('catchPhraseDescriptor',faker.company.catchPhraseDescriptor());
company('catchPhraseNoun',faker.company.catchPhraseNoun());
company('bsAdjective',faker.company.bsAdjective());
company('bsBuzz',faker.company.bsBuzz());
company('bsNoun',faker.company.bsNoun());

random('uuid',faker.random.uuid().slice(0,12));