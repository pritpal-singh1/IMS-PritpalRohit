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
    purchaseItems: purchaseItem[];
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

export class PurchaseOrder{
    PurchaseOrderId:number;
    BillNo:string;
    Date:any;
    Supplier:string;
    PurchaseType: string;
    Contact: number;
    TotalAmount: number;
    AmountPaid: number;
    Status: string;
    CreatedAt: string;
    Balance:number;
    GST:number;
    SubTotal:number;
    purchaseItems: purchaseOrderItem[];
}

export class purchaseOrderItem{
    PurchaseOrderDetailId: number;
    ProductId: number;
    ProductName: string;
    Quantity: number;
    SalePrice: number;
    Amount: number;
    GST: number;
}

export class PurchaseReturn{
    PurchaseReturnId: number;
    ReturnBillNo: string;
    PurchaseBillNo: string;
    Date: any;
    Supplier: string;
    ReturnType: string;
    TotalAmount: number;
    AmountPaid: number;
    Status: string;
    CreatedAt: string;
    Balance: number;
    GST: number;
    SubTotal: number;
    purchaseItems: PurchaseReturnItem[];
}
export class PurchaseReturnItem{
    PurchaseReturnDetailId: number;
    ProductId: number;
    ProductName: string;
    Quantity: number;
    SalePrice: number;
    Amount: number;
    GST: number;
}

