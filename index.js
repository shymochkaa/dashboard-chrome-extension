const imgAuthor = document.getElementById('img-author')


async function getPictureFromApi() {
	
	const responce = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
	const data = await responce.json()
	const imgUrl =  data.urls.full
    document.body.style.backgroundImage = `url('${imgUrl}')`
    const authorName = data.user.name
    imgAuthor.textContent = `By: ${authorName}`
}


//  async function setBAckgroundImg(){
// 	const imgUrl = await getPictureFromApi()
// 	document.body.style.backgroundImage = `url('${imgUrl}')`
//  }
 
//  setBAckgroundImg()

getPictureFromApi()