import commonAPI from "./allApi";
import serverUrl from "./serverURL";
export const saveTodoApi = async (todoDetails) => {
   return await commonAPI("POST", `${serverUrl}`, todoDetails)

}
export const getAllTodoApi = async () => {
   return await commonAPI("GET", `${serverUrl}`, "")

}
export const deleteTodoApi = async (id) => {
   return await commonAPI("DELETE", `${serverUrl}/${id}`, "")

}


