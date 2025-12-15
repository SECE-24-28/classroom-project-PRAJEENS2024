// import { INCREMENT,DECREMENT } from "./Actions";
const initialstate={items:[{id:1,name:"bottle",price:30}],
                    users:[{id:'u_1',name:"praveen",
                            orders:[]
                     }]}
const reducer=(state=initialstate,action)=>{
    switch(action.type){
        case 'ADD_ITEM':
           let n_item= {...action.payload,id:state.items[state.items.length-1].id+1}
            return {...state,items:[...state.items,n_item]}
        case 'ORDER_ITEM':
        
            let d= {...state,users:state.users.map(u=>
                u.id==action.payload.id?
                {...u,orders:[...u.orders,action.payload.item]}
                :u
            )}
            console.log(d)
            return d
            // let user=state.users.filter(u=>u.id==action.payload.id)

        //     let order=[...user[0].orders,action.payload.item]
        //    return {...state,users:[...state.users,{...state.users[0],orders:order}]}
        default:
            return state
    }
}
export default reducer