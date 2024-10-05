
use anchor_lang::prelude::*;

declare_id!("2MGjaN45hj1tQz8N1PVBL8g7NpZ5ncWocUouh7WobM6R");

#[program]
pub mod renewable_marketplace {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    // List a product on the marketplace
    pub fn list_product(
        ctx: Context<ListProduct>,
        price: u64,
        installment_plan: bool,
        installments: u8,
    ) -> Result<()> {
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
    ) -> Result<()> {
        let product = &mut ctx.accounts.product;
        if product.price < installment_amount {
            return Err(ProgramError::InsufficientFunds.into());
        }
        product.price -= installment_amount;
        if product.price == 0 {
            product.sold = true;
        }
        Ok(())
    }

    // Initiate a dispute
    pub fn raise_dispute(ctx: Context<RaiseDispute>) -> Result<()> {
        let dispute = &mut ctx.accounts.dispute;
        dispute.buyer = *ctx.accounts.buyer.key;
        dispute.seller = *ctx.accounts.seller.key;
        dispute.product = ctx.accounts.product.key();
        dispute.status = 0;
        Ok(())
    }

    // Resolve a dispute
    pub fn resolve_dispute(ctx: Context<ResolveDispute>, decision: bool) -> Result<()> {
        let dispute = &mut ctx.accounts.dispute;
        if decision {
            msg!("Dispute resolved in favor of buyer.");
        } else {
            msg!("Dispute resolved in favor of seller.");
        }
        dispute.status = 1;
        Ok(())
    }
}

#[account]
pub struct Product {
    pub seller: Pubkey,
    pub price: u64,
    pub installment_plan: bool,
    pub installments: u8,
    pub sold: bool,
}

impl Product {
    pub const LEN: usize = (
        1 + 32 +
        1 + 8 +
        1 + 1 +
        1 + 1 +
        1 + 1
    );
}

#[account]
pub struct Dispute {
    pub buyer: Pubkey,
    pub seller: Pubkey,
    pub product: Pubkey,
    pub status: u8, // 0 = Open , 1= Resolved
}

impl Dispute {
    pub const LEN: usize = (
        1 + 32 +
        1 + 32 +
        1 + 32 +
        1 + 1 
    );
}

// #[derive(BorshSerialize, BorshDeserialize, Debug, Clone)]
// pub enum DisputeStatus {
//     Open,
//     Resolved,
// }


#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
}

#[derive(Accounts)]
pub struct ListProduct<'info> {
    #[account(init, payer = seller, space = Product::LEN)]
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
    #[account(init, payer = buyer, space = Dispute::LEN)]
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
