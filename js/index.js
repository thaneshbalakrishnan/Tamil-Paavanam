var flag = false;	

$(document).on('pagebeforechange', function () {
    if(flag==false) {
        $.mobile.loading( "show" );
        flag=true;
    }
});

$(document).on('pageshow', function () {
	$.mobile.loading( "hide" );
    flag=false;
}); 



var postid = getQueryVariable("id");

$( document ).on( "pagebeforeshow", "#postIndex", function() {

	var url = "http://123malaysia.com/kalaisol/?json=1&count=2000&include=title,content,date,thumbnail";
	

		$.ajax({
		   type: 'GET',
		    url: url,
		    async: false,
		    jsonpCallback: 'callback',
			
		    contentType: "application/json",
		    dataType: 'jsonp',
		    success: function(json) {
		    	if(json.status=="ok") {
					posts(json);
		    	}
		    	else {
		    		console.log("error");
		    	}
		       
		    },
		    error: function(e) {
		       console.log(e.message);
		    }
		});
	 
});


$( document ).on( "pagebeforeshow", "#postPage", function() {
                
    var postid = getQueryVariable("id");
    var url = "http://123malaysia.com/kalaisol/api/get_post/?post_id="+postid+"&callback=?";


    $.ajax({
       type: 'GET',
        url: url,
        async: false,
		
        jsonpCallback: 'callback',
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(json) {
            if(json.status=="ok") {
                post(json);
            }
            else {
                console.log("error");
            }
           
        },
        error: function(e) {
           console.log(e.message);
        }
    });
     
});

function redirectPage() { window.location = linkLocation; }



function getQueryVariable(variable)
{
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
           var pair = vars[i].split("=");
           if(pair[0] == variable){return pair[1];}
   }
   return(false);
}

document.addEventListener('deviceready', function() {
 	setTimeout(function() { navigator.splashscreen.hide(); }, 3000);
});



function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}


function post(json) {

	document.getElementById("title").innerHTML = json.post.title;
	
    var html = "<h3>"+json.post.title+"</h3>";
    html += "<p>"+json.post.content+"</p>";
	
	document.getElementById("post").innerHTML = html;
}





function posts(json) {

    var html = "";

  	for (var i = 0; i < json.posts.length; i++)
	{
		
	   
	    if ("url" in json.posts[i]) {
	        var posturl = json.posts[i].url;	     
	    }

	    if ("id" in json.posts[i]) {
	        var postid = json.posts[i].id;	     
	    }
		
	   if ("title" in json.posts[i]) {
	      var posttitle = json.posts[i].title;}
		  
		if ("thumbnail" in json.posts[i]) {
	      var postthumbnail = json.posts[i].thumbnail;}
		  
		  		  
		  
	    else
	    if ("content" in json.posts[i]) {
	      var postcontent = json.posts[i].content;}
	    else var postcontent = "பெயரிடாத";

	    if (postcontent.length > 10) postcontent = strip(postcontent).substring(0,200);
	    else postcontent = strip(postcontent);

		if ("date" in json.posts[i]) {
	      	var date = json.posts[i].date;
	  	}
	  	else {
	  		var date = "null";
	  	}
        
        html = html + "<li>" + "<h1>" + posttitle + "</h1>" + "<small>" + postcontent + "</small>" + "</li>";
		

        
        document.getElementById("postsList").innerHTML = html;
        $("#postsList").listview("refresh");

	}	

}



function open_browser(link)
{
    window.open(link, '_blank', 'location=yes','closebuttoncaption=back');
}

function getParameter(query, url) {
 	var query = query.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var expr = "[\\?&]"+query+"=([^&#]*)";
        var regex = new RegExp( expr );
        var results = regex.exec( url );

	if(results!=null) return results[1];
	else return false;
}


