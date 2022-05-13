from django.shortcuts import render
from django.http.response import JsonResponse, HttpResponse ,HttpResponseBadRequest
from .models import Book
from .forms import BookForm
from django.core import serializers
import json
from django.shortcuts import get_object_or_404
# Create your views here.

def index(request):
    is_ajax_request = request.headers.get("X-Requested-With") == 'XMLHTTPRequest'
    form = BookForm()
    if is_ajax_request:
        if request.method == "GET":
            data = list(Book.objects.all().values)
            return JsonResponse({'context': data})
    context = {
        "books":Book.objects.all(),
        "form":form
    }
    return render(request, "index.html", context=context)


def book_create(request):
    is_ajax = request.headers.get("X-Requested-With") == "XMLHttpRequest"
    if is_ajax:
        if request.method == "POST":
            data = json.load(request)
            print(data)
            book = data.get("payload")
            obj = Book.objects.create(name = book["name"],
                               author = book["author"] ,
                               isbn = book["isbn"])
            return JsonResponse({"status": "book added", "books":{"id":obj.id,
                                                                "name":obj.name,
                                                                "author":obj.author,
                                                                "isbn":obj.isbn} })
        return JsonResponse({"status":"invalid request"}, status=400)
    return HttpResponseBadRequest()



def update_delete_book(request, id):
    is_ajax = request.headers.get("X-Requested-With") == "XMLHttpRequest"
    print("YESSSS OOOOdce")
    if is_ajax:
        print("YESSSS OOOO")
        if request.method == "PUT":
            print("YESSSS OOOO")
            obj = Book.objects.get(id=id)
            print("YESSSS")
            data = json.load(request)
            updated_data = data.get("payload")

            obj.name = updated_data["name"]
            obj.isbn = updated_data["isbn"]
            obj.author = updated_data["author"]
            obj.save()
            return JsonResponse({"status":"Updated", "book":{"id":obj.id,
                                                                "name":obj.name,
                                                                "author":obj.author,
                                                                "isbn":obj.isbn}})
        if request.method == "DELETE":
            obj = Book.objects.get(id=id)
            obj.delete()
            return JsonResponse({"status":"deleted"})
        return JsonResponse({"status":"invalid request"}, status=400)
    return HttpResponseBadRequest()

