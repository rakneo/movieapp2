    
export default (state = {}, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...action
        };
      case 'LOGOUT':
        return {};
      default:
        return state;
    }
  };