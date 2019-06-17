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
        console.log("getuserfromdb func called");
        const id = getState().auth.uid;
        try {
            const res = await axios.get(`http://localhost:3000/api/user/${id}`);
            const user = res.data.data[0];
            console.log(user.name.first)
            dispatch(getuser(user.name.first, user.name.last, user._id, user.uid, user.email));
        }
        catch (err) {
            console.log(err.message);
        }
    }
}