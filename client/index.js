

const imageRender = document.getElementById('imageRender')
const uploader = document.getElementById('uploader')
const progresBar = document.getElementById('ProgressBar')
const url = 'http://localhost:3001'
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dg7galjwj/image/upload'
const CLOUDINARY_PRESET = 'xa8l6w7k'
const sendButton = document.getElementById('sendDataButton')
const deleteButton = document.querySelector('.delete')
const updateButton = document.querySelector('.update')
const inputs = document.querySelectorAll('.input')
const deleteInput = document.getElementById('deleteInput')

console.log(inputs)

let newProduct = {
    name:'',
    price:0,
    stock:0,
    image:'',
}

uploader.addEventListener('change',async (event)=>{
    const file =event.target.files[0]

    const response = await CreateForm(CLOUDINARY_URL, CLOUDINARY_PRESET, file)
    imageRender.src = response.data.url

    newProduct.image = response.data.url

})

inputs.forEach(input => {
    input.addEventListener('change', (e)=>{
        newProduct[e.target.name] = e.target.value
        console.log(newProduct)
    })

    
})

sendButton.addEventListener('click', async (event)=>{
    event.preventDefault()
    const response = await axios.post(url, newProduct)
    if(response.data.status === 'created'){
        
        reset('creado con exito')
    }
})

deleteButton.addEventListener('click', async (e)=>{
    e.preventDefault()
    const deleted = await axios.delete(url + "/" + deleteInput.value)
    if(deleted.data.status === 'deleted'){
        reset('eliminado con exito')
    }
})

updateButton.addEventListener('click', async (e)=>{
    e.preventDefault()
    const updateData = {...newProduct, id:deleteInput.value}
    console.log(updateData)
    const updated = await axios.put(url, updateData)
    if(updated.data.status === 'updated'){
        reset('actualziado con exito')
    }
    console.log(updated)

})

async function CreateForm(url, preset, file){
     const formData = new FormData()

    formData.append('file', file)
    formData.append('upload_preset', preset)

    console.log(formData)
    const res = await axios.post(url, formData, {
        headers:{
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress(e){
            const progress = Math.round((e.loaded * 100) / e.total)
            progresBar.setAttribute('value', progress)
            if(progress == 100){
                setTimeout(()=>{
                       progresBar.setAttribute('value', 0)
                },3000)
             
            }
        }
    })
    return res
}


function reset (mensaje){
    newProduct = {
        name:'',
        price:0,
        stock:0,
        image:'',
    },
    inputs.forEach(Im=> {
        Im.value = ''
    })
    deleteInput.value = ''
    imageRender.src = 'https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg'
    alert(mensaje)
}