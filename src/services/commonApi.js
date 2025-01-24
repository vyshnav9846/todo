import commonAPI from "./allApi";
import serverUrl from "./serverURL";
export const saveTodoApi = async (todoDetails) => {
   return await commonAPI("POST", `${serverUrl}/allTodo`, todoDetails)

}
export const getAllTodoApi = async () => {
   return await commonAPI("GET", `${serverUrl}/allTodo`, "")

}
export const deleteTodoApi = async (id) => {
   return await commonAPI("DELETE", `${serverUrl}/allTodo/${id}`, "")

}


