import BaseModelAPI from "../BaseModelAPI";
import axiosClient from "../axiosClient";
import { API_PROJECT_MODEL } from "./const";

class ProjectApiRequest extends BaseModelAPI {
    constructor() {
        super(API_PROJECT_MODEL.url);
    }

    async discussOption<T>() {
        return this.makeRequest<T>(axiosClient.options, { method: API_PROJECT_MODEL.methods.discuss.url});
    }
    // async moveApplicantFound<T>(id:string, body?: any) {
    //     return this.makeRequest<T>(axiosClient.post, {id: id  + "/", method: API_PROJECT_MODEL.methods.moveApplicantFound.url, body});
    // }
}

export default ProjectApiRequest