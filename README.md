# CRUD app with Django and Ajax

In this simple app, I demonstrated the `CREATE READ UPDATE DELETE` operations using AJAX's web technology `XMLHttpRequest` with Django 
as backend.

The app is a single paged web app that allows you to create, update and delete a book object all in a `single page`. The content of the page is updated after each operation without having to reload the browser. 

Though there is a facede of the page content updating 
in real time like the use of `Websocket`, however, Its just some 
Javascript Dom Manipulation and client server communication happening via Ajax's XMLHttpRequest other than the conventional HttpRequest.

## Installation 

1. Clone the repository 
2. run `pip install django`
3. run `django manage.py populate` to populate the database with my custom data. 

> `populate` command is a management command I created

# Note 

If you wish to work on the frontend, kindly send a `pull request
