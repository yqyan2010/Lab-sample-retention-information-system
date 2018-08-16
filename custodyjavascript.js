//--FUNCTIONS down--------------------------------------------
//Ajax call to find customer and staff list from database up front
function getlistupfront (value) {
  var object={userinput:value};
  $.post( 'int_chain_getfromdb_upfront.php',object,function(data) {
    console.log('loading list');
    //Create options for customer list
    try {
      var select = document.getElementById(value);
      var selectelement = document.createElement("select");
      selectelement.id = value+"list";
      selectelement.name = value+"list";
      selectelement.style = "font-size:16px";
      select.appendChild(selectelement);
      $.each(data,function(key,val) {
        var option = document.createElement("option");
        option.text=key;
        option.value=key;
        selectelement.appendChild(option);
      })
    }
    catch (err) {
      document.getElementById('message').innerHTML = err.message;}
  },'json').error( function() {
    $('#message').css('background-color', 'red');
    alert("Error.");
    })
}

function dateoftoday () {
  var today=new Date ();
  var dd=today.getDate();
  var mm=today.getMonth()+1;//Jan is 0
  var yyyy=today.getFullYear();
  if (dd<10) {
    dd="0"+dd;
  }
  if (mm<10) {
    mm="0"+mm;
  }
  todaydate=mm+"/"+dd+"/"+yyyy;
  document.getElementById('sample_receiving_date').defaultValue=todaydate;
  window.console && console.log("Found today's date.");
}

function submittodbtest () {
  window.console && console.log('Submitting sample receiving data to database.');
  //--- Below saves user inputs into cookies ---------------------
  try {
    // --- Define variables the user inputs---------------------
    var casenumber = document.getElementById('casenumber').value;
    var received_initial = document.getElementById('staffinitiallist').value;
    var customer = document.getElementById('customerlist').value;
    var description = document.getElementById('description').value;
    var lotnumber = document.getElementById('lotnumber').value;
    var multi_sample_choice = document.form1.multi_sample.value;
    var deliver_method = document.form1.deliverymethod.value;
    var receive_condition = document.form1.received_condition.value;
    var storage_condition =document.form1.storagecondition.value;
    var storage=document.form1.defaultstorage.value;
    var notes = document.form1.notes.value;
    var testdeptchecked=[];
    var deliveredtochecked=[];
    var specialchecked=[];
    var testdept=document.getElementsByName('testdepartment');
      for (var i=0; i<testdept.length; i++) {
        if (testdept[i].checked) {
          testdeptchecked.push(testdept[i].value);
        }
      }
    var deliveredto=document.getElementsByName('deliveredto');
      for (var i=0; i<deliveredto.length; i++) {
        if (deliveredto[i].checked) {
          deliveredtochecked.push(deliveredto[i].value);
        }
      }
    var special=document.getElementsByName('specialinstance');
      for (var i=0; i<special.length; i++) {
        if (special[i].checked) {
          specialchecked.push(special[i].value);
        }
      }
    //--- Save user inputs as an objects and submit objects to php later via AJAX calll ---
    var object={casenumber:casenumber,
                received_initial:received_initial,
                customer:customer,
                description:description,
                lotnumber:lotnumber,
                multi_sample_choice:multi_sample_choice,
                deliver_method:deliver_method,
                receive_condition:receive_condition,
                storage_condition:storage_condition,
                storage:storage,
                notes:notes,
                testdeptchecked:testdeptchecked.toString(), //convert arrays to strings
                deliveredtochecked:deliveredtochecked.toString(),
                specialchecked:specialchecked.toString()
              };
} catch (err) {
  document.getElementById('message').innerHTML=err.message;}
  $.post('int_chain_samplereceiving_submit.php',object,function(data) {
    $('#message').empty().append(data);
    }
  ).error( function() {
    $('#message').css('background-color', 'red');
    lert("Error.");
  })
}

