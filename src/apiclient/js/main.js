$('#tokenURL').val('https://josh.auth.us-east-1.amazoncognito.com/oauth2/token');
$('#clientID').val('a8c1d38vkr6q06bpuka7kt2ih');
$('#clientSecret').val('763rb1jkdgsj4ppf6bjsbiqj3jpc4lele12erlev0m7b53g5687');
$('#apipartners').val('https://84dn9glnh5.execute-api.us-east-1.amazonaws.com/dev/partners');
$('#body1E').val('{"name":"Cherry Company"}');

async function module1EgetToken() {

  var tokenURL = $('#tokenURL').val();
  var clientID = $('#clientID').val();
  var clientSecret = $('#clientSecret').val();

  var response = await getToken(tokenURL, clientID, clientSecret);

  $('#ResponseText1E').val(response);

}

async function module1EgetClientInfo() {

  var apiurl = $('#apipartners').val();
  var requestBody = $('#body1E').val();
  var token = $('#ResponseText1E').val();
  var apitype = 'POST';
  var apikey = 'abcdef';

  $('#getClient1E').attr('disabled', true);

  var response = await sendRequest(apiurl, requestBody, token, apitype, apikey);
  $('#1Epartnerresponse').val(response);

  $('#getClient1E').attr('disabled', false);
}

async function module1FgetToken() {

  var tokenURL = $('#tokenURL1F').val();
  var clientID = $('#clientID1F').val();
  var clientSecret = $('#clientSecret1F').val();

  var tokenURL = $('#tokenURL').val();
  var clientID = $('#clientID').val();
  var clientSecret = $('#clientSecret').val();

  var response = await getToken(tokenURL, clientID, clientSecret);
  $('#ResponseText1F').val(response);

}

async function module1FgetCustomizations() {

  var apiurl = $('#apicustomizations').val();
  var requestBody = $('#body1F').val();
  var token = $('#ResponseText1F').val();
  var apitype = $('#methodtype').find(":selected").val();
  var apikey = 'abcdef';

  $('#send1F').attr('disabled', true);

  var response = await sendRequest(apiurl, requestBody, token, apitype, apikey);
  $('#1Fcustomresponse').val(response);

  $('#send1F').attr('disabled', false);
}

async function module3BgetToken() {

  var tokenURL = $('#tokenURL3B').val();
  var clientID = $('#clientID3B').val();
  var clientSecret = $('#clientSecret3B').val();

  var tokenURL = $('#tokenURL').val();
  var clientID = $('#clientID').val();
  var clientSecret = $('#clientSecret').val();

  var response = await getToken(tokenURL, clientID, clientSecret);
  $('#ResponseText3B').val(response);

}

async function module3BgetCustomizations() {

  var apiurl = $('#apicustomizations3B').val();
  var requestBody = $('#body3B').val();
  var token = $('#ResponseText3B').val();
  var apitype = $('#methodtype3B').find(":selected").val();
  var apikey = 'abcdef';

  $('#send3B').attr('disabled', true);

  var response = await sendRequest(apiurl, requestBody, token, apitype, apikey);
  $('#3Bcustomresponse').val(response);

  $('#send3B').attr('disabled', false);
}

async function module3CgetToken() {

  var tokenURL = $('#tokenURL3C').val();
  var clientID = $('#clientID3C').val();
  var clientSecret = $('#clientSecret3C').val();

  var tokenURL = $('#tokenURL').val();
  var clientID = $('#clientID').val();
  var clientSecret = $('#clientSecret').val();

  var response = await getToken(tokenURL, clientID, clientSecret);
  $('#ResponseText3C').val(response);
}

async function module3CgetCustomizations() {

  var apiurl = $('#apicustomizations3C').val();
  var requestBody = '';
  var token = $('#ResponseText3C').val();
  var apitype = $('#methodtype3C').find(":selected").val();
  var apikey = 'abcdef';

  $('#send3C').attr('disabled', true);

  var response = await sendRequest(apiurl, requestBody, token, apitype, apikey);
  $('#3Ccustomresponse').val(response);

  $('#send3C').attr('disabled', false);

}

async function module3DgetToken() {

  var tokenURL = $('#tokenURL3D').val();
  var clientID = $('#clientID3D').val();
  var clientSecret = $('#clientSecret3D').val();

  var tokenURL = $('#tokenURL').val();
  var clientID = $('#clientID').val();
  var clientSecret = $('#clientSecret').val();

  var response = await getToken(tokenURL, clientID, clientSecret);
  $('#ResponseText3D').val(response);
}

async function module3DgetCustomizations() {

  var apiurl = $('#apicustomizations3D').val();
  var requestBody = '';
  var token = $('#ResponseText3D').val();
  var apitype = $('#methodtype3D').find(":selected").val();
  var apikey = 'abcdef';

  $('#send3D').attr('disabled', true);

  var response = await sendRequest(apiurl, requestBody, token, apitype, apikey);
  $('#3Dcustomresponse').val(response);

  $('#send3D').attr('disabled', false);
}

async function module3EgetToken() {

  var tokenURL = $('#tokenURL3E').val();
  var clientID = $('#clientID3E').val();
  var clientSecret = $('#clientSecret3E').val();

  var tokenURL = $('#tokenURL').val();
  var clientID = $('#clientID').val();
  var clientSecret = $('#clientSecret').val();

  var response = await getToken(tokenURL, clientID, clientSecret);
  $('#ResponseText3E').val(response);
}

async function module3EgetCustomizations() {

  var apiurl = $('#apicustomizations3E').val();
  var requestBody = '';
  var token = $('#ResponseText3E').val();
  var apitype = $('#methodtype3E').find(":selected").val();
  var apikey = 'abcdef';

  $('#send3E').attr('disabled', true);

  var response = await sendRequest(apiurl, requestBody, token, apitype, apikey);
  $('#3Ecustomresponse').val(response);

  $('#send3E').attr('disabled', false);
}

async function module5getToken() {

  var tokenURL = $('#tokenURL5').val();
  var clientID = $('#clientID5').val();
  var clientSecret = $('#clientSecret5').val();

  var tokenURL = $('#tokenURL').val();
  var clientID = $('#clientID').val();
  var clientSecret = $('#clientSecret').val();

  var response = await getToken(tokenURL, clientID, clientSecret);
  $('#ResponseText5').val(response);
}

async function module5getCustomizations() {

  var apiurl = $('#apicustomizations5').val();
  var requestBody = $('#body5').val();
  var token = $('#ResponseText5').val();
  var apitype = $('#methodtype5').find(":selected").val();
  var apikey = 'abcdef';

  $('#send5').attr('disabled', true);

  var response = await sendRequest(apiurl, requestBody, token, apitype, apikey);
  $('#5customresponse').val(response);

  $('#send5').attr('disabled', false);

}

async function module5BgetToken() {

  var tokenURL = $('#tokenURL5B').val();
  var clientID = $('#clientID5B').val();
  var clientSecret = $('#clientSecret5B').val();

  var tokenURL = $('#tokenURL').val();
  var clientID = $('#clientID').val();
  var clientSecret = $('#clientSecret').val();

  var response = await getToken(tokenURL, clientID, clientSecret);
  $('#ResponseText5B').val(response);
}

async function module5BgetCustomizations() {

  var apiurl = $('#apicustomizations5B').val();
  var requestBody = $('#body5B').val();
  var token = $('#ResponseText5B').val();
  var apitype = $('#methodtype5B').find(":selected").val();
  var apikey = 'abcdef';

  $('#send5B').attr('disabled', true);

  var response = await sendRequest(apiurl, requestBody, token, apitype, apikey);
  $('#5Bcustomresponse').val(response);

  $('#send5B').attr('disabled', false);

}

async function module9CgetToken() {

  var tokenURL = $('#tokenURL9C').val();
  var clientID = $('#clientID9C').val();
  var clientSecret = $('#clientSecret9C').val();

  var tokenURL = $('#tokenURL').val();
  var clientID = $('#clientID').val();
  var clientSecret = $('#clientSecret').val();

  var response = await getToken(tokenURL, clientID, clientSecret);
  $('#ResponseText9C').val(response);
}

async function module9CgetCustomizations() {

  var apiurl = $('#apicustomizations9C').val();
  var requestBody = $('#body9C').val();
  var token = $('#ResponseText9C').val();
  var apitype = $('#methodtype9C').find(":selected").val();
  var apikey = $('#apikey9C').val();

  $('#send9C').attr('disabled', true);

  var response = await sendRequest(apiurl, requestBody, token, apitype, apikey);
  $('#9Ccustomresponse').val(response);

  $('#send9C').attr('disabled', false);

}

async function module9EgetToken() {

  var tokenURL = $('#tokenURL9E').val();
  var clientID = $('#clientID9E').val();
  var clientSecret = $('#clientSecret9E').val();

  var tokenURL = $('#tokenURL').val();
  var clientID = $('#clientID').val();
  var clientSecret = $('#clientSecret').val();

  var response = await getToken(tokenURL, clientID, clientSecret);
  $('#ResponseText9E').val(response);
}

async function module9EgetCustomizations() {

  var apiurl = $('#apicustomizations9E').val();
  var requestBody = $('#body9E').val();
  var token = $('#ResponseText9E').val();
  var apitype = $('#methodtype9E').find(":selected").val();
  var apikey = $('#apikey9E').val();

  $('#send9E').attr('disabled', true);

  var response = await sendRequest(apiurl, requestBody, token, apitype, apikey);
  $('#9Ecustomresponse').val(response);

  $('#send9E').attr('disabled', false);

}

async function module10getToken() {

  var tokenURL = $('#tokenURL10').val();
  var clientID = $('#clientID10').val();
  var clientSecret = $('#clientSecret10').val();

  var tokenURL = $('#tokenURL').val();
  var clientID = $('#clientID').val();
  var clientSecret = $('#clientSecret').val();

  var response = await getToken(tokenURL, clientID, clientSecret);
  $('#ResponseText10').val(response);
}

async function module10getCustomizations() {

  var apiurl = $('#apicustomizations10').val();
  var requestBody = '';
  var token = $('#ResponseText10').val();
  var apitype = $('#methodtype10').find(":selected").val();
  var apikey = 'abcdef';

  $('#send10').attr('disabled', true);

  var request = await sendRequest(apiurl, requestBody, token, apitype, apikey);
  $('#10customresponse').val(request);

  $('#send10').attr('disabled', false);

}

async function module10CgetToken() {

  var tokenURL = $('#tokenURL10C').val();
  var clientID = $('#clientID10C').val();
  var clientSecret = $('#clientSecret10C').val();

  var tokenURL = $('#tokenURL').val();
  var clientID = $('#clientID').val();
  var clientSecret = $('#clientSecret').val();

  var response = await getToken(tokenURL, clientID, clientSecret);
  $('#ResponseText10C').val(response);
}

async function module10CgetCustomizations() {

  var apiurl = $('#apicustomizations10C').val();
  var token = $('#ResponseText10C').val();
  var requestBody = $('#body10C').val();
  var apitype = $('#methodtype10C').find(":selected").val();
  var apikey = 'abcdef';

  $('#send10C').attr('disabled', true);

  var response = await sendRequest(apiurl, requestBody, token, apitype, apikey);
  $('#10Ccustomresponse').val(response);

  $('#send10C').attr('disabled', false);

}

async function getToken(tokenURL, clientID, clientSecret) {

  return await $.ajax({
    url: tokenURL,
    crossDomain: true,
    type: 'POST',
    data: {
      grant_type: 'client_credentials',
      client_id: clientID,
      client_secret: clientSecret
    },
    dataType: 'json'
  })
  .then(function (data) {
      return data.access_token.toString();
    })
  .catch(function (data) {
      return JSON.stringify(data, null, 4);
    });
}

async function sendRequest(apiurl, requestBody, token, apitype, apikey) {

  return await $.ajax({
    url: apiurl,
    crossDomain: true,
    type: apitype,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
      'x-api-key': apikey
    },
    data: requestBody,
    dataType: 'json'
  })
  .then(function (data) {
      return JSON.stringify(data, null, 4);
    })
  .catch(function (data) {
      return JSON.stringify(data, null, 4);
    });
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

jQuery('#BaseURL').on('input', function () {
  $('#apipartners').val($('#BaseURL').val() + 'partners');
  $('#apicustomizations').val($('#BaseURL').val() + 'customizations');
  $('#apicustomizations3B').val($('#BaseURL').val() + 'customizations');
  $('#apicustomizations3C').val($('#BaseURL').val() + 'customizations');
  $('#apicustomizations3D').val($('#BaseURL').val() + 'customizations');
  $('#apicustomizations3E').val($('#BaseURL').val() + 'customizations');
  $('#apicustomizations5').val($('#BaseURL').val() + 'customizations');
  $('#apicustomizations5B').val($('#BaseURL').val() + 'customizations');
  $('#apicustomizations9C').val($('#BaseURL').val() + 'socks');
  $('#apicustomizations9E').val($('#BaseURL').val() + 'socks');
  $('#apicustomizations10').val($('#BaseURL').val() + 'customizations');
  $('#apicustomizations10C').val($('#BaseURL').val() + 'customizations');
});

jQuery('#tokenURL').on('input', function () {
  $('#tokenURL1F').val($('#tokenURL').val());
  $('#tokenURL3B').val($('#tokenURL').val());
  $('#tokenURL3C').val($('#tokenURL').val());
  $('#tokenURL3D').val($('#tokenURL').val());
  $('#tokenURL3E').val($('#tokenURL').val());
  $('#tokenURL5').val($('#tokenURL').val());
  $('#tokenURL5B').val($('#tokenURL').val());
  $('#tokenURL9C').val($('#tokenURL').val());
  $('#tokenURL9E').val($('#tokenURL').val());
  $('#tokenURL10').val($('#tokenURL').val());
  $('#tokenURL10C').val($('#tokenURL').val());
});

$('#methodtype').change(function () {
  $('#body1F').val('');
});

$('#methodtype3B').change(function () {
  $('#body3B').val('');
});

$('#methodtype10C').change(function () {
  $('#body10C').val('');
});

$('#clientID1F').change(function () {
  $('#clientID3B').val($('#clientID1F').val());
  $('#clientID3C').val($('#clientID1F').val());
  $('#clientID3D').val($('#clientID1F').val());
  $('#clientID3E').val($('#clientID1F').val());
  $('#clientID5').val($('#clientID1F').val());
  $('#clientID5B').val($('#clientID1F').val());
  $('#clientID9C').val($('#clientID1F').val());
  $('#clientID9E').val($('#clientID1F').val());
  $('#clientID10').val($('#clientID1F').val());
  $('#clientID10C').val($('#clientID1F').val());
});

$('#clientSecret1F').change(function () {
  $('#clientSecret3B').val($('#clientSecret1F').val());
  $('#clientSecret3C').val($('#clientSecret1F').val());
  $('#clientSecret3D').val($('#clientSecret1F').val());
  $('#clientSecret3E').val($('#clientSecret1F').val());
  $('#clientSecret5').val($('#clientSecret1F').val());
  $('#clientSecret5B').val($('#clientSecret1F').val());
  $('#clientSecret9C').val($('#clientSecret1F').val());
  $('#clientSecret9E').val($('#clientSecret1F').val());
  $('#clientSecret10').val($('#clientSecret1F').val());
  $('#clientSecret10C').val($('#clientSecret1F').val());
});