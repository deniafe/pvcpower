// type ActionMap<M extends { [index: string]: any }> = {
//   [Key in keyof M]: M[Key] extends undefined
//     ? {
//         type: Key;
//       }
//     : {
//         type: Key;
//         payload: M[Key];
//       }
// };


// export enum Types {
//   Create = "CREATE_PRODUCT",
//   Delete = "DELETE_PRODUCT",
//   Add = "ADD_PRODUCT"
// }


// type UserType = {
//   id: number;
//   firstName: string;
//   lastName: string;
//   phoneNumber: number;
//   email: string;
// };

// type UserPayload = {
//   [Types.Create]: {
//     id: number;
//     firstName: string;
//     lastName: string;
//     phoneNumber: number;
//     email: string;
//   };
//   [Types.Delete]: {
//     id: number;
//   };
// };

// export type UserActions = ActionMap<UserPayload>[keyof ActionMap<
//   UserPayload
// >];



// export const productReducer = (
//   state: UserType,
//   action: UserActions 
// ) => {
//   switch (action.type) {
//     case Types.Create:
//       return [
//         ...state,
//         {
//           id: action.payload.id,
//           name: action.payload.name,
//           price: action.payload.price
//         }
//       ];
//     case Types.Delete:
//       return [...state.filter(product => product.id !== action.payload.id)];
//     default:
//       return state;
//   }
// };



// export const UserReducer = (state, action)=>{
//   switch(action.type){
//       case 'ADD_USER':
//               return{
//                   id: action.payload.id,
//                   firstName: action.payload.firstName,
//                   lastName: action.payload.lastName,
//                   phoneNumber: action.payload.phoneNumber,
//                   email: action.payload.email,
//               }
//           default:
//               return state
//   }
// }