function remove(value) {
  var inputtextid=["received_date","casenumber","staff_initial","customer","sample_description","lotnumber","notes","ambientlocation","coldlocation","storagelocationinitial"];
  var inputradioid=["yes","no","Walkin_Courier","Dropbox","UPS","FedEx","USPS","Acceptable","Broken","Leaking","Ambient","Frozen","Cold","storageambient","storagecold"];
  var inputcheckboxid=["Potability","Shelflife","Swab","NWpet","Wastewater","t_microbiology","t_chemistry","t_metals","t_labelclaim","t_allergens","t_pesticides","d_microbiology","d_chemistry","d_metals","d_labelclaim","d_allergens","d_pesticides","d_storage","d_other"];
  if (value="all") {
    for (i=0;i<inputtextid.length;i++) {
      document.getElementById(inputtextid[i]).value="";
    }
    for (i=0;i<inputradioid.length;i++) {
      document.getElementById(inputradioid[i]).checked=false;
    }
    for (i=0;i<inputcheckboxid.length;i++) {
      document.getElementById(inputcheckboxid[i]).checked=false;
    }
  }
  else if (inputtextid.indexOf(value)>-1) {
    document.getElementById(value).value="";
  }
  else if (inputradioid.indexOf(value)>-1) {
    document.getElementById(value).checked=false;
  }
  else if (inputcheckboxid.indexOf(value)>-1) {
    document.getElementById(value).checked=false;
  }
  else {
    console.log("Can't run remove function, values entered not valid.");
  }
}

function findsample() {
  var casenumber=document.getElementById('casenumber').value;
  var object={casenumber:casenumber};
  remove('all');
  try{
  $.post('int_chain_findsample1.php',object,function(data) {
    $.each(data,function(key,val) {
      document.getElementById(key).value=val;
    })
  },'json').error( function() {
    alert("Error.");
  });
  $.post('int_chain_findsample2.php',object,function(data) {
    $.each(data,function(key,val) {
      document.getElementById(key).checked=true;
    })
  },'json');
  $.post('int_chain_findsample3.php',object,function(data) {
    $.each(data,function(key,val) {
      if (val!="") {
        document.getElementById(val).checked=true;
      }
    })
  },'json')
} catch (err) {
  document.getElementById('findsample_notice').innerHTML = err.message;
  }
}

function validatestafflogin() {
  console.log('Login');
  try {
    var staff = document.getElementById('staffinitialfulllist').value.split(" ");
    var staffinitial=staff[0];
    var stafffull=staff[1];
    if (staffinitial == null || staffinitial == 'NA') {
      document.getElementById('message').innerHTML = 'Staff needs to be selected.';
      return false;
    }
    else {
      localStorage.setItem('staffinitial',staffinitial);
      localStorage.setItem('stafffull',stafffull);
      window.location='samplestorage.html';
      return true;
    }
  }
  catch (err) {
    document.getElementById('message').innerHTML = err.message;
  }
}

function welcome() {
  var loginstaff=localStorage.getItem('stafffull');
  if (loginstaff) {
    document.getElementById('loginstaff').innerHTML=loginstaff;
  }
  else {
    window.location.href="login.html";
  }
}

function logout() {
  window.console && console.log('Logging out');
  localStorage.removeItem('stafffull');
  localStorage.removeItem('staffinitial');
  //localStorage.removeItem('password');
  alert ("Succesfully logged out. Going back to login page.")
  window.location.href = "login.html";
}

function timeout() {
  localStorage.removeItem('stafffull');
  localStorage.removeItem('staffinitial');
  //localStorage.removeItem('password');
  alert ("Your session times out. Going back to the login page.")
  window.location.href = "login.html";
}

// Check in and check out operation
function checkin() {
    window.console && console.log('Checking in')
    var casenumber=document.getElementById('casenumber').value;
    var loginstaffinitial=localStorage.getItem('staffinitial');
    var object={casenumber:casenumber,
                loginstaffinitial:loginstaffinitial}
    $.post( 'int_chain_checkin.php',object,
    function( data ) {
        $('#checkinmsg').empty().append(data);
      }
    ).error( function() {
      $('#checkinmsg').css('background-color', 'red');
      alert("Error.");
  });
}

function checkout() {
    window.console && console.log('Checking out')
    var casenumber=document.getElementById('casenumber').value;
    var loginstaffinitial=localStorage.getItem('staffinitial');
    var object={casenumber:casenumber,
                loginstaffinitial:loginstaffinitial}
    $.post( 'int_chain_checkout.php',object,
    function( data ) {
        $('#checkoutmsg').empty().append(data);
      }
    ).error( function() {
      $('#checkoutmsg').css('background-color', 'red');
      alert("Error.");
  });
}

// Get the check in and out history and display them
function displaytable(){
  //Create header objects -- keys are header id
  var headerobj={samplecase:"Sample Case",
                checkoutdate:"Check Out Date",
                checkouttime:"Check Out Time",
                checkoutby:"Check out By",
                checkindate:"Check In Date",
                checkintime:"Check In Time",
                checkinby:"Check In By"};
  var place=document.getElementById('checkinouthistory');
  //Create table elements
  var table=document.createElement('table');
  table.setAttribute('id','checkinouttable');
  table.setAttribute('name','checkinouttable');
  table.setAttribute('border',1);
  var thead=document.createElement('thead');
  var tbody=document.createElement('tbody');
  //Create table head
  table.appendChild(thead);
  for(var i=0;i<Object.keys(headerobj).length;i++){
    var th=document.createElement('th');
    th.id=Object.keys(headerobj)[i];
    var content=headerobj[Object.keys(headerobj)[i]];
    thead.appendChild(th).appendChild(document.createTextNode(content));
  }
  //Create table tbody
  for (i=0;i<10;i++) { //create 10 rows
    var tr=document.createElement('tr');
    for (j=0;j<Object.keys(headerobj).length;j++) {//each row has 7 columns
      var td=document.createElement('td');
      td.textContent="";
      td.setAttribute('height','25');
      tr.appendChild(td);
    }
  tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  //Create table in html
  place.appendChild(table);
} // Just to display the table, no contents

function getcheckinouttable() {
  $.post('getcheckout.php',function(data){
    $('#checkouttable').empty().append(data);
  });
  $.post('getcheckin.php',function(data){
    $('#checkintable').append(data);
  });
}

function displaycheckinouthistory(){
  //Build the function to populate each cell
  var table=document.getElementById('checkinouttable');
  var tbody=table.getElementsByTagName('tbody')[0];
  var rows=tbody.getElementsByTagName('tr');
  function populate_checkout_row(index) {
    var row=rows[index];
    var cells=row.getElementsByTagName('td');
    var samplecase_cell=cells[0];
    var checkoutdate_cell=cells[1];
    var checkouttime_cell=cells[2];
    var checkoutby_cell=cells[3];

  }
  //Ajax call to retrieve checkout data
  try {
  $.ajax({
    type:'POST',
    dataType:'json',
    url:'getcheckout.php',
    success:function(data){
      var number=Object.keys(data).length;
      for (i=0;i<number;i++) {
        row_index=i+1;
        var first=data.id1['sample_case'];
        console.log(length);
        $('#test').append(first);
        $('#test').append('End.');
      }
    }
  })
  } catch (err) {
    document.getElementById('findsample_notice').innerHTML = err.message;
  };
}
//Timeout sessions
function IdleTimer () {
  window.onload=resetTimer;
  window.onmousemove=resetTimer;//catches mouse movement
  window.onmousedown=resetTimer;//cathces mouse movement
  window.onclick=resetTimer;
  window.onscroll=resetTimer;
  window.onkeypress=resetTimer;
}

function resetTimer () {
  if (typeof t != "undefined") {
  clearTimeout(t);
  }
  t=setTimeout(timeout,600000);
}
