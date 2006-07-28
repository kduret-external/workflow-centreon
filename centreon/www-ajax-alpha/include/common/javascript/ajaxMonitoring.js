/**
Oreon is developped with Apache Licence 2.0 :
http://www.apache.org/licenses/LICENSE-2.0.txt
Developped by : Cedrick Facon

The Software is provided to you AS IS and WITH ALL FAULTS.
OREON makes no representation and gives no warranty whatsoever,
whether express or implied, and without limitation, with regard to the quality,
safety, contents, performance, merchantability, non-infringement or suitability for
any particular or intended purpose of the Software found on the OREON web site.
In no event will OREON be liable for any direct, indirect, punitive, special,
incidental or consequential damages however they may arise and even if OREON has
been previously advised of the possibility of such damages.

For information : contact@oreon-project.org
*/
// JavaScript Document

var xhr = null; 
var _adresseRecherche = "./include/monitoring/status/readStatus.php" //l'adresse   interroger pour trouver les suggestions
	 
function getXhr(){
	if(window.XMLHttpRequest) // Firefox et autres
	   xhr = new XMLHttpRequest(); 
	else if(window.ActiveXObject){ // Internet Explorer 
	   try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
	}
	else { // XMLHttpRequest non supportï¿½ par le navigateur 
	   alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest..."); 
	   xhr = false; 
	} 
}

function take_value(_type)
{
	var myArray=new Array();

	j=0
	for(i=0; document.getElementById('host'+i) ;i++)
	{
		myArray[j++] = _documentDiv=document.getElementById('host'+i).innerHTML;
		if(_type == "service" || _type == "service_problem")
			myArray[j++] = _documentDiv=document.getElementById('service'+i).innerHTML;
	}
return myArray;
}

function DelAllLine(i)
{
	for(i; document.getElementById('trStatus'+i) ;i++)
	{
		var _del = document.getElementById('trStatus'+i);
		_del.parentNode.removeChild(_del);
	}
}

function DelOneLine(i)
{
	if(document.getElementById('trStatus'+i))
	{
		var _del = document.getElementById('trStatus'+i);
		_del.parentNode.removeChild(_del);
	}
}

function mk_img(_src, _alt)
{
	var _img = document.createElement("img");
  	_img.src = _src;
  	_img.alt = _alt;
	return _img;
}


