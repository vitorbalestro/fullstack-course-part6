import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'


const FilterForm = () => {

    const style = {
        marginBottom: 10
    }

    const dispatch = useDispatch()

    return(
        <div style={style}>
           filter&nbsp; <input name='filter' onChange={(event) => {
                dispatch(filterChange(event.target.value))
                }} />
        </div>
    )
    
}


export default FilterForm