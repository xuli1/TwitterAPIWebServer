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

- `TwitterAPI wrapper python package`_
- Python Django framework v1.7

.. _`TwitterAPI wrapper python package`: https://github.com/geduldig/TwitterAPI 
