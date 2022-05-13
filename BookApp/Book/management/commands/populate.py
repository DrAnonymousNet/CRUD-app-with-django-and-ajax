from django.core.management.base import BaseCommand, CommandError
from django.db.utils import IntegrityError
from Book.models import Book


class Command(BaseCommand):
    help = "Populates the database with the data above"

    def handle(self, *args, **options):
        try:
            for data in book_data:
                new_book = Book.objects.create(name=data["name"],
                                               author=data["author"],
                                               isbn = str(data["isbn"]))
                new_book.save()
        except IntegrityError:
            raise CommandError(f"Book with the {data['isbn']} ISBN number already exist in the book database")
        self.stdout.write(self.style.SUCCESS("All book data added successfull !"))


book_data = [
    {
     "name": "Introduction to Django",
      "author": "Mustapha Ahmad",
      "isbn": 1298349059
    },
    {
    "name": "A Practical Guild to Technical Writing",
    "author": "AbdulAzeez AbdulAzeez",
      "isbn": 145378263
    },
    {
"name": "Building API with Fast API",
      "author": "AbdulRahman Habeeb",
      "isbn": 1293279067
    },
    {
"name": "Training a Machine Learning Model with Keras",
      "author": "Lawal Afeez",
      "isbn": 127490345
    },

]
