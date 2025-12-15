import axios from 'axios'

const fetching=async()=>{
    let h=await axios.get('http://localhost:5000/name')
    return h
}
export default fetching