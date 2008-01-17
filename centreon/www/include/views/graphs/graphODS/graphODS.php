<?php
/**
Centreon is developped with GPL Licence 2.0 :
http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt
Developped by : Julien Mathis - Romain Le Merlus

Adapted to Pear library by Merethis company, under direction of Cedrick Facon, Romain Le Merlus, Julien Mathis

The Software is provided to you AS IS and WITH ALL FAULTS.
OREON makes no representation and gives no warranty whatsoever,
whether express or implied, and without limitation, with regard to the quality,
safety, contents, performance, merchantability, non-infringement or suitability for
any particular or intended purpose of the Software found on the OREON web site.
In no event will OREON be liable for any direct, indirect, punitive, special,
incidental or consequential damages however they may arise and even if OREON has
been previously advised of the possibility of such damages.

For information : contact@oreon-project.org
**/
	if (!isset($oreon))
		exit();

	#Path to the configuration dir
	$path = "./include/views/graphs/graphODS/";

	# Smarty template Init
	$tpl = new Smarty();
	$tpl = initSmartyTpl($path, $tpl);

	#Pear library
	require_once "HTML/QuickForm.php";
	require_once 'HTML/QuickForm/Renderer/ArraySmarty.php';


	$openid = '0';
	$open_id_sub = '0';
	if(isset($_GET["openid"])){
	$openid = $_GET["openid"];
	$open_id_type = substr($openid, 0, 2);
	$open_id_sub = substr($openid, 3, strlen($openid));
	}

	if(isset($_GET["host_id"]) && $open_id_type == "HH"){
		$_GET["host_id"] = $open_id_sub;
	}
	else
		$_GET["host_id"] = null;

?>
<link href="./include/common/javascript/datePicker.css" rel="stylesheet" type="text/css"/>
<script language='javascript' src='./include/common/javascript/tool.js'></script>
<script>
			var css_file = './include/common/javascript/codebase/dhtmlxtree.css';
		    var headID = document.getElementsByTagName("head")[0];  
		    var cssNode = document.createElement('link');
		       cssNode.type = 'text/css';
		       cssNode.rel = 'stylesheet';
		       cssNode.href = css_file;
		       cssNode.media = 'screen';headID.appendChild(cssNode);
 
 
    		tree=new dhtmlXTreeObject("menu_40211","100%","100%","1");
            tree.setImagePath("./img/icones/csh_vista/");
//tree.enableThreeStateCheckboxes(true);

//            tree.setImagePath("./include/common/javascript/codebase/imgs/csh_vista/");


            //link tree to asp script
            tree.setXMLAutoLoading("./include/views/graphs/graphODS/GetODSXmlTree.php"); 
            
            //load first level of tree
            tree.loadXML("./include/views/graphs/graphODS/GetODSXmlTree.php?id=1&openid=<?php echo $openid; ?>");

			// system to reload page after link with new url
			tree.attachEvent("onClick",onNodeSelect)//set function object to call on node select 
			tree.attachEvent("onDblClick",onDblClick)//set function object to call on node select 
			//see other available event handlers in API documentation 

			tree.enableDragAndDrop(0);
			tree.enableTreeLines(false);	

			function onDblClick(nodeId)
			{
				tree.openAllItems(nodeId);
				return(false);
			}
			
			function onNodeSelect(nodeId)
			{
				var graphView4xml = document.getElementById('graphView4xml');
				graphView4xml.innerHTML="..graph.." + nodeId;

				tree.openItem(nodeId);

				graph_4_host(nodeId,'');
			}
			
			function mk_pagination(){;}
			function set_header_title(){;}

			function graph_4_host(id, formu)
			{
				var currentTime = new Date();
				var period ='';
				var StartDate= currentTime.getMonth()+1+"/"+ currentTime.getDate()+"/"+currentTime.getFullYear();
				var EndDate=   currentTime.getMonth()+1+"/"+ currentTime.getDate()+"/"+currentTime.getFullYear();
				var StartTime= "00:00";

				var _zero = "0";
				if(currentTime.getHours() > 10)
				var _zero = "";
				var EndTime= _zero + currentTime.getHours()+":00";
				
				if(document.formu && document.formu.StartDate.value != "")
					StartDate = document.formu.StartDate.value;
				if(document.formu && document.formu.EndDate.value != "")
					EndDate = document.formu.EndDate.value;

				if(document.formu && document.formu.StartTime.value != "")
					StartTime = document.formu.StartTime.value;
				if(document.formu && document.formu.EndTime.value != "")
					EndTime = document.formu.EndTime.value;
												
				tree.selectItem(id);
				
				var proc = new Transformation();
				var _addrXSL = "./include/views/graphs/graphODS/GraphService.xsl";
				var _addrXML = './include/views/graphs/graphODS/GetODSXmlGraph.php?period='+period+'&StartDate='+StartDate+'&EndDate='+EndDate+'&StartTime='+StartTime+'&EndTime='+EndTime+'&id='+id+'&sid=<?php echo $sid;?>';
				proc.setXml(_addrXML)
				proc.setXslt(_addrXSL)
				proc.transform("graphView4xml");


//				currentTime.getHours();
				if(document.formu){
					document.formu.StartDate.value = StartDate;
					document.formu.EndDate.value = EndDate;
					document.formu.StartTime.value = StartTime;
					document.formu.EndTime.value = EndTime;
				}
				

			}

