export class PurchaseBill{
    PurchaseBillId:number;
    BillNo: string;
    Date: any;
    Supplier: string;
    PurchaseType: string;
    Contact: number;
    SubTotal:number;
    GST:number;
    TotalAmount: number;
    AmountPaid:number;
    Status: string;
    CreatedAt: string;
    Balance:number;
    purchaseItem: purchaseItem[];
}

export class purchaseItem{
    PurchaseBillDetailId:number;
    ProductId: number;
    ProductName: string;
    Quantity: number;
    SalePrice: number;
    Amount: number;
    GST: number;
}