# WalmartProductSearch-
Developed a single-page responsive web application to display Walmart product search results and rank-ordered recommendations.The application implements the Walmart Labs Open API.

The application implements the following workflows:

Search Feature:
Accept a product search string from the user.
Used Walmart Labs Search API to find products based upon the user-provided search string.
Used the Walmart Labs Product Lookup API to retrieve details about the first 10 items in the search result.
Displaying details about the first 10 product search results in the Web Application.
The search results includes the product name, description, price and product thumbnail image.
The product names and thumbnail image are clickable to display details on results page.

Recommendations Feature:
Accept user input via selection on a product name or thumbnail image.
Used the Walmart Labs Product Recommendation API to search for recommendations based upon the user's selected item.
Used the Walmart Labs Product Lookup API to retrieve details about the first 10 items in the recommended results.
Displaying the recommendation results (first 10 items) in the Web Application.


Solution/Technology Overview:

Technologies used - HTML5, CSS3, JavaScript, XMLHttpRequest, WalmartOpenAPI. 

For this single-page web application, The XMLHttpRequest object has been used to request data from the Walmart server.
The XMLHttpRequest object here is also used to:
Update a web page without reloading the page
Request data from a server - after the page has loaded
Receive data from a server  - after the page has loaded

Responsive Web Design is about using CSS and HTML to resize, hide, shrink, enlarge, or move the content to make it look good on any screen. For this purpose: an HTML5 technique called "viewport" has been used through the <meta> tag.
The viewport is the user's visible area of a web page.
The viewport varies with the device, and will be smaller on a mobile phone than on a computer screen.

Instructions for Executing the Solution: 

1). User need to have "CORS plugin installed in their browser(Chrome/Firefox/IE/Safari)" to allow croos-origin resource sharing.
A web application using XMLHttpRequest could only make HTTP requests to its own domain. To improve web applications, browser has to allow cross-domain requests.

2). Used a local Web Server to store, process and deliver web pages to the client. Hence, used Python's SimpleHTTPServer module.
   If python is installed in your computer, just type "python -m SimpleHTTPServer" in the command line at your application's directory.
   Now open your web page using "localhost:8000/walmart.html" in the browser.




