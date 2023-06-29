export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    passwords: Password[];
    notes: Note[];
    creditCards: CreditCard[];
    settings: Setting[];
    userId: string;
}

export interface Password {
    id: string;
    title?: string;
    url: string;
    username: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export interface Note {
    id: string;
    name: string;
    content: string;
    color: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreditCard {
    id: string;
    name: string;
    number: string;
    expirationDate: Date;
    securityCode: string;
    createdAt: string;
    updatedAt: string;
}

export interface Setting {
    theme: string;
    userId: string;
}

export interface IDropdownOption {
    value: any;
    icon?: string;
    iconColor?: string;
    label: string;
    selected?: boolean;
}
