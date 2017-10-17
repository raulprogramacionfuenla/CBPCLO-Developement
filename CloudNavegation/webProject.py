
def getHtmlPage():
	page = '''
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>HelloPage</title>
	<link rel="stylesheet" href="style.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
</head>
<script>
	$(document).ready(function(){
 	//$("#msgid").html("This is Hello World by JQuery");
	});
</script>
<body>
		<h1>Hello Page :)</h1>
		<p>Hello World</p>
</body>
</html>
	'''
	return page

def getCSSPage():
	page = '''
*{
	padding: 0px 0px;
	margin: 0px 0px;
	font-family: helvetica;
}

li{list-style:none;}
	'''
	return page 