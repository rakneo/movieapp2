import axios from 'axios';

export const getuser = (firstname, lastname, id, uid ,email) => ({
    type : 'GETUSER',
    firstname:firstname,
    lastname:lastname,
    id:id,
    uid:uid,
    email:email
})

export const getUserFromDB = () => {
    return async (dispatch, getState) =>{
        const id = getState().auth.uid;
        const providerId = getState().auth.providerId;
        
        try {
            const res = await axios.get(`http://139.59.71.68/api/user/${id}`);
            const user = res.data.data[0];
            dispatch(getuser(user.name.first, user.name.last, user._id, user.uid, user.email));
        }
        catch (err) {
            console.log(err.message);
        }
    }
}