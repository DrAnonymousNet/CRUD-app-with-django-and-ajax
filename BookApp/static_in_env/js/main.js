 document.getElementById("create").addEventListener("click", loadForm)
        function getUpdateForm(id) {
            console.log(id)
            loadForm(e)
        }


        function loadForm(e) {
            e.preventDefault()

            let output = ""
            output +=`<div class="col-4 offset-4 mb-5 mt-5" ïd="form-1">
        <div class="content-section">
            <form method="POST" enctype="multipart/form-data">
                
                <fieldset class="form-group">
                    <legend class="border-bottom mb-4">Create Post</legend>
                  <tr><th><label for="id_name">Name:</label></th><td><input type="text" name="name" maxlength="60" required id="id_name"></td></tr>
<tr><th><label for="id_author">Author:</label></th><td><input type="text" name="author" maxlength="50" required id="id_author"></td></tr>
<tr><th><label for="id_isbn">Isbn:</label></th><td><input type="text" name="isbn" maxlength="50" required id="id_isbn"></td></tr>
                </fieldset>

    <form id="getform" class="form-group" >
        <input class="btn btn-outline.info" type="submit" value="submit" onclick="createNewBook(event)">
                </form>

            </form>
        </div>
</div>`
            //console.log(output)
                document.querySelector("#form-div").innerHTML = output


        }




        function createNewBook(e) {
            e.preventDefault()

            xhr = new XMLHttpRequest()

            xhr.open("POST", "/book/", true)
             xhr.setRequestHeader("Content-type","application/x-www-form-urlencode")
            xhr.setRequestHeader("X-Requested-With","XMLHttpRequest")
            xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"))

            let name = document.getElementById("id_name").value
            let isbn = document.getElementById("id_isbn").value
            let author = document.getElementById("id_author").value
            xhr.onload= function(){
                id = JSON.parse(xhr.responseText)
                newelem = document.createElement("div")  //document.getElementById(`container-id`)
                newelem.setAttribute("id", `container-${id["books"].id}`)

                newelem.innerHTML =` <div id="individual_book">

            <p id="book-${id["books"].id}">${id["books"].name}</p>
            <p id="book-author-${id["books"].id}">${id["books"].author}</p>
            <p id="book-isbn-${id["books"].id}">${id["books"].isbn}</p>

    <button id="update-${id["books"].id}" value="Update"
            onclick="loadForm"> Update </button>

    <button id="delete-${id["books"].id}" value="Delete"
            onclick="deleteBook(event, id=this.id)">Delete</button>
        </div>
        <div id="book-div-${id["books"].id}">
        {% csrf_token %}

    </div>`
                console.log(newelem)
                document.body.appendChild(newelem)


                obj = document.getElementById("form-div")
                obj.innerHTML = " "

            }


            let perms = JSON.stringify({payload:{"name":name, "isbn":isbn, "author":author}})
            xhr.send(perms)

        }



        function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function deleteBook(e, id) {
    id = id.split("-")
    id = Number(id[1])
    let xhr = new XMLHttpRequest()
    xhr.open("DELETE", `/book/${id}`, true)
    xhr.setRequestHeader("X-Requested-With","XMLHttpRequest")
    xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"))
    xhr.onload = function(){
        if(xhr.status === 200){
            document.getElementById(`container-${id}`).innerHTML = " "
        }
    }
    xhr.send()


}
    //document.getElementById("updateform").addEventListener("submit", function() { updateBook(id) })

        function updateBook(e, id){
            e.preventDefault()
            console.log(id)


            let xhr = new XMLHttpRequest()
            xhr.open("PUT", `/book/${id}`, true)
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencode")
            xhr.setRequestHeader("X-Requested-With","XMLHttpRequest")
            xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"))
            let name = document.getElementById("id_name").value
            let isbn = document.getElementById("id_isbn").value
            let author = document.getElementById("id_author").value
            let perms = JSON.stringify({payload:{"name":name, "isbn":isbn, "author":author}})

            xhr.onload = function(){
                console.log(this.responseText)
                let output = JSON.parse(xhr.responseText)
                console.log(output)
                document.getElementById(`book-${id}`).innerText = output["book"].name
                document.getElementById(`book-author-${id}`).innerText = output["book"].author
                document.getElementById(`book-isbn-${id}`).innerText = output["book"].isbn
                document.getElementById(`book-div-${id}`).innerHTML = " "


            }
            xhr.send(perms)
        }
