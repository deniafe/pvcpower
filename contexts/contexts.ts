// import React, {createContext, useReducer, Dispatch} from 'react';
// import {UserReducer, UserActions} from  '../reducers/reducers'

// type UserType = {
//   id: number;
//   firstName: string;
//   lastName: string;
//   phoneNumber: number;
//   email: string;
// };

// const userState = {
//   id: 0,
//   firstName: '',
//   lastName: '',
//   phoneNumber: 0,
//   email: '',
// }

// export const UserContext = createContext<{
//   state: UserType;
//   dispatch: Dispatch<UserActions>;
// }>({
//   state: userState,
//   dispatch: () => null
// })


// // export const UserContextProvider = (props)=>{
// //     const [user, dispatchUser] = useReducer(UserReducer, {
// //         id: '',
// //         firstName: '',
// //         lastName: '',
// //         phoneNumber: null,
// //         email: '',
// //     })
// //     return(
// //         <UserContext.Provider
// //                 value ={{user, dispatchUser}}
// //             >
// //             {props.children}
// //         </UserContext.Provider>
// //     )
// // }

// export const UserProvider: React.FC = ({ children }) => {
//   const [state, dispatch] = useReducer(UserReducer, userState);

//   return (
//     <UserContext.Provider value={{ state, dispatch }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
