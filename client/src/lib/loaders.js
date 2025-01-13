import { defer } from "react-router-dom"
import { apiRequest } from "../Services/apiRequest"

export const singlePageLoader = async ({ req, params }) => {
    const response = await apiRequest.post('/posts' + params.id)
    return response.data
}
export const listPageLoader = async ({ req }) => {
    const query = req.url.split('?')[1]
    const postPromise = apiRequest("/posts?" + query);
    return defer({
        postResponse: postPromise,
    });
}