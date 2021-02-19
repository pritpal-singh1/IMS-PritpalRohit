export class Invoice {
    InvoiceNo: string;
    Date: string;
    Contact: string;
    CustomerName: string;
    PaymentMode: string;
    TotalAmount: number;
    AmountPaid: string;
    Status: string;
    SalesItems: SalesItem[];
    GST: number;
}


export class SalesItem
{
    ProductId: number;
    Quantity: number;
    SalePrice: number;
    Amount: number;
  
}