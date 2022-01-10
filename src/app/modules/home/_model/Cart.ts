export interface Cart{
    id_cart: number;
    id_product: number;
    product: any;
    quantity: number;
    rfc: string;

    /**constructor(){
        this.id_cart = 0;
        this.id_product = 0;
        this.product = {};
        this.quantity = 0;
        this.rfc = "";
    }**/
}