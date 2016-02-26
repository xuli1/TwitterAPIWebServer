============================================================
Sample Django and AngularJs project for querying Twitter API
============================================================

------------
Introduction
------------
This is a demo web application which allow user to query `Twitter API`_ to find specific Twitter ID and then find the latest Tweet associated with the specific Twitter ID

Web application demo at `demo`_

.. _`Twitter API`: https://dev.twitter.com/rest/public
.. _`demo`: FIXME

Python Django framework provide server back-end:

- performs Twitter API application-only authentication
- process HTTP request from user
- query Twitter API based on user request
- send HTTP response which include Twitter API response data

AngularJs 1 library provide client-side AJAX capability

Bootstrap css is used for HTML styling

If Twitter API does not require end-point authentication, then client web-page can use Angular Js to directly query Twitter API.
But with authentication requirement, a Django server is required as an authenticated end-point, which forward Twitter API query and return response

-----------
Requirement
-----------
This web app requires:

- `TwitterAPI wrapper python package`_ for providing wrapper function to access Twitter API
- Python Django framework v1.7

.. _`TwitterAPI wrapper python package`: https://github.com/geduldig/TwitterAPI 

----------------------------
Running web app for yourself
----------------------------
Ensure Python virtualenv package is installed ::

   $ virtualenv myApp
   $ cd myApp
   $ source bin/activate

above create virtual env and enters virtual env ::

   (myApp) $ git clone --depth 1 https://github.com/xuli1/TwitterAPIWebServer.git

create local project repository ::

   (myApp) $ cd TwitterAPIWebServer
   (myApp) $ pip install -r requirements.txt

add valid CONSUMER_KEY and CONSUMER_SECRET in twitterApp/auth.py.rename and rename auth.py.rename to auth.py

run local web server ::

   (myApp) $ python manage.py runserver

visit site at http://127.0.0.1:8000/

-------------------
Directory Structure
-------------------

:: 

   twitterApi/                      Django project directory
      settings.py                   INSTALLED_APPS need to include 'twitterApp'
      urls.py                       configure root url router, such that twitterApp/ url are handled by 'twitterApp'

   twitterApp/                      'twitterApp' Django app directory
      docs/                         Sphinx reStructuredText doc for 'twitterApp'

      static/twitterApp
         twitterApp.js              AngularJs javacript function for providing AJAX behaviour to web page

      templates/twitterApp          template files by Django to generate html

      test/protractor               web end-to-end test using Protractor library
         basic.js                   Protractor end-to-end direct test
         conf.js                    configuration for Protractor

      auth.py.rename                must rename to auth.py and include valid Twitter consumer keys
      urls.py                       'twitterApp' url router
      views.py                      'twitterApp' HTTP response generator

-----
Tests
-----

``basic.js`` in ``test/protractor`` is end-to-end web client `Protractor`_ test, which verify basic functionality for this web app.
In particular, test check ABC News Twitter ID can be found and latest tweet from ABC can be received and displayed

To run test, follow install instruction at `Protractor`_ website.
Then in ``test/protractor`` dir, ::

   $ webdriver-manager start
   $ protractor conf.js

.. _`Protractor`: http://angular.github.io/protractor/#/

-----
Notes
-----

Feel free to modify and reuse this demo project for your own use.  

Important notes for getting this app to work:

- ``auth.py.rename`` must be renamed to ``auth.py`` and valid Twitter consumer keys must be entered
- ``twitterApp.js`` make AJAX request to hard-coded relative url 'twitterApp/queryTwitterApi'.  If url router is changed, the javascript must also be accordingly modified
