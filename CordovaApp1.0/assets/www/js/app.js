 // Wait for Cordova to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {
//        var db = window.openDatabase("eti_customers", "1.0", "Etisalat Customers", 200000);
//        db.transaction(populateDB, errorCB, successCB);
    	
    	var data = [
    	            ['Heavy Industry', 12],['Retail', 9], ['Light Industry', 14], 
    	            ['Out of home', 16],['Commuting', 7], ['Orientation', 9]
    	          ];
    	          var plot1 = jQuery.jqplot ('chart', [data], 
    	            { 
    	              seriesDefaults: {
    	                // Make this a pie chart.
    	                renderer: jQuery.jqplot.PieRenderer, 
    	                rendererOptions: {
    	                  // Put data labels on the pie slices.
    	                  // By default, labels show the percentage of the slice.
    	                  showDataLabels: true
    	                }
    	              }, 
    	              legend: { show:true, location: 'e' }
    	            }
    	          );
//        
    }
    
//    function successCB(){
//    	alert("sucess");
//    }
    
    // Populate the database 
    //
//    function populateDB(tx) {
//        tx.executeSql('DROP TABLE IF EXISTS eti_customers');
//        tx.executeSql('CREATE TABLE IF NOT EXISTS eti_customers (id int auto_increment,name varchar(128),MSISDN int)');
//        tx.executeSql('INSERT INTO eti_customers (id,name,MSISDN) VALUES (2,"Shan Wicky","32333384")');
//        tx.executeSql('INSERT INTO eti_customers (id,name,MSISDN) VALUES (3,"DD Wicky","5555333")');
//        tx.executeSql('INSERT INTO eti_customers (id,name,MSISDN) VALUES (4,"ASss","3234433384")');
//   }
    // Transaction error callback
    //
    function errorCB(tx, err) {
        alert("Error processing SQL: "+err);
    }
    // Transaction success callback
    //
    function dataReady() {
    	jQuery.mobile.showPageLoadingMsg('Loading');
    	 var db = window.openDatabase("eti_customers", "1.0", "Etisalat Customers", 200000);
          db.transaction(queryDB, errorCB);
          
    }
    
    // Query the database
    //
    function queryDB(tx) {
        tx.executeSql('SELECT * FROM eti_customers', [], querySuccess, errorCB);
    }
    
    // Query the success callback
    //
    function querySuccess(tx, results) {
    	var len = results.rows.length;
    	var nameAry = [];
    	var msisdnAry = [];
        console.log("eti_customers table: " + len + " rows found.");
        for (var i=0; i<len; i++){
            console.log("Row = " + i + " ID = " + results.rows.item(i).id + " name =  " + results.rows.item(i).name);
            nameAry.push(results.rows.item(i).name);
            msisdnAry.push(results.rows.item(i).MSISDN);
        }
       console.log(nameAry);
       fillNames(nameAry,msisdnAry);
        
        // this will be true since it was a select statement and so rowsAffected was 0
        if (!results.rowsAffected) {
            console.log('No rows affected!');
            return false;
        }
    	// for an insert statement, this property will return the ID of the last inserted row
        console.log("Last inserted row ID = " + results.insertId);
    }
    
    
    
    //Filling Names to Front End
    
    function fillNames(nameAry,msisdnAry){
    	jQuery.mobile.hidePageLoadingMsg();
    	var newCustomers='';
    	for(var k in nameAry){
    		newCustomers += '<li data-theme="">' + '<a href="#" onclick="js:customer('+msisdnAry[k]+')" data-transition="none">' + nameAry[k]+ '</a>' + '</li>';
    	}
    	$('#customers li[role!=heading]').remove();
    	$('#customers').append(newCustomers).listview('refresh');
    }
    
    
    
    //Adding Data to table
    function addCustomer(){
    	 var db = window.openDatabase("eti_customers", "1.0", "Etisalat Customers", 200000);
         db.transaction(insertData, errorCB);
    	 
    }
    
    //insert data
    
    function insertData(tx){
    	var name = $('#name').val();
    	var msisdn = $('#msisdn').val();
    	if(name && msisdn){
    		tx.executeSql('INSERT INTO eti_customers (id,name,MSISDN) VALUES ("","'+name+'","'+msisdn+'")',[],InsertSuccess, errorCB);
    	}
    	else{
    		alert("Both Fieled are Required");
    	}
    	
    }
    
    function InsertSuccess(){
    	alert('Data Successfully Added.');
    	$('#getListBtn').click();
    }
    
    function customer(msisdnAry){
    	alert(msisdnAry);
//    	$('h3 #Customer_name').append(name);
    }
    
    
    function exit(){
    	device.exitApp();
    }
    
    function recognizeSpeech() {
        var maxMatches = 5;
        var promptString = "Speak now"; // optional
        var language = "en-US";                     // optional
        window.plugins.speechrecognizer.startRecognize(function(result){
            alert(result);
        }, function(errorMessage){
            console.log("Error message: " + errorMessage);
        }, maxMatches, promptString, language);
    }

    // Show the list of the supported languages
    function getSupportedLanguages() {
        window.plugins.speechrecognizer.getSupportedLanguages(function(languages){
            // display the json array
            alert(languages);
        }, function(error){
            alert("Could not retrieve the supported languages : " + error);
        });
    }

    
    