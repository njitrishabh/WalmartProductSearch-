function search(){  
    var productName = document.getElementById('searchProduct').value;  
        
    var searchUrl = 'http://api.walmartlabs.com/v1/search?query=' + productName + '&format=json&apiKey=jdmhav4v9996wfjnnjzx5hyp&numItems=10';

    var itemArray= [];

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        //console.log(JSON.stringify(myObj, null, 2));   
        for (var i = 0; i < myObj.items.length; i++) {
            itemArray.push(myObj.items[i].itemId);  
        }

        }
    };
    xhttp.open("GET", searchUrl, true);
    xhttp.send();
        
    timeoutVar = setTimeout(function(){ lookUp(itemArray); }, 1000);
}  

var Products = [];
function lookUp(itemArray){

    console.log("items = "+ itemArray);
    
    for(var j = 0; j < itemArray.length; j++ ){
    var itemUrl = 'http://api.walmartlabs.com/v1/items/' + itemArray[j] + '?format=json&apiKey=jdmhav4v9996wfjnnjzx5hyp';
    
        var xhttp2 = new XMLHttpRequest();
        xhttp2.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            Products[j] = {"Name": myObj.name, "Price": myObj.salePrice, "Description": myObj.longDescription, "Image": myObj.thumbnailImage, "largeImage": myObj.largeImage, "ItemNo": myObj.itemId };
            }
        };
    xhttp2.open("GET", itemUrl, false);
    xhttp2.send();

    }
    var inner = document.getElementById("demo")
    var  HTML = "<br>" + "<div id = 0 style='float: left; width: 200px;' onclick='moreDetail(0)' >" + "<img src='" + Products[0].Image + "'>" + "<br>"  + Products[0].Price  + "<br>" +  Products[0].Name + "</div>";
    for(var k = 1; k < 5; k++)
    {
        HTML += "<div style='float: left; width: 200px;' onclick='moreDetail(\""+k+"\");' >" + "<img src='" + Products[k].Image + "'>" + "<br>" + "$ " + Products[k].Price  + "<br>" +  Products[k].Name + "</div>";
    }
    
    var  HTML2 = "<br>" + "<div  style='float: bottom; width: 200px;' >" + "<img src=white2.jpg height=42 width=42>" + "<br>" + "<br>" + "</div>";
    for(var k = 5; k < Products.length; k++)
    {
        HTML2 += "<div style='float: left; width: 200px;' onclick='moreDetail(\""+k+"\");' >" + "<img src='" + Products[k].Image + "'>" + "<br>" + "$ " + Products[k].Price  + "<br>" +  Products[k].Name + "</div>";
    }

    inner.innerHTML = HTML +  HTML2;            
}

function moreDetail(ProdNo){
    var descText = Products[ProdNo].Description;
    var jsonstr = JSON.stringify(descText);
    var regex = jsonstr.replace(/(<([^>]+)>)/ig, "");
    var inner = document.getElementById("demo");
    var HTML = "<br>" + "<b>" + Products[ProdNo].Name + "</b>" + "<br>" + "$ " + Products[ProdNo].Price + "<br>";
    HTML += "<img src='" + Products[ProdNo].largeImage +  "'>";
    HTML += "<p><b> About this Item: </b></p>" + "<br>";
    HTML +=  "<p>" + regex + "</p>" + "<br>";
    inner.innerHTML = HTML;
    console.log("ProductNo =" + ProdNo);

    recommendations(ProdNo);    
}

function recommendations(itemNo){
    var Itemid = Products[itemNo].ItemNo;    
    var recommendUrl =  'http://api.walmartlabs.com/v1/nbp?apiKey=jdmhav4v9996wfjnnjzx5hyp&itemId='+Itemid+'';
    var recArray= [];
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        var recObj = JSON.parse(this.responseText);

        for (var i = 0; i < recObj.length; i++) {
            recArray.push(recObj[i].itemId);  
        }

        }
    };
    xhttp.open("GET", recommendUrl, false);
    xhttp.send();
    recArray.splice(10);
    timeoutRec = setTimeout(function(){ recLookup(recArray); }, 1000);
}

var recProducts = [];
function recLookup(recArray){

    console.log("recs = "+ recArray);
    
    for(var j = 0; j < recArray.length; j++ ){
    var recUrl = 'http://api.walmartlabs.com/v1/items/' + recArray[j] + '?format=json&apiKey=jdmhav4v9996wfjnnjzx5hyp';
    
        var xhttp2 = new XMLHttpRequest();
        xhttp2.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            var recObj = JSON.parse(this.responseText);
            recProducts[j] = {"Name": recObj.name, "Price": recObj.salePrice, "Description": recObj.longDescription, "Image": recObj.thumbnailImage, "largeImage": recObj.largeImage, "ItemNo": recObj.itemId };
            }
        };
    xhttp2.open("GET", recUrl, false);
    xhttp2.send();

    }
    
    var inner = document.getElementById("demo")
    var divtest = document.createElement("innerdemo");
    var recHeading = "<p><b> Customers Also Considered: </b></p>" + "<br>";   
    var  recHTML = "<br>" + "<div id = 0 style='float: left; width: 200px;' onclick='recDetail(0)' >" + "<img src='" + recProducts[0].Image + "'>" + "<br>"  + recProducts[0].Price  + "<br>" +  recProducts[0].Name + "</div>";
    for(var k = 1; k < recProducts.length; k++)
    {
        recHTML += "<div style='float: left; width: 200px;' onclick='recDetail(\""+k+"\");' >" + "<img src='" + recProducts[k].Image + "'>" + "<br>" + "$ " + recProducts[k].Price  + "<br>" +  recProducts[k].Name + "</div>";
    }        

    divtest.innerHTML = recHeading + recHTML;
    inner.appendChild(divtest);            
}

function recDetail(ProdNo){
    var descText = recProducts[ProdNo].Description;
    var jsonstr = JSON.stringify(descText);
    var regex = jsonstr.replace(/(<([^>]+)>)/ig, "");
    var inner = document.getElementById("demo");
    var HTML = "<br>" + "<b>" + recProducts[ProdNo].Name + "</b>" + "<br>" + "$ " + recProducts[ProdNo].Price + "<br>";
    HTML += "<img src='" + recProducts[ProdNo].largeImage +  "'>";
    HTML += "<p><b> About this Item: </b></p>" + "<br>";
    HTML +=  "<p>" + regex + "</p>" + "<br>";
    inner.innerHTML = HTML; 

    recommendations(ProdNo);
}
