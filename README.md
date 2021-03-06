Fried-chicken
=============

Summary
-------

*Fried-chicken* is a Web Application developped to monitor water networks and water end use in a residential scale. People should be able to look after their actual consumption and to use several filters to change the time length of the water consumption review. This application will also be able to help the consumers to interact with their Water Company and to report issues over the Water network.

Libraries
---------

*Fried-chicken* is implemented with the help of the following librairies:

- AngularJS: AngularJS is a powerful Javascript framework developped by Google (under the MIT license) which allows a nice code structure in single page web applications. 
- Bootstrap: A CSS Framework developped by Twitter (under the MIT license), which provide a really powerful responsive grid system, available  on almost every kind of devices and browsers, such as mobiles devices (Android, iOs, ...).
- FontAwesome: Font Awesome is a nice-looking css library to use glyphicons in a website. It is also developped under the MIT license.
- ChartJS: ChartJS is a simple and powerful javascript toolkit to render charts with canvas in webpages, developped and available under the MIT license.
- jQuery: jQuery is a famous open source Javascript library.
- Bootbox: Bootbox is a js library for custom alert boxes using the css framework Bootstrap 3.0

Implementation
--------------

The application should be implemented using PhP script to interact with a RESTful API, used to generate the json. The authentication is based on a token system, which grant the access to the web services and the data specific for all customers.

Acknowledgements
----------------

Many thanks to [Frederik Nakstad](https://github.com/fnakstad) and the help he provided with his [tutorial of authentification with AngularJS](https://github.com/fnakstad/angular-client-side-auth).

Warnings
--------

This application has been developped for a precise kind of use. You will have to change the ajax function to fetch the data on the right servers. 

License
-------

The MIT License (MIT)

Copyright (c) 2015 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
