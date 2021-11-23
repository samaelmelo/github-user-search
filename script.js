
const button = document.querySelector('form button')
button.addEventListener('click', event => {
  const name = document.querySelector('#text').value
  event.preventDefault()

  if(!name){
    confirm('Insira um valor válido para pesquisa!!!')
    return
  }
  request(name)
})

const request = async (name) => {
  const data = await fetch(`https://api.github.com/users/${name}`)
  const json = await data.json().catch(error => console.error('ERRO ['+error+']'))
  verifydata(json)
  
}

const verifydata = (json) => {
  console.log(json);
  const data = {
    login: json.login,
    avatar: json.avatar_url,
     followers: json.followers,
     following: json.following,
     location: json.location ? json.location : 'Not informed by the user',
     repository: json.public_repos,
     bio: json.bio,
     url: json.html_url,
     twitter: json.twitter_username ?? 'Not Available' 
     
    }
    
    updateProfile(data)

}

const updateProfile = (data) => {
  const login = document.querySelector('.dashboard-profile .header h1').innerHTML = data.login
  const avatar = document.querySelector('.dashboard-avatar img')
  const bio = document.querySelector('.dashboard-profile .bio').innerHTML = data.bio
  const respository = document.querySelector('.repos strong').innerHTML = data.repository
  const followers = document.querySelector('.followers strong').innerHTML = data.followers
  const following = document.querySelector('.following strong').innerHTML = data.following
  const city = document.querySelector('.dashboard-social-media .city').innerHTML = data.location
  const twitter = document.querySelector('.dashboard-social-media .desable').innerHTML = data.twitter
  const link = document.querySelector('.dashboard-social-media .link')

  link.innerHTML = data.url
  link.setAttribute('href', data.url)
  avatar.setAttribute('src',data.avatar)
  avatar.setAttribute('alt', data.login)

}

// const buttonLight = document.querySelector('.material-icons-outlined')

// buttonLight.addEventListener('click', event => {
//   const changeValue = (component, color) => {
//     document.body.style.background = color
//   }
//   if(event.target.className === "material-icons-outlined"){
//     changeValue('#ddd')
//     // document.body.style.color = "#03172e;"
//   }
// })

