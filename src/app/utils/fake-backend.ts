import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // tslint:disable-next-line: max-line-length
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // get categories
            if (request.url.includes('/categorys') && request.method === 'GET') {
                return of(new HttpResponse({ status: 200, body: this.CATEGORY_MOCK }));
            }

            // pass through any requests not handled above
            return next.handle(request);

        }))

            // tslint:disable-next-line: max-line-length
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }


    CATEGORY_MOCK = [
        {
          "id": "63be1bbc946d93c51a28e078",
          "name": "Fuller Wagner",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "Commodo anim laborum eiusmod labore ea quis fugiat. Minim dolore fugiat commodo ex mollit Lorem exercitation. Commodo velit id deserunt eu laborum dolore ut in excepteur aliquip irure veniam. Non excepteur cupidatat officia qui pariatur in ea ullamco nisi commodo exercitation elit nulla nisi. Nisi sint aute ipsum cupidatat laboris magna consequat ex reprehenderit magna.",
          "date": "2019-04-13T00:13:10.049Z"
        },
        {
          "id": "63be1bbc5ef64a61991927be",
          "name": "Ball Holland",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "Deserunt reprehenderit ad commodo officia culpa aliquip do id ea. Culpa occaecat et et fugiat reprehenderit minim deserunt nisi sit sint officia id. Consequat veniam et pariatur non non ea exercitation culpa sunt est. Non ad nisi cupidatat sint mollit id qui aliquip cillum incididunt adipisicing aliquip adipisicing. Anim veniam ipsum dolor cillum cupidatat ullamco aliqua occaecat laborum exercitation esse commodo.",
          "date": "2011-07-10T04:51:09.407Z"
        },
        {
          "id": "63be1bbcbd0cee927e012ca5",
          "name": "Oneill Kline",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "Cupidatat irure minim ullamco ut labore in anim duis minim dolor aliqua esse irure ullamco. Ad laboris ipsum mollit excepteur sunt ad fugiat. Aute ut qui esse minim est amet eiusmod tempor ex esse esse. Cupidatat exercitation magna voluptate occaecat proident qui aliquip culpa consectetur ullamco reprehenderit exercitation. Anim elit eiusmod aliqua nisi amet duis nisi occaecat est. Est id veniam quis aliqua sunt sint adipisicing fugiat excepteur culpa.",
          "date": "2008-09-24T19:50:26.902Z"
        },
        {
          "id": "63be1bbc46e1b7ddee0d51ac",
          "name": "Diane Hamilton",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "https://youtu.be/GXbAzNQkRls",
          "date": "2010-12-21T11:18:27.231Z"
        },
        {
          "id": "63be1bbc9a39036c9640b103",
          "name": "Dejesus Whitehead",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "Sunt amet dolore nulla voluptate cillum reprehenderit elit veniam dolore dolore deserunt laborum consequat. Nulla nulla sunt Lorem do. Duis sunt anim reprehenderit sunt voluptate dolore fugiat quis est proident irure nulla commodo.",
          "date": "2013-03-31T03:40:05.978Z"
        },
        {
          "id": "63be1bbc21a92b4e5fd1ff28",
          "name": "Walters Haley",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "Eiusmod minim sint non magna ad quis ex ullamco culpa. Nisi exercitation do ullamco sit do eiusmod minim quis. Laborum aliqua excepteur laborum aliquip laborum est. Aute cupidatat labore eu occaecat officia sint aliquip non reprehenderit. Veniam labore irure pariatur ex minim officia magna fugiat et adipisicing irure reprehenderit ipsum commodo. Adipisicing deserunt esse enim sit nisi consectetur ex eu ad voluptate laborum cillum in.",
          "date": "2007-07-29T19:37:53.283Z"
        },
        {
          "id": "63be1bbc5245513ba05158cf",
          "name": "Rogers Stokes",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "Aute tempor anim ipsum duis id aute tempor adipisicing deserunt ex do nisi id. Aliqua veniam ullamco aute laborum ullamco. Tempor minim fugiat quis reprehenderit incididunt nulla. Sunt consequat sit fugiat veniam amet reprehenderit deserunt Lorem in do nostrud.",
          "date": "2017-06-12T00:42:14.234Z"
        },
        {
          "id": "63be1bbcb928ebda8237712a",
          "name": "Mccarthy Cummings",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "https://youtu.be/GXbAzNQkRls",
          "date": "2010-09-20T22:37:55.020Z"
        },
        {
          "id": "63be1bbc2c993e236949fcae",
          "name": "Goldie Mayo",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "Culpa est dolor irure excepteur laborum exercitation ea commodo reprehenderit. Eu cillum enim est exercitation ea. Velit qui excepteur laborum laboris commodo commodo mollit ipsum cupidatat commodo consectetur quis do. Ut veniam eu ea incididunt non aliquip aute irure culpa. Est ad esse laborum est ea consectetur incididunt consequat deserunt pariatur pariatur ullamco qui quis.",
          "date": "2015-11-07T19:22:45.735Z"
        },
        {
          "id": "63be1bbcd1a294d0add3e84a",
          "name": "Petty Mitchell",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "https://youtu.be/GXbAzNQkRls",
          "date": "2000-05-10T13:13:19.257Z"
        },
        {
          "id": "63be1bbc1457e70899cffe51",
          "name": "Evelyn Ruiz",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "Dolor officia id anim in reprehenderit consectetur non qui magna deserunt mollit. Commodo occaecat commodo cupidatat consectetur cillum sint. Nisi non nisi reprehenderit consectetur ipsum commodo duis est est quis exercitation nostrud ea. Occaecat non sit deserunt deserunt reprehenderit incididunt elit sint dolor mollit veniam duis Lorem.",
          "date": "2010-11-20T06:26:38.147Z"
        },
        {
          "id": "63be1bbc5cd182207d98f0a4",
          "name": "Rosa Santana",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "https://youtu.be/GXbAzNQkRls",
          "date": "2011-05-26T02:34:08.274Z"
        },
        {
          "id": "63be1bbc4a0535a946d422ff",
          "name": "Helga Munoz",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "https://youtu.be/GXbAzNQkRls",
          "date": "2011-01-16T14:38:30.915Z"
        },
        {
          "id": "63be1bbcab2807686f00f708",
          "name": "Geneva Harmon",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "Enim irure et esse enim tempor esse eiusmod duis. Laborum do adipisicing magna voluptate dolore proident mollit dolor sit excepteur ullamco excepteur reprehenderit. Esse nulla qui dolore cillum laboris ad laboris laboris do est ipsum aliquip. Deserunt minim veniam proident laborum id aliquip duis deserunt. Cillum voluptate consectetur reprehenderit dolor fugiat nisi aliquip ipsum tempor labore irure. Sit ex occaecat reprehenderit amet irure fugiat laborum anim tempor voluptate aliqua sit laborum.",
          "date": "2008-12-06T09:26:59.653Z"
        },
        {
          "id": "63be1bbce89c8fc3b7aa6297",
          "name": "Strong Spence",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "https://youtu.be/GXbAzNQkRls",
          "date": "2020-08-20T07:00:36.584Z"
        },
        {
          "id": "63be1bbcbd05f9b3e292ea98",
          "name": "Wendi Warren",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "Cillum sint ut do Lorem reprehenderit commodo occaecat Lorem nulla velit id. Minim consectetur quis et enim eu labore. Culpa velit ad deserunt ut irure tempor eiusmod nostrud mollit dolor aliquip. Aliqua minim commodo mollit exercitation culpa anim quis cupidatat cillum non commodo amet nulla deserunt.",
          "date": "2007-07-09T08:22:16.719Z"
        },
        {
          "id": "63be1bbc318928bf77f86271",
          "name": "Holden Wolf",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "https://youtu.be/GXbAzNQkRls",
          "date": "2022-08-28T20:58:08.001Z"
        },
        {
          "id": "63be1bbcf3205239c3125c43",
          "name": "Hammond Raymond",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "https://youtu.be/GXbAzNQkRls",
          "date": "2022-08-19T22:27:28.170Z"
        },
        {
          "id": "63be1bbcf00b429e0fc15bb4",
          "name": "Arnold Lane",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "Cupidatat deserunt veniam enim sunt cupidatat non laboris qui et esse. Cillum laboris mollit minim cupidatat ipsum qui veniam labore in. Ipsum culpa sint incididunt cupidatat laboris proident sint sunt anim dolor. Ea fugiat magna officia sint dolore laboris est qui excepteur adipisicing. Aute eiusmod ipsum aute laborum eiusmod cupidatat occaecat do minim eu anim labore. Irure voluptate aute cupidatat minim ipsum minim reprehenderit est cupidatat labore dolor ullamco.",
          "date": "2001-12-01T19:05:01.354Z"
        },
        {
          "id": "63be1bbc0aaab0ee37d846dc",
          "name": "Ronda Wilkins",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "Ea non enim sint irure fugiat magna tempor velit. Do duis Lorem ad velit veniam. Ipsum id Lorem in amet amet ipsum sint nulla sit exercitation. Aliquip ipsum consectetur irure enim est exercitation proident. Duis esse esse magna qui eiusmod cupidatat. Ea fugiat duis nulla anim anim cupidatat do in laboris mollit elit voluptate. Minim aliquip laboris adipisicing laboris veniam ipsum irure ipsum excepteur eiusmod ea.",
          "date": "2014-07-10T05:29:40.066Z"
        },
        {
          "id": "63be1bbc11bcd03f33898579",
          "name": "Concepcion Wood",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "Ut pariatur in Lorem enim labore voluptate proident nisi. Quis qui deserunt labore fugiat pariatur ea excepteur. Dolore amet cupidatat laboris sint mollit sunt sint. Duis et adipisicing pariatur pariatur qui tempor ipsum in deserunt culpa ullamco. Eiusmod minim sint deserunt sit.",
          "date": "2004-05-27T15:46:31.054Z"
        },
        {
          "id": "63be1bbcc1d0057ab97ecf52",
          "name": "Noreen Peterson",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "https://youtu.be/GXbAzNQkRls",
          "date": "2001-02-14T21:35:11.168Z"
        },
        {
          "id": "63be1bbc4bf7891f73ca5bd4",
          "name": "Megan Matthews",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "Non anim do commodo incididunt aliqua nisi exercitation. Exercitation ipsum cillum dolore reprehenderit elit consequat et Lorem excepteur velit nostrud. Magna cillum reprehenderit labore nostrud commodo ullamco minim irure ut minim occaecat. Laborum nostrud id tempor voluptate labore excepteur minim magna cupidatat ipsum minim non ad esse. Laborum irure irure aute irure officia anim irure.",
          "date": "2009-02-24T23:59:10.886Z"
        },
        {
          "id": "63be1bbcd7278dfb0e6e567a",
          "name": "Mildred Ochoa",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "Minim sunt adipisicing duis culpa nulla sunt sint duis eiusmod ad do. Aute aute pariatur dolor eu veniam duis cillum veniam. Eu cillum minim commodo duis labore consequat mollit sint est. Proident magna laborum magna nostrud.",
          "date": "2011-11-02T11:44:23.682Z"
        },
        {
          "id": "63be1bbc12540e14d398a38c",
          "name": "Mann Weber",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "Eiusmod et id cillum dolor ut. Do est quis duis reprehenderit eu tempor. Velit adipisicing cillum ipsum non exercitation ex culpa dolor deserunt commodo quis cupidatat incididunt minim. Sunt duis deserunt pariatur incididunt reprehenderit deserunt. Aliquip fugiat quis tempor ullamco deserunt sit consequat pariatur minim dolore.",
          "date": "2022-09-18T23:31:10.806Z"
        },
        {
          "id": "63be1bbce28d790ed965afc6",
          "name": "Marietta Callahan",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "https://youtu.be/GXbAzNQkRls",
          "date": "2018-02-02T14:31:19.175Z"
        },
        {
          "id": "63be1bbc7ccd508bc020f135",
          "name": "Carlene Terry",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "Dolor mollit ut adipisicing ea. Nostrud mollit sint labore minim fugiat deserunt proident commodo. Sint qui quis Lorem esse mollit. Reprehenderit esse ad ipsum incididunt nisi fugiat voluptate officia sint consequat exercitation consequat esse sit. Adipisicing in dolore consectetur ullamco labore ad duis dolore ea eiusmod. Sit nulla adipisicing culpa ut.",
          "date": "2022-02-03T22:04:47.649Z"
        },
        {
          "id": "63be1bbc0eafb427080a1cd1",
          "name": "Pearl Waller",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "Sit enim occaecat duis culpa ea sint qui proident irure. Ullamco enim nisi consectetur id excepteur deserunt. Ullamco adipisicing et velit occaecat id ut dolore quis nostrud magna. Elit minim deserunt reprehenderit ad dolore. Minim Lorem voluptate velit enim laborum commodo proident id magna. Veniam aute ut dolore aliqua sint.",
          "date": "2002-08-12T19:43:32.778Z"
        },
        {
          "id": "63be1bbc1d8656509e7b0ac6",
          "name": "Jami Jefferson",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "https://youtu.be/GXbAzNQkRls",
          "date": "2011-01-25T21:35:25.143Z"
        },
        {
          "id": "63be1bbc998adef4d8174cd5",
          "name": "Jenkins Guerra",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "Consequat do ex esse adipisicing laboris do eu. Incididunt laboris duis culpa sunt. Enim id aliqua exercitation enim esse laborum excepteur pariatur mollit cillum voluptate ex velit dolore. Sint ullamco adipisicing non irure. Sint do excepteur duis sunt labore id nulla laboris dolor.",
          "date": "2013-01-01T13:12:49.473Z"
        },
        {
          "id": "63be1bbc403142a0354a2c68",
          "name": "Tamra Kent",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "Commodo mollit commodo velit in commodo et ipsum laboris eiusmod fugiat excepteur est. Laborum ex culpa ut officia elit est proident id est. Mollit duis officia laboris adipisicing in ex id sint eiusmod. Id enim sint pariatur nostrud esse dolore mollit commodo proident aute dolor voluptate. Tempor occaecat minim amet veniam in ipsum fugiat deserunt elit officia. Exercitation deserunt non duis eiusmod proident elit ea irure proident. Quis non Lorem minim enim pariatur dolor eiusmod ipsum aute fugiat.",
          "date": "2005-09-01T16:09:08.985Z"
        },
        {
          "id": "63be1bbc75e0ba818c6e2447",
          "name": "Hoover Lopez",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "https://youtu.be/GXbAzNQkRls",
          "date": "2015-07-02T04:29:11.450Z"
        },
        {
          "id": "63be1bbcb31cebd8ee880c2f",
          "name": "Burke Walters",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "Duis cupidatat cupidatat elit id labore consectetur in ad anim voluptate do et. Ullamco id duis incididunt ex est duis proident. Pariatur est ullamco non est do. Dolor fugiat magna laborum consequat. Velit laborum mollit qui commodo labore amet non.",
          "date": "2003-01-29T04:50:32.343Z"
        },
        {
          "id": "63be1bbc502fd709ed8ccd4a",
          "name": "Banks Boone",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "Reprehenderit cillum ea magna do esse. Elit consectetur occaecat adipisicing nulla. Id duis velit quis officia consequat laboris ut aute. Esse amet aute in do proident anim consequat dolor nulla ipsum non laboris nisi labore. Consectetur aliqua sunt est excepteur.",
          "date": "2005-01-08T18:55:11.076Z"
        },
        {
          "id": "63be1bbcc7c70d38854aad4c",
          "name": "Bryan Buck",
          "img": "https://preview.pichforest.com/dashonic/layouts/assets/images/users/avatar-1.jpg",
          "count": 5,
          "description": "https://youtu.be/GXbAzNQkRls",
          "date": "2014-08-24T10:22:13.106Z"
        }
      ]

}
