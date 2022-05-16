from django.core.management.base import BaseCommand, CommandError
from django.db.utils import IntegrityError
from Book.models import Book


class Command(BaseCommand):
    help = "Delete a specific data from the data base"

    def add_arguments(self, parser):
        parser.add_argument("id", nargs=1, type=int)
        parser.add_argument("-i", action="store_true")

    def handle(self, *args, **options):
        book_id = options["id"][0]
        try:
            book = Book.objects.get(id = book_id)
        except:
            raise CommandError(f"Book with the id number {options['id']} does not exist in the book database")
        is_i = options["i"]
        if is_i:
            yes_no = input(f"Are sure you want to delete \'{book}\' book from the book database (y/n): ")
            if "y" in yes_no:
                book.delete()
            else:
                self.stdout.write(self.style.SUCCESS("Operation Canceled"))
                return
        else:
            book.delete()
        self.stdout.write(self.style.SUCCESS("Book data deleted successfully !"))