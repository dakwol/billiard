export interface IDataCard {
    id: number | string;
    title: string;
    header_file: string;
    header_html: string;
    description:string;
    url:string;
    column:string | number;
    order:string | number;
}