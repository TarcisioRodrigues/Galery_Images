import {Photo} from '../types/Photo';
import {storage} from '../libs/firebase';
import {ref,listAll,getDownloadURL,uploadBytes} from 'firebase/storage';
import {v4 as createId} from 'uuid'
//Função que ler as fotos
export async function getAll(){
let list:Photo[]=[];
const imagesFolder=ref(storage,"images");
const photoList=await listAll(imagesFolder);

for (let i in photoList.items){
    let photoUrl=await getDownloadURL(photoList.items[i])
    list.push({
        name:photoList.items[i].name,
        url:'photUrl'
    })
}
return list;
}
//Função que enviar as fotos

export async function insert(file:File){
    if(['image/jpeg','image/jpg','image/png'].includes(file.type)){
        let randomName=createId();
        let newFile=ref(storage,`images/${randomName}`)
        let upload =await uploadBytes(newFile,file)
        let photourl=await getDownloadURL(upload.ref)

        return{
            name:upload.ref.name,
            url:photourl
        }as Photo

    }else{
        return new Error("Tipo de arquivo não permitido");
        
    }
}