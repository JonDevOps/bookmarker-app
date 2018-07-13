const validateForm = (siteUrl) => {

    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);

    if (!siteName || !siteUrl) {
        $('#no-fillin').modal('show')
        return false
    }
    if (!siteUrl.match(regex)) {
        $('#wrong-url').modal('show')
        return false
    }
    return true
}
const saveBookMark = (e) => {
    e.preventDefault()
    const siteName = document.getElementById('siteName').value
    const siteUrl = document.getElementById('siteURL').value

    if (validateForm(siteUrl)) {
        const bookmark = {
            name: siteName,
            url: siteUrl
        }
        if (localStorage.getItem('bookmarks') === null) {
            const bookmarks = []
            bookmarks.push(bookmark)
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
        } else {
            const bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
            bookmarks.push(bookmark)
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
        }

        document.getElementById('myForm').reset()

        fetchBookmarks()
    } else return false
}
const deleteBookmark = (url) => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1)
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    fetchBookmarks()
}
const fetchBookmarks = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    const bookmarksResults = document.getElementById('bookmarksResults')
    bookmarksResults.innerHTML = ''

    for (let i = 0; i < bookmarks.length; i++) {
        const name = bookmarks[i].name
        const url = bookmarks[i].url
        bookmarksResults.innerHTML += `<div class="card  border-light  mb-3 mx-1 card-height" style="max-width: 18rem;">
                                        <div class="card-header">${name}</div>
                                        <div class="card-body row justify-content-center">
                                       
                                            <a class="btn btn-success btn-sm m-1 w-75" target="_blank" href="${url}">
                                                Visits
                                            </a>
                                            <a onclick="deleteBookmark('${url}')" class="btn btn-danger btn-sm m-1 w-75" href="#">
                                                Delete
                                            </a>
                                          
                                            </div>
                                            </div>
                                            `
    }
}
window.addEventListener('load', fetchBookmarks)
//Listen for submit
document.querySelector('#myForm').addEventListener('submit', saveBookMark)

const createModal = () => {

}