let booklist = document.querySelector("#booklist")
let noBooks=document.querySelector('.no-book')
let getbooks = async () => {
    try {
        let bookData = await fetch(`https://www.anapioficeandfire.com/api/books?page=1&pageSize=50`)
        let bookInfo = await bookData.json()

        booklist.innerHTML = ''
        noBooks.innerHTML=''
        bookInfo.map((bookInfo) => {
            
            charlistname=  getCharacters(bookInfo)
            console.log(charlistname)
            
        })
    }
    catch (err) {
        console.log(err)
    }
}

getbooks()


let displaybook = async(booklists) => {
    booklist.innerHTML+=`
    <div class="card book">
  <div class="card-body">
    <h5 class="card-title">${booklists.name}</h5>
    <h6 class="card-subtitle mb-2 text-muted"> isbn ${booklists.isbn}</h6>
    
   
<div class="p-textsub">
<p class="card-text"> <label> Author : </label> ${booklists.authors[0]}</p>
    <p class="card-text"> <label> Publisher : </label> ${booklists.publisher}</p>
    </div>
    <p class="card-text Characters"> <label> Characters : </label> ${booklists.charlistname}</p>
    
  </div>
  <div class="card-footer">
 
  <span class="card-text-span"><i class="fa fa-book" aria-hidden="true"></i> ${booklists.numberOfPages} pages</span>

  <span class="card-text-span"><i class="fa fa-calendar" aria-hidden="true"></i> ${booklists.released} </span>
  </div>
</div>`
}



let searchBooks=async()=>{
    try{

    //get value of input box
    let bookname=document.querySelector('#searchBook').value
    let searchdata=await fetch(`https://www.anapioficeandfire.com/api/books?page=1&pageSize=50&name=${bookname}`)

let BookListInfo = await searchdata.json()

        booklist.innerHTML = ''
        noBooks.innerHTML=''
        console.log(BookListInfo.length)
        if(BookListInfo.length > 0)
        {
            BookListInfo.map((book_item) => {
              
               
            charlistname=  getCharacters(book_item)
            })
        }
        else
        {
            noBooks.innerHTML=`
            <div class="alert alert-dark" role="alert">Please Enter full Book Name and Search</div>
            `
        }
    }
    catch{
        console.log('not found')
    }
    

}


let getCharacters=async(char_api)=>{
try{
    let charlist=[]
    let c=0
    for(let i=0;i<char_api.characters.length;i++){
   // console.log(char_api[i])
    let charDat=await fetch(char_api.characters[i])
    let charValue=await charDat.json()
    if(charValue.name!="" && c<5)
    {
        c=c+1
    charlist.push(charValue.name)

    }
    else{
        break
    }
    }
    char_api.charlistname=charlist.join(', ')
   // console.log(charlist.join(','))
   displaybook(char_api)
}
catch{
    console.log('not avilable')
}
}