function displayTimePicker(timeFieldName, displayBelowThisObject, dtFormat)
{
	if (document.getElementsByName (timeFieldName).item(1))
	  var targetDateField = document.getElementsByName (timeFieldName).item(1);
	else
	  var targetDateField = document.getElementsByName (timeFieldName).item(0);


  var x = displayBelowThisObject.offsetLeft;
  var y = displayBelowThisObject.offsetTop + displayBelowThisObject.offsetHeight ;
 
  // deal with elements inside tables and such
  var parent = displayBelowThisObject;
  while (parent.offsetParent) {
    parent = parent.offsetParent;
    x += parent.offsetLeft;
    y += parent.offsetTop ;
  }
drawTimePicker(timeFieldName, targetDateField, x, y);
}

function drawTimePicker(timeFieldName, targetTimeField, x, y)
{
 	var timePickerDivID = timeFieldName + "_timePickerDivID";
 
//  	if (!document.getElementById(timePickerDivID)) {
    	var newNode = document.createElement("select");
	    newNode.setAttribute("id", timePickerDivID);
	    newNode.setAttribute("class", "tpDiv");
	    newNode.setAttribute("size", 6);
	    newNode.setAttribute("style", "visibility: hidden;");
		newNode.onchange = function() { 
			var pickerDiv = document.getElementById(timePickerDivID);
			targetTimeField.value = '';
			targetTimeField.innerHTML = '';
			
			targetTimeField.value = pickerDiv.options[pickerDiv.selectedIndex].value;
			pickerDiv.style.visibility = (pickerDiv.style.visibility == "visible" ? "hidden" : "visible");
			pickerDiv.style.display = (pickerDiv.style.display == "block" ? "none" : "block");
			return false;
		};

		var _zero = "0";
		for (var i=0; i < 24; i++) {
			if(i < 10)
				_zero = "0";
			else
				_zero = "";
			
			var k = document.createElement('option');
			k.value= _zero + i + ":00";
			k.innerHTML= _zero + i + ":00";
			var currentTime = new Date()
			if(i == currentTime.getHours())
			k.selected = true;
			newNode.appendChild(k);		
	
			var k = document.createElement('option');
			k.value= _zero + i+":30";
			k.innerHTML= _zero + i+":30";		
			newNode.appendChild(k);
			
		}
	    document.body.appendChild(newNode);
  	//}
  
  var pickerDiv = document.getElementById(timePickerDivID);
  pickerDiv.style.position = "absolute";
  pickerDiv.style.left = x + "px";
  pickerDiv.style.top = y + "px";
  pickerDiv.style.visibility = (pickerDiv.style.visibility == "visible" ? "hidden" : "visible");
  pickerDiv.style.display = (pickerDiv.style.display == "block" ? "none" : "block");
  pickerDiv.style.zIndex = 10000;
    
}

</script>


<?php
//<div id="graphView4xml">..</div>
	## Form begin
	$form = new HTML_QuickForm('Form', 'get', "?p=".$p);
	$form->addElement('header', 'title', $lang["giv_sr_infos"]);

	$periods = array(	""=>"",
						"10800"=>$lang["giv_sr_p3h"],
						"21600"=>$lang["giv_sr_p6h"],
						"43200"=>$lang["giv_sr_p12h"],
						"86400"=>$lang["giv_sr_p24h"],
						"172800"=>$lang["giv_sr_p2d"],
						"302400"=>$lang["giv_sr_p4d"],
						"604800"=>$lang["giv_sr_p7d"],
						"1209600"=>$lang["giv_sr_p14d"],
						"2419200"=>$lang["giv_sr_p28d"],
						"2592000"=>$lang["giv_sr_p30d"],
						"2678400"=>$lang["giv_sr_p31d"],
						"5184000"=>$lang["giv_sr_p2m"],
						"10368000"=>$lang["giv_sr_p4m"],
						"15552000"=>$lang["giv_sr_p6m"],
						"31104000"=>$lang["giv_sr_p1y"]);

	$sel =& $form->addElement('select', 'period', $lang["giv_sr_period"], $periods);

	$renderer =& new HTML_QuickForm_Renderer_ArraySmarty($tpl);
	$form->accept($renderer);
	$tpl->assign('form', $renderer->toArray());

	$tpl->assign('lang', $lang);
	$tpl->display("graphODS.ihtml");
?>
