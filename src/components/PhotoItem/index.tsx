import *as styles from './styles';
type Props={
    url:string;
    name:string;
}
export function PhotoItem({name,url}:Props){

    return(
        <styles.Container>
        <img src={url} alt={name} />
        {name}
    </styles.Container>
    )
    
}