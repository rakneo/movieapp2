

export default (state={}, action) =>{
    switch(action.type){
        case 'GETUSER':
            return{
                  firstname: action.firstname,
                  lastname: action.lastname,
                  _id: action.id,
                  uid: action.uid,
                  email: action.email,
            }
        default:
            return state
    }
}