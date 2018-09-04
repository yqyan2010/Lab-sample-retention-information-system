//--JavaScript Functions-------------------------------------------
//--Author: Yunqi Y.------------
//--Purpose: Used for sample storage web application----------

//--- Find sample information ------
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
    document.getElementById('checkinouthistory').innerHTML="";
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
  },'json');
  $.post('int_chain_findsample4.php',object,function(data) {
    $('#showsetstorage').empty().append(data);
  });
  displaytable();
  displaycheckouthistory(casenumber);
  displaycheckinhistory(casenumber);
} catch (err) {
  document.getElementById('findsample_notice').innerHTML = err.message;
  }
}

//--- Set storage location ------
function setstorage() {
  var casenumber=document.getElementById('casenumber').value;
  var loginstaffinitial=localStorage.getItem('staffinitial');
  var storage = document.getElementById('storagelocation').value;
  if (storage == null || storage == '') {
    alert('Set a storage location.');
  }
  else {
    object={casenumber:casenumber,
            loginstaffinitial:loginstaffinitial,
            storage:storage};
    //$('#resultstorage').load('int_chain_setstorage.php');
    $.ajax({
      type:'POST',
      url:'int_chain_setstorage.php',
      data:object,
      success:function(data){
        $('#showsetstorage').empty().append(data);
      }
    });
  }
}
//--- Do check in and check out--------
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

function displaycheckouthistory(val){
  //Build the function to populate each cell
  var object={casenumber:val};
  var table=document.getElementById('checkinouttable');
  var tbody=table.getElementsByTagName('tbody')[0];
  var rows=tbody.getElementsByTagName('tr');
  function enter_table_cell(row_index,col_index,val) {
    var row=rows[row_index];
    var cells=row.getElementsByTagName('td');
    var cell=cells[col_index];
    cell.innerHTML=val;
  }
  //Ajax call to retrieve checkout data
  try {
  $.ajax({
    type:'POST',
    dataType:'json',
    url:'getcheckout.php',
    data:object,
    success:function(data){
      var num_out=Object.keys(data).length; //returns number of checkout history
      for (i=0;i<num_out;i++) {
        var row_index=i+1;
        var id='id'+row_index.toString();
        var samplecase=data[i]['sample_case'];
        var checkoutdate=data[i]['checkoutdate'];
        var checkouttime=data[i]['checkouttime'];
        var checkoutby=data[i]['checkoutby'];
        enter_table_cell(row_index,0,samplecase);
        enter_table_cell(row_index,1,checkoutdate);
        enter_table_cell(row_index,2,checkouttime);
        enter_table_cell(row_index,3,checkoutby);
      }
    }
  })
  } catch (err) {
    document.getElementById('findsample_notice').innerHTML = err.message;
  };
}

function displaycheckinhistory(val){
  //Build the function to populate each cell
  var object={casenumber:val};
  var table=document.getElementById('checkinouttable');
  var tbody=table.getElementsByTagName('tbody')[0];
  var rows=tbody.getElementsByTagName('tr');
  function enter_table_cell(row_index,col_index,val) {
    var row=rows[row_index];
    var cells=row.getElementsByTagName('td');
    var cell=cells[col_index];
    cell.innerHTML=val;
  }
  //Ajax call to retrieve checkout data
  try {
  $.ajax({
    type:'POST',
    dataType:'json',
    url:'getcheckin.php',
    data:object,
    success:function(data){
      var num_out=Object.keys(data).length; //returns number of checkout history
      for (i=0;i<num_out;i++) {
        var row_index=i;
        //var id='id'+row_index.toString();
        var samplecase=data[i]['sample_case'];
        var checkindate=data[i]['checkindate'];
        var checkintime=data[i]['checkintime'];
        var checkinby=data[i]['checkinby'];
        enter_table_cell(row_index,0,samplecase);
        enter_table_cell(row_index,4,checkindate);
        enter_table_cell(row_index,5,checkintime);
        enter_table_cell(row_index,6,checkinby);
      }
    }
  })
  } catch (err) {
    document.getElementById('findsample_notice').innerHTML = err.message;
  };
}
