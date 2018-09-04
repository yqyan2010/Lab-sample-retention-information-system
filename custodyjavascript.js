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

function timeout() {
  localStorage.removeItem('stafffull');
  localStorage.removeItem('staffinitial');
  //localStorage.removeItem('password');
  alert ("Your session times out. Going back to the login page.")
  window.location.href = "login.html";
}
