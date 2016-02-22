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

-----------
Requirement
-----------
This web app requires:

- `TwitterAPI wrapper python package`_ for providing wrapper function to access Twitter API
- Python Django framework v1.7

.. _`TwitterAPI wrapper python package`: https://github.com/geduldig/TwitterAPI 

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

      auth.py.rename                must rename to auth.py and include valid Twitter consumer keys
      urls.py                       'twitterApp' url router
      views.py                      'twitterApp' HTTP response generator

-----
Notes
-----

Feel free to modify and reuse this demo project for your own use.  

Important notes for getting this app to work:

- ``auth.py.rename`` must be renamed to ``auth.py`` and valid Twitter consumer keys must be entered
- ``twitterApp.js`` make AJAX request to hard-coded relative url 'twitterApp/queryTwitterApi'.  If url router is changed, the javascript must also be accordingly modified
