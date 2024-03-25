interface IContentCard {
    content_type: string;
    file: string | null;
    file_name: string | null;
    gallery: any | null;
    id: number;
    image: string | null;
    order: number;
    text: string;
    url: string | null;
    url_name: string;
}


export interface IDataCardOpen {
    title: string;
    date: string;
    id: number | string;
    contents:IContentCard[]
}