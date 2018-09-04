//---JavaScript Functions---------------
//---Author: Yunqi Y.--------
//---Purpose: Submit sample information to database upon receiving---

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
