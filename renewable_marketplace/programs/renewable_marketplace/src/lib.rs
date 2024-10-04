
use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program_pack::Pack};
use borsh::{BorshDeserialize, BorshSerialize};

declare_id!("2MGjaN45hj1tQz8N1PVBL8g7NpZ5ncWocUouh7WobM6R");

#[program]
pub mod renewable_marketplace {
    use super::*;

    // List a product on the marketplace
    pub fn list_product(
        ctx: Context<ListProduct>,
        price: u64,
        installment_plan: bool,
        installments: u8,
    ) -> ProgramResult {
        let product = &mut ctx.accounts.product;
        product.seller = *ctx.accounts.seller.key;
        product.price = price;
        product.installment_plan = installment_plan;
        product.installments = installments;
        product.sold = false;
        Ok(())
    }

    // Buyer pays installments
    pub fn pay_installment(
        ctx: Context<PayInstallment>,
        installment_amount: u64,
    ) -> ProgramResult {
        let product = &mut ctx.accounts.product;
        if product.price < installment_amount {
            return Err(ProgramError::InsufficientFunds);
        }
        product.price -= installment_amount;
        if product.price == 0 {
            product.sold = true;
        }
        Ok(())
    }

    // Initiate a dispute
    pub fn raise_dispute(ctx: Context<RaiseDispute>) -> ProgramResult {
        let dispute = &mut ctx.accounts.dispute;
        dispute.buyer = *ctx.accounts.buyer.key;
        dispute.seller = *ctx.accounts.seller.key;
        dispute.product = ctx.accounts.product.key();
        dispute.status = DisputeStatus::Open;
        Ok(())
    }

    // Resolve a dispute
    pub fn resolve_dispute(ctx: Context<ResolveDispute>, decision: bool) -> ProgramResult {
        let dispute = &mut ctx.accounts.dispute;
        if decision {
            msg!("Dispute resolved in favor of buyer.");
        } else {
            msg!("Dispute resolved in favor of seller.");
        }
        dispute.status = DisputeStatus::Resolved;
        Ok(())
    }
}

// Define state structs
#[derive(BorshSerialize, BorshDeserialize, Debug, Clone)]
pub struct Product {
    pub seller: Pubkey,
    pub price: u64,
    pub installment_plan: bool,
    pub installments: u8,
    pub sold: bool,
}

#[derive(BorshSerialize, BorshDeserialize, Debug, Clone)]
pub struct Dispute {
    pub buyer: Pubkey,
    pub seller: Pubkey,
    pub product: Pubkey,
    pub status: DisputeStatus,
}

#[derive(BorshSerialize, BorshDeserialize, Debug, Clone)]
pub enum DisputeStatus {
    Open,
    Resolved,
}

#[derive(Accounts)]
pub struct ListProduct<'info> {
    #[account(init, payer = seller, space = 100)]
    pub product: Account<'info, Product>,
    #[account(mut)]
    pub seller: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PayInstallment<'info> {
    #[account(mut)]
    pub product: Account<'info, Product>,
    #[account(mut)]
    pub buyer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RaiseDispute<'info> {
    #[account(mut)]
    pub product: Account<'info, Product>,
    #[account(init, payer = buyer, space = 200)]
    pub dispute: Account<'info, Dispute>,
    #[account(mut)]
    pub buyer: Signer<'info>,
    #[account(mut)]
    pub seller: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ResolveDispute<'info> {
    #[account(mut)]
    pub dispute: Account<'info, Dispute>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}
