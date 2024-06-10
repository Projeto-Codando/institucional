import './ajuda.css'
import ajudaIcon from '../../imgs/icon_help.svg'
function Ajuda(){
    return(
    <div className='ajudaIcon'>
        <img src={ajudaIcon} style={{cursor: 'pointer'}} alt='Icone de ajuda'/>
    </div>
    )
}
export default Ajuda