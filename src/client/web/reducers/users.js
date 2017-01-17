/**
 * Created by liujinhe on 17/1/5.
 */


const initial_state = {
    loaded: false
}

const handler = {
    'retrieving users': (state)=> {

        console.log('come to retrieving users');
        const new_state = {
            ...state,
            loading: true
        }
        return new_state;
    },
    'users retrieved': (state, result)=> {

        console.log('come to users retrieved');
        console.log('result :'+JSON.stringify(result));
        const new_state = {
            ...state,
            loaded: true,
            loading:false,
            stale   : false,
            users: result
        }
        return new_state;
    },
    'users retrieval failed':(state,error)=>{
        const new_state={
            ...state,
            loading:false,
            loading_error:error
        }

        return new_state;

    },
    'adding user':(state)=>{

        const new_state={
            ...state,
            adding:true
        }

        return new_state;
    },
    'user added':(state)=>{
        console.log('user added :'+JSON.stringify(state));

        const new_state={
            ...state,
            adding:false,
            stale:true
        }

        return new_state;
    },
    'adding user failed':(state,error)=>{

        const new_state={
            ...state,
            adding:false,
            adding_error:error
        }

        return new_state

    },
    'deleting user':(state)=>{

        const new_state={
            ...state,
            deleting:true
        }
        return new_state
    },
    'user deleted':(state)=>{

        const new_state={
            ...state,
            deleting:false,
            stale  : true

        }
        return new_state;
    },
    'user deleted error':(state)=>{
        const new_state={
            ...state,
            deleting:false,
            deleting_error : error
        }

        return new_state

    }


}

export default function (state = initial_state, action = {}) {

    return (handler[action.type] || ((state)=>(state)))(state, action.res || action.error)

}