function addLineToTab_Service(_tableAjax, line, i, _form){

	var _host = line.getElementsByTagName("host")[0].firstChild.nodeValue;
	var _last_check = line.getElementsByTagName("last_check")[0].firstChild.nodeValue;
	var _last_change = line.getElementsByTagName("last_change")[0].firstChild.nodeValue;
	var _status = line.getElementsByTagName("status")[0].firstChild.nodeValue;
	var _output = line.getElementsByTagName("output")[0].firstChild.nodeValue;
	var _service = line.getElementsByTagName("service")[0].firstChild.nodeValue;
	var _not_en = line.getElementsByTagName("not_en")[0].firstChild.nodeValue;
	var _pb_aknowledged = line.getElementsByTagName("pb_aknowledged")[0].firstChild.nodeValue;
	var _svc_is_flapping = line.getElementsByTagName("svc_is_flapping")[0].firstChild.nodeValue;
	var _order = line.getElementsByTagName("order")[0].firstChild.nodeValue;
	var _retry = line.getElementsByTagName("retry")[0].firstChild.nodeValue;
	var _accept_passive_check = line.getElementsByTagName("accept_passive_check")[0].firstChild.nodeValue;
	var _accept_active_check = line.getElementsByTagName("accept_active_check")[0].firstChild.nodeValue;
	var _ev_handler_en = line.getElementsByTagName("ev_handler_en")[0].firstChild.nodeValue;


	var _ligne = document.createElement('tr');
	_ligne.id = 'trStatus'+ i;
	var ClassName = "list_one";	
	if(i%2)
	{
		ClassName = "list_two";
	}
	_ligne.className = ClassName;



/*
 * checkbox
 */
	var _case_checkbox = document.createElement('td');
	_case_checkbox.className = 'ListColPicker';
	var cbx = document.createElement("input"); 
  	cbx.type = "checkbox";
  	cbx.id = "myCBX";
  	cbx.value = "1";
	_case_checkbox.appendChild(cbx);


/*
 * hostname
 */
	var _case_host = document.createElement('td');
	_case_host.className = 'ListColLeft';

/*
 * service description
 */
	var _case_service = document.createElement('td');
	_case_service.className = 'ListColLeft';

/*
 * actions
 */
	var _case_actions = document.createElement('td');
	_case_actions.className = 'ListColRight';

/*
 * infos
 */
	var _case_infos = document.createElement('td');
	_case_infos.className = 'ListColRight';


/*
 * status
 */
	var _case_status = document.createElement('td');
	_case_status.className = 'ListColCenter';
	switch (_status)
	{
	  case "OK":
	    _case_status.style.backgroundColor = _form.color_OK.value;
	   break;
	  case "WARNING":
	    _case_status.style.backgroundColor = _form.color_WARNING.value;
	   break;
	  case "CRITICAL":
	    _case_status.style.backgroundColor = _form.color_CRITICAL.value;
		_ligne.className = "list_three";
	   break;
	  case "UNDETERMINATED":
	    _case_status.style.backgroundColor = _form.color_UNDETERMINATED.value;
	   break;
	  default:
	    _case_status.style.backgroundColor = _form.color_UNKNOWN.value;
	   break;
	}

/*
 * laste check
 */
	var _case_lastcheck = document.createElement('td');
	_case_lastcheck.className = 'ListColRight';

/*
 * last change
 */
	var _case_time = document.createElement('td');
	_case_time.className = 'ListColRight';

/*
 * retry
 */
	var _case_retry = document.createElement('td');
	_case_retry.className = 'ListColCenter';

/*
 * output
 */
	var _case_output = document.createElement('td');
	_case_output.className = 'ListColNoWrap';

	var _img1 = mk_img(_form.icone_pb_aknowledged.value, "pb_aknowledged");
	var _img2 = mk_img(_form.icone_not_en.value, "notification_enable");
	var _img3 = mk_img(_form.icone_flapping.value, "svc_is_flapping");
	var _img4 = mk_img(_form.icone_accept_passive_check1.value, "accept_passive_check");
	var _img5 = mk_img(_form.icone_accept_passive_check0.value, "accept_active_check");
	var _img6 = mk_img(_form.icone_graph.value, "graph");
	var _img7 = mk_img(_form.icone_undo.value, "re-check");



	if(_pb_aknowledged == 1)
	_case_infos.appendChild(_img1);

	if(_not_en == 0)
	_case_infos.appendChild(mk_img(_form.icone_not_en.value, "notification_enable"));

	if(_svc_is_flapping == 1)
	_case_infos.appendChild(_img3);

	if(_accept_passive_check == 1)
	_case_infos.appendChild(_img5);
	
	if(_accept_active_check == 1)
	_case_infos.appendChild(_img4);

_case_infos.id = 'infos' + i;

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!p!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var _p = 20201;

	var _linkaction_recheck = document.createElement("a");
  	_linkaction_recheck.href = './oreon.php?p=' + _p + '&o=svc&cmd=2&select[' + _host + ':' + _service + ']=1';
	_linkaction_recheck.appendChild(_img7);

	var _linkaction_graph = document.createElement("a"); 
  	_linkaction_graph.href = './oreon.php?p=40207&host_name=' + _host + '&service_description=' + _service + '&submitC=Grapher';
	_linkaction_graph.appendChild(_img6);



//<div class="cachediv" id="service{$c}">{$s.description}</div>



	var _text_host = document.createTextNode(_host);
	var _linkhost = document.createElement("a"); 
  	_linkhost.href = './oreon.php?p=201&o=hd&host_name=' + _host;
	_linkhost.appendChild(_text_host);

	var _divhost = document.createElement("div");
	_divhost.id = 'host'+i;
	_divhost.appendChild(_text_host);



	var _text_service = document.createTextNode(_service);
	var _linkservice = document.createElement("a"); 
  	_linkservice.href = './oreon.php?p=202&o=svcd&host_name=' + _host + '&service_description=' +_service;
	_linkservice.appendChild(_text_service);

	var _divservice = document.createElement("div");
	_divservice.id = 'service'+i;
	_divservice.appendChild(_text_service);


	_case_actions.appendChild(_linkaction_recheck);
	_case_actions.appendChild(_linkaction_graph);
	_case_actions.id = 'action' + i;

	_case_host.appendChild(_divhost);
	_case_host.appendChild(_linkhost);

	_case_service.appendChild(_linkservice);
	_case_service.appendChild(_divservice);




	var _text_status = document.createTextNode(_status);
	var _text_last_check = document.createTextNode(_last_check);
	var _text_last_change = document.createTextNode(_last_change);
	var _text_retry = document.createTextNode(_retry);
	var _text_output = document.createTextNode(_output);



	var _divstatus = document.createElement("div");
	_divstatus.id = 'status'+i;
	_divstatus.appendChild(_text_status);

	_case_status.appendChild(_divstatus);
	
	_case_status.id = 'tdStatus' + i;
	_case_lastcheck.appendChild(_text_last_check);
	_case_lastcheck.id = 'last_check' + i;
	_case_time.appendChild(_text_last_change);
	_case_time.id = 'last_change' + i;
	_case_retry.appendChild(_text_retry);
	_case_retry.id = 'retry' + i;
	_case_output.appendChild(_text_output);
	_case_output.id = 'output' + i;
	 
	_ligne.appendChild(_case_checkbox);
	_ligne.appendChild(_case_host);
	_ligne.appendChild(_case_service);
	_ligne.appendChild(_case_actions);
	_ligne.appendChild(_case_infos);
	_ligne.appendChild(_case_status);
	_ligne.appendChild(_case_lastcheck);
	_ligne.appendChild(_case_time);
	_ligne.appendChild(_case_retry);
	_ligne.appendChild(_case_output);
	
	_tableAjax.appendChild(_ligne);
}


function init(){

	_form=document.getElementById('fsave');
	_time=parseInt(_form.time.value);
	_form.time.value = _time - 1000;

	go();
}

function go(){
	// ici je recupere les couples host/service affichÃ© sur ma page
	
	_form=document.getElementById('fsave');		       
	_form.len.value = parseInt(_form.len.value) + 1;
	_slastreload = parseInt(_form.slastreload.value);
	_smaxtime = parseInt(_form.smaxtime.value);
	_time=parseInt(_form.time.value);
	_sid=_form.sid.value;
	_type=_form.type.value;
	_version=_form.version.value;
	_lca=_form.lca.value;
	_fileStatus=_form.fileStatus.value;
	_fileOreonConf=_form.fileOreonConf.value;
	_limit=_form.limit.value;
	_search=_form.search.value;
	_num=_form.num.value;

				
	var myArray = take_value(_type);


	_log = document.getElementById('log');




	var _tableforajax = document.getElementById('forajax');
	var _tableAjax = null;

    var childrenNumber = _tableforajax.childNodes.length;
    for (var i = 0; i < childrenNumber; i++) 
    {
		var element = _tableforajax.childNodes[i];
      	var elementName = element.nodeName.toLowerCase();
		if (elementName == 'table')
		{
		    var childrenNumbertable = element.childNodes.length;
		    for (var j = 0; j < childrenNumbertable; j++) 
		    {
				var elementtable = element.childNodes[j];
		  		var elementNametable = elementtable.nodeName.toLowerCase();
				if (elementNametable == 'tbody')
				{
					_tableAjax = elementtable;




				}
			}
		}
	}


//					document.getElementById('log').innerHTML += '<br><br>';

	getXhr()
	// On defini ce qu'on va faire quand on aura la reponse
	xhr.onreadystatechange = function()
	{	
		// On ne fait quelque chose que si on a tout recu et que le serveur est ok
		if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseXML)
		{		
			reponse = xhr.responseXML.documentElement;
			_test=document.getElementById('test');
			
			var infos = reponse.getElementsByTagName("infos");
			for (var i = 0 ; i < infos.length ; i++) {
				var info = infos[i];
				var _atime = info.getElementsByTagName("time")[0].firstChild.nodeValue;
				var _newreload = info.getElementsByTagName("flag")[0].firstChild.nodeValue;
				var _filetime = info.getElementsByTagName("filetime")[0].firstChild.nodeValue;
				_form.time.value = parseInt(_atime);
				_form.slastreload.value = parseInt(_newreload);
			}

			// ici je recupere les statistiques
			var stats = reponse.getElementsByTagName("stats");
			for (var i = 0 ; i < stats.length ; i++) {
				var stat = stats[i];
				var _statistic_service_ok = stat.getElementsByTagName("statistic_service_ok")[0].firstChild.nodeValue;
				var _statistic_service_warning = stat.getElementsByTagName("statistic_service_warning")[0].firstChild.nodeValue;
				var _statistic_service_critical = stat.getElementsByTagName("statistic_service_critical")[0].firstChild.nodeValue;
				var _statistic_service_unknown = stat.getElementsByTagName("statistic_service_unknown")[0].firstChild.nodeValue;
				var _statistic_service_pending = stat.getElementsByTagName("statistic_service_pending")[0].firstChild.nodeValue;
				var _statistic_host_up = stat.getElementsByTagName("statistic_host_up")[0].firstChild.nodeValue;
				var _statistic_host_down = stat.getElementsByTagName("statistic_host_down")[0].firstChild.nodeValue;
				var _statistic_host_unreachable = stat.getElementsByTagName("statistic_host_unreachable")[0].firstChild.nodeValue;
				var _statistic_host_pending = stat.getElementsByTagName("statistic_host_pending")[0].firstChild.nodeValue;

				if(_type != 'metaservice')
				{
					document.getElementById('host_up').innerHTML = _statistic_host_up;
					document.getElementById('host_down').innerHTML = _statistic_host_down;
					document.getElementById('host_unreachable').innerHTML = _statistic_host_unreachable;
					document.getElementById('host_pending').innerHTML = _statistic_host_pending;
					document.getElementById('service_ok').innerHTML = _statistic_service_ok;
					document.getElementById('service_warning').innerHTML = _statistic_service_warning;
					document.getElementById('service_critical').innerHTML = _statistic_service_critical;
					document.getElementById('service_unknown').innerHTML = _statistic_service_unknown;
					document.getElementById('service_pending').innerHTML = _statistic_service_pending;
				}
			}



			// a partir d'ici je recupere les informations principales
			var lines = reponse.getElementsByTagName("line");
			var order =0;
			for (var i = 0 ; i < lines.length ; i++) 
			{
				var line = lines[i];
				order = line.getElementsByTagName("order")[0].firstChild.nodeValue;
				var _flag = parseInt(line.getElementsByTagName("flag")[0].firstChild.nodeValue);								

//					document.getElementById('log').innerHTML += _flag + '->' + order + ' = ';

				if((_type == 'service' || _type == 'service_problem') && _flag == 0)
				{
					var _host = line.getElementsByTagName("host")[0].firstChild.nodeValue;								
					var _last_check = line.getElementsByTagName("last_check")[0].firstChild.nodeValue;
					var _last_change = line.getElementsByTagName("last_change")[0].firstChild.nodeValue;
					var _status = line.getElementsByTagName("status")[0].firstChild.nodeValue;
					var _output = line.getElementsByTagName("output")[0].firstChild.nodeValue;	
					var _service = line.getElementsByTagName("service")[0].firstChild.nodeValue;
					var _not_en = line.getElementsByTagName("not_en")[0].firstChild.nodeValue;
					var _pb_aknowledged = line.getElementsByTagName("pb_aknowledged")[0].firstChild.nodeValue;
					var _svc_is_flapping = line.getElementsByTagName("svc_is_flapping")[0].firstChild.nodeValue;

					var _infohtml = '';	
					if(_pb_aknowledged == 1)
						_infohtml += '<img src=' + _form.icone_pb_aknowledged.value + ' alt=&pb_aknowledged>';
					if(_not_en == 0)
						_infohtml += '<img src=' + _form.icone_not_en.value + ' alt=notification_enable>';
					if(_svc_is_flapping == 1)
						_infohtml += '<img src=' + _form.icone_flapping.value + ' alt=svc_is_flapping>';
					var _retry = line.getElementsByTagName("retry")[0].firstChild.nodeValue;
					var _accept_passive_check = line.getElementsByTagName("accept_passive_check")[0].firstChild.nodeValue;
					var _accept_active_check = line.getElementsByTagName("accept_active_check")[0].firstChild.nodeValue;
					var _ev_handler_en = line.getElementsByTagName("ev_handler_en")[0].firstChild.nodeValue;
	
					if(_accept_passive_check == 1)					
						_infohtml += '<img src=' + _form.icone_accept_passive_check1.value + ' alt=accept_passive_check>';
					if(_accept_active_check == 1)
						_infohtml += '<img src=' + _form.icone_accept_passive_check0.value + ' alt=accept_active_check>';					

					document.getElementById('infos'+order).innerHTML = _infohtml;
					document.getElementById('status'+order).innerHTML = _status;

					//bg color
					_td=document.getElementById('tdStatus'+order);
					_tr=document.getElementById('trStatus'+order);

					var ClassName = "list_one";
					if(i % 2)
						ClassName = "list_two";

					switch (_status)
					{
					  case "OK":
					    _td.style.backgroundColor = _form.color_OK.value;
						_tr.className = ClassName;
					   break;
					  case "WARNING":
					    _td.style.backgroundColor = _form.color_WARNING.value;
						_tr.className = ClassName;
					   break;
					  case "CRITICAL":
					    _td.style.backgroundColor = _form.color_CRITICAL.value;
						_tr.className = "list_three";
					   break;
					  case "UNDETERMINATED":
					    _td.style.backgroundColor = _form.color_UNDETERMINATED.value;
						_tr.className = ClassName;
					   break;
					  default:
					    _td.style.backgroundColor = _form.color_UNKNOWN.value;
						_tr.className = ClassName;
					   break;
					}
					document.getElementById('retry'+order).innerHTML = _retry;
					document.getElementById('last_check'+order).innerHTML = _last_check;
					document.getElementById('last_change'+order).innerHTML = _last_change;
					document.getElementById('output'+order).innerHTML = _output;					

//					document.getElementById('log').innerHTML += 'modifi la ligne ' + i + '<br>';

				}
				if((_type == 'service' || _type == 'service_problem') && _flag == 1)
				{
					
					DelOneLine(i);
					addLineToTab_Service(_tableAjax, line, i, _form);
				}				

				if(_type == 'host')
				{
					var _host = line.getElementsByTagName("host")[0].firstChild.nodeValue;

					var _last_check = line.getElementsByTagName("last_check")[0].firstChild.nodeValue;
					var _last_change = line.getElementsByTagName("last_change")[0].firstChild.nodeValue;
					var _status = line.getElementsByTagName("status")[0].firstChild.nodeValue;
					var _output = line.getElementsByTagName("output")[0].firstChild.nodeValue;
	
					document.getElementById('status'+order).innerHTML = _status;
					_td=document.getElementById('tdStatus'+order);
					_tr=document.getElementById('trStatus'+order);
					var ClassName = "list_one";
					if(i % 2)
						ClassName = "list_two";

					switch (_status)
					{
					  case "UP":
					    _td.style.backgroundColor = _form.color_UP.value;
						_tr.className = ClassName;
					   break;
					  case "DOWN":
					    _td.style.backgroundColor = _form.color_DOWN.value;
						_tr.className = ClassName;
					   break;
					  case "UNREACHABLE":
					    _td.style.backgroundColor = _form.color_UNREACHABLE.value;
						_tr.className = "list_three";
					   break;
					  default:
					    _td.style.backgroundColor = _form.color_UNDETERMINATED.value;
						_tr.className = ClassName;
					   break;
					}
					document.getElementById('last_check'+order).innerHTML = _last_check;
					document.getElementById('last_change'+order).innerHTML = _last_change;
					document.getElementById('output'+order).innerHTML = _output;				
				}

				if(_type == 'metaservice')
				{
					var _last_check = line.getElementsByTagName("last_check")[0].firstChild.nodeValue;
					var _last_change = line.getElementsByTagName("last_change")[0].firstChild.nodeValue;
					var _status = line.getElementsByTagName("status")[0].firstChild.nodeValue;
					var _output = line.getElementsByTagName("output")[0].firstChild.nodeValue;

					var _infohtml = '';

					var _retry = line.getElementsByTagName("retry")[0].firstChild.nodeValue;
					var _accept_passive_check = line.getElementsByTagName("accept_passive_check")[0].firstChild.nodeValue;
					var _accept_active_check = line.getElementsByTagName("accept_active_check")[0].firstChild.nodeValue;
					var _ev_handler_en = line.getElementsByTagName("ev_handler_en")[0].firstChild.nodeValue;

					if(_accept_passive_check == 1)
						_infohtml += '<img src=' + _form.icone_accept_passive_check1.value + ' alt=accept_passive_check>';
					if(_accept_active_check == 1)
						_infohtml += '<img src=' + _form.icone_accept_passive_check0.value + ' alt=accept_active_check>';					

					document.getElementById('infos'+order).innerHTML = _infohtml;
				
					document.getElementById('status'+order).innerHTML = _status;
					_td=document.getElementById('tdStatus'+order);
					_tr=document.getElementById('trStatus'+order);
					var ClassName = "list_one";
					if(i % 2)
						ClassName = "list_two";

					switch (_status)
					{
					  case "OK":
					    _td.style.backgroundColor = _form.color_OK.value;
						_tr.className = ClassName;
					   break;
					  case "WARNING":
					    _td.style.backgroundColor = _form.color_WARNING.value;
						_tr.className = ClassName;
					   break;
					  case "CRITICAL":
					    _td.style.backgroundColor = _form.color_CRITICAL.value;
						_tr.className = "list_three";
					   break;
					  case "UNDETERMINATED":
					    _td.style.backgroundColor = _form.color_UNDETERMINATED.value;
						_tr.className = ClassName;
					   break;
					  default:
					    _td.style.backgroundColor = _form.color_UNKNOWN.value;
						_tr.className = ClassName;
					   break;
					}
					document.getElementById('retry'+order).innerHTML = _retry;
					document.getElementById('last_check'+order).innerHTML = _last_check;
					document.getElementById('last_change'+order).innerHTML = _last_change;
					document.getElementById('output'+order).innerHTML = _output;
				}//fin metaservice
			}//fin du for pour les infos principale
			if(i > 0)
			DelAllLine(i);			
		}
	}
	
	//document.getElementById('log').innerHTML = "num="+_num+"&search="+_search+"&limit="+_limit+"&fileStatus="+_fileStatus+"&fileOreonConf="+_fileOreonConf+"&lca="+_lca+"&version="+_version+"&type="+_type+"&smaxtime="+parseInt(_form.smaxtime.value)+"&slastreload="+parseInt(_form.slastreload.value)+"&sid="+_sid+"&time="+parseInt(_form.time.value)+"&arr="+myArray;

	xhr.open("POST",_adresseRecherche,true);
	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	xhr.send("arr="+myArray + "&num="+_num+"&search="+_search+"&limit="+_limit+"&fileStatus="+_fileStatus+"&fileOreonConf="+_fileOreonConf+"&lca="+_lca+"&version="+_version+"&type="+_type+"&smaxtime="+parseInt(_form.smaxtime.value)+"&slastreload="+parseInt(_form.slastreload.value)+"&sid="+_sid+"&time="+parseInt(_form.time.value));

	setTimeout('go()', 5000);
	//ce timer correspond au tps entre chaque check de la date de modif du fichier
	//le fichier sera parser dans le .php ssi il vient a etre modifiÃ© par nagios
}

