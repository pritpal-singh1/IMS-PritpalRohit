export class Invoice {
    SalesOrderOfflineId: number;
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
    SalesOrderOfflineDetailId: number;
    SalesOrdersOfflineId: number;
    ProductId: number;
    ProductName: string;
    Quantity: number;
    SalePrice: number;
    Amount: number;
    GST: number;
  
}