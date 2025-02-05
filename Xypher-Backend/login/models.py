from django.db import models
from django.contrib.auth.models import AbstractUser

class Role(models.TextChoices):
    PRESETTLEMENT = 'PRESETTLEMENT'
    INSETTLEMENT = 'INSETTLEMENT'
    POSTSETTLEMENT = 'POSTSETTLEMENT'

class User(AbstractUser):
    role = models.CharField(max_length=255, choices=Role.choices, default=Role.PRESETTLEMENT)


class Trade(models.Model):
    primary_asset_class_choice=(
        ('equity','Equity'),
        ('debt','Debt')
    )

    secondary_asset_class_choice=(
        ('shares','Shares'),
        ('preffered_shares','Preffered Shares'),
        ('bonds','Bonds'),
        ('medium_term','Medium Term'),
        ('asset_backed_securities','Asset Backed Securities'),
        ('mortage_backed_securities','Mortage Backed Securities'),
        ('depository_receipts','Depository Receipts'),
        ('money_market_instrument','Money_Market_Instrument')
    )

    buy_sell_choice = (
        ('buy', 'Buy'),
        ('sell', 'Sell'),
    )

    counterparty_type_choice=(
        ('individual','Individual'),
        ('institution','Institution')
    )

    risk_choices = (
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    )

    trade_history_choice=(
        ('suspicious','Suspicious'),
        ('legitimate','Legitimate')
    )

    trade_status_choices = (
        ('approved', 'Approved'),
        ('pending', 'Pending'),
        ('rejected', 'Rejected'),
    )

    trade_id=models.CharField(max_length=50, primary_key=True)
    trade_date=models.DateTimeField()
    primary_asset_class=models.CharField(max_length=20,choices=primary_asset_class_choice)
    secondary_asset_class=models.CharField(max_length=50,choices=secondary_asset_class_choice)
    isin=models.CharField(max_length=40)
    buy_or_sell = models.CharField(max_length=4, choices=buy_sell_choice)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=15, decimal_places=2)
    instrument_name=models.CharField(max_length=60)
    status = models.CharField(max_length=20, choices=trade_status_choices, default='pending')

    counterparty_id = models.CharField(max_length=50)
    counterparty_type = models.CharField(max_length=20, choices=counterparty_type_choice) 
    counterparty_risk_rating = models.CharField(max_length=20, choices=risk_choices) 

    market_price = models.DecimalField(max_digits=15, decimal_places=2)  
    market_volatility = models.DecimalField(max_digits=4, decimal_places=2)  
    market_liquidity = models.CharField(max_length=20, choices=risk_choices) 

    trade_history = models.CharField(max_length=20, choices=trade_history_choice)
    trade_frequency = models.CharField(max_length=10, choices=risk_choices) 

    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True) 

    def __str__(self):
        return f"Trade {self.trade_id} - {self.buy_or_sell.upper()} {self.quantity} @ {self.price}"

# class Task_Description(models.Model):
#     task_status_choices = (
#         ('approved', 'Approved'),
#         ('pending', 'Pending'),
#         ('rejected', 'Rejected'),
#     )

#     task_id = models.AutoField(primary_key=True)
#     title=models.CharField(max_length=300)
#     status = models.CharField(max_length=20, choices=task_status_choices, default='pending')
#     comment = models.CharField(max_length=300)
#     trade=models.ForeignKey(Trades,on_delete=models.CASCADE)

#     created_at = models.DateTimeField(auto_now_add=True) 
#     updated_at = models.DateTimeField(auto_now=True) 

#     def __str__(self):
#         return f"Task {self.task_id}: {self.title} ({self.status})"