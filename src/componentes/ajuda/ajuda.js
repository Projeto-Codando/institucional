import './ajuda.css'
import ajudaIcon from '../../imgs/icon_help.svg'
function Ajuda(){
    return(
    <div className='ajudaIcon'>
        <img src={ajudaIcon} style={{cursor: 'pointer'}}/>
    </div>
    )
}
export default Ajuda