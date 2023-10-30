
export interface Document {
    product_id: number | null;
    product_name: string;
    text_field: string;
    text_color: string;
    bg_color: string;
    date: string;
  }

export interface shortDoc {
    product_id: number | null;
    product_name: string;
    text_field: string;
    text_color: string;
    bg_color: string;
}
  
export  interface DocumentAPI {
    products: Document[];
  }