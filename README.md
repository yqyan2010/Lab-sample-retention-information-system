# Sample-retention-information-system
Purpose: It allows users to enter/edit/view sample information on a website (web is considered an interactive user interface.)

Applications:
1) Enter sample information upon receiving -- samplereceiving.html
2) Check in and check out sample from retention -- samplestorage.html
3) Track sample chain of custody history -- through samplestorage.html

Languages used:
HTML, JavaScript (JQuery), PHP, MySQL database
HTML files render the user web view. Clicking buttons in HTML calls javascript functions. Within javascript functions it has ajax call to PHP functions to access MySQL database.

Description of Files
--HTML files:
  1) login.html -- the login page (next step: implement password requirement)
  
  2) samplestorage.html -- used to find sample information, current sample status, check in and check out samples (contains most applications)
  
  3) samplereceiving.html -- used to enter sample information (name, lot number, storage, test) upon receiving the sample

--JS files:
  1) custodyjavascript.js -- contains js functions that are used accross all HTML files
  
  2) login.js -- used mainly in login.html
  
  3) samplestorage.js -- used mainly in samplestorage.html (this contains most js functions)
  
  4) samplereceiving -- used mainly in samplereceiving.html
  
  2) resourcejquery.min.js -- jquery code borrowed from the generous jquery community

--PHP files:
  1) All php files that are called in js functions to perform back-end database related calculations (next step: working on getcheckout.php and merge all php files into one php because each php files is like a php function)

Notes:
There will be more repositories named Lab_sample_information_system_xxxyyyy (where xxxyyy explains appended functions). These appended repositories contains functionality that I add to this application. 
