import React,{useState,useEffect, FormEvent} from 'react';
import { PhotoItem } from './components/PhotoItem';

import *as Photos from './services/photos';
import * as styles from './styles/App.styles';
import{ Photo} from './types/Photo'

function App() {
  const [uploading,setUploading]=useState(false)
  const [loading,setloading]=useState(false);
  const [photos,setPhotos]=useState<Photo[]>([]);
  useEffect(()=>{
    //Função de carregamento
   async function getPhotos(){
      setloading(true)
      setPhotos(await Photos.getAll())
      setloading(false)
   } 
   getPhotos();
  },[])
  async function  handleFormSubmit( e:FormEvent<HTMLFormElement>){
    e.preventDefault()
    const formData=new FormData(e.currentTarget);
    const file=formData.get('image') as File;
    if(file &&file.size>0){
        setUploading(true)
        //Faz o envio do arquivo
        let result=await Photos.insert(file)
        setUploading(false)
        if(result instanceof Error){
          alert(`${result.name}-${result.message}`)
        }else{
          //Fazendo um clone da lista
          let newPhotoList=[...photos]
          newPhotoList.push(result)
          setPhotos(newPhotoList)
        }
    }
  }
  return (
 <styles.Container>
   <styles.Area>
     <styles.Header>
       Galeria de fotos
     </styles.Header>
     <styles.UploadForm method="POST" onSubmit={handleFormSubmit} >
       <input type="file" name="image"  />
       <input type="submit" value="Enviar" />
       {uploading &&"Enviando ..."}
     </styles.UploadForm>
      {loading && 
      <styles.Screen>
        <div className='emoji'>🤞 </div>
        <div>Carregando</div>
      </styles.Screen>
      }
      {!loading&&photos.length>0 &&
      <styles.PhotoList>
        {photos.map((item,index)=>(
        <PhotoItem key={index} url={item.url} name={item.name} />
        ))}
      </styles.PhotoList>
      }
      {!loading &&photos.length===0 &&
        <styles.Screen>
        <div className='emoji'>😅  </div>
        <div>Sem foto</div>
      </styles.Screen>
      }
      
   </styles.Area>
 </styles.Container>
  );
}

export default App;
