export interface Profile {
    id: string
    email: string
    full_name: string | null
    role: 'cliente' | 'funcionario' | 'admin' | 'super_admin'
    created_at?: string
}

export interface CreditAccount {
    id: string
    user_id: string
    balance: number
    created_at: string
    updated_at: string
}

export interface Transaction {
    id: string
    user_id: string
    type: 'credito' | 'debito' | 'ajuste'
    origin: 'manual' | 'compra' | 'torneio'
    amount: number
    description: string
    performed_by: string
    created_at: string
    previous_balance?: number
    new_balance?: number
}
