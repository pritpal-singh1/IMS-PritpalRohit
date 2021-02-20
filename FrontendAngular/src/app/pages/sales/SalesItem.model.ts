export class Invoice {
    InvoiceNo: string;
    Date: string;
    Contact: string;
    CustomerName: string;
    PaymentMode: string;
    TotalAmount: number;
    AmountPaid: number;
    Status: string;
    SalesItems: SalesItem[];
    GST: number;
    Balance: number;
    SubTotal: number;
    

}
export class SalesItem
{
    ProductId: number;
    Quantity: number;
    SalePrice: number;
    Amount: number;
  
}