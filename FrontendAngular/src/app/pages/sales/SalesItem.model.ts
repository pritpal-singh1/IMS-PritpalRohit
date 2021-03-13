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

export class SalesReturn{
    SalesReturnId:number;
    SalesReturnNo:string;
    InvoiceNo:number;
    Reason:string;
    Contact:string;
    Date:any;
    ClientName:string;
    PaymentMode:string;
    TotalAmount:number;
    AmountPaid:number;
    Status:string;
    CreatedAt:string;
    Balance:number;
    GST:number;
    SubTotal:number;    
    ReturnItem: ReturnItem[];
}

export class ReturnItem{
    SalesReturnDetailId:number;
    SalesReturnId:number;
    ProductId:number;
    Quantity:number;
    SalePrice:number;
    Amount:number;
    GST:number;
}