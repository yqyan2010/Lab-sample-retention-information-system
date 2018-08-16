# Sample-retention-information-system
Purpose: It allows users to enter/edit/view sample information in a interactive user interface (i.e. website) while all sample information and user operation history is saved/processed/calculated via front-end and back-end codes.

Functions:
1) Enter sample information upon receiving
2) Check in and check out sample from retention
3) Track sample chain of custody history

Description:
HTML files:
  1) login.html -- the login page (next step: implement password requirement)
  
  2) samplestorage.html -- used to find sample information, current sample status, check in and check out samples (next step: getting sample check in and out history from database and display them on the website)
  
  3) samplereceiving.html -- used to enter sample information (name, lot number, storage, test) upon receiving the sample

JS files:
  1) custodyjavascript.js -- self-wrritten js functions called from html files
  
  2) resourcejquery.min.js -- jquery code borrowed from the generous jquery community

PHP files:
  1) All php files that are called in js functions to perform back-end database related calculations (next step: working on getcheckout.php and merge all php files into one php because each php files is like a php function)
