import BaseModelAPI from "../BaseModelAPI";
import axiosClient from "../axiosClient";
import { API_ABOUTUS_MODEL } from "./const";

class AboutUsApiRequest extends BaseModelAPI {
    constructor() {
        super(API_ABOUTUS_MODEL.url);
    }

    async runningLines<T>() {
        return this.makeRequest<T>(axiosClient.get, { method: API_ABOUTUS_MODEL.methods.runningLines.url});
    }
    async contacts<T>() {
        return this.makeRequest<T>(axiosClient.get, { method: API_ABOUTUS_MODEL.methods.contacts.url});
    }
    async contactsGetActive<T>() {
        return this.makeRequest<T>(axiosClient.get, { method: API_ABOUTUS_MODEL.methods.contactsGetActive.url});
    }
    async customerLinks<T>() {
        return this.makeRequest<T>(axiosClient.get, { method: API_ABOUTUS_MODEL.methods.customerLinks.url});
    }
    async requisites<T>() {
        return this.makeRequest<T>(axiosClient.get, { method: API_ABOUTUS_MODEL.methods.requisites.url});
    }
    async requisitesOptions<T>() {
        return this.makeRequest<T>(axiosClient.options, { method: API_ABOUTUS_MODEL.methods.requisites.url});
    }
}

export default AboutUsApiRequest