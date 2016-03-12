# hsbc-scraper

:bangbang: WARNING :bangbang:
=============================

**BEWARE, THIS LOADS REMOTE CODE WHICH CAN ACCESS YOUR BANK RECORDS**

**USE AT YOUR OWN RISK**

The bookmarklet pulls in https://medialab.github.io/artoo/public/dist/artoo-latest.min.js
and runs code in your browser to download the data. Make sure you read all the
code and make sure you trust it before using

I wrote this for my own purpose and it is insecure as hell if you dont fully
understand it.

Description
-----------

Just enough of a bookmarklet to scrape the hsbc.co.uk website and download my
transaction data.

It would be fantastic if HSBC would allow more than the previous month to be
downloaded in a usable format but all they provide is a PDF. When they provide a
decent api to your data this will not be needed. 


Bookmarklet information:
https://support.mozilla.org/en-US/kb/bookmarklets-perform-common-web-page-tasks


Usage
-----

Install the dependencies

    npm install

Build the bookmarklet code

    gulp

Create a blank bookmark in you bookmarks toolbar and call it something like
`HSBC Scraper` and then in the **Location** field put the javascript code from 
`./build/hsbc-scraper.bookmark.prod.js`

Log into your internet banking and go to previous-statements. Select a statement
and when you can see the transactions click on your bookmarklet. If all goes
well you should be prompted to download a file called
`accountnumber_YYYY-MM-DD.json`



