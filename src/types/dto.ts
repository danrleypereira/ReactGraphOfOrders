export interface Category {
    categoryId: number;
    categoryName: string | null;
}

export interface Product {
    productId: number;
    productName: string | null;
    categoryId: number;
}

export interface Brand {
    brandId: number;
    brandName: string | null;
    productId: number;
}

export interface Order {
    orderId: number;
    brandId: number;
    customerId: number;
    orderDate: string;
}
