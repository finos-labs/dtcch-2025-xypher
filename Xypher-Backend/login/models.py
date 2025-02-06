from django.db import models
from django.contrib.auth.models import AbstractUser

class Role(models.TextChoices):
    PRESETTLEMENT = 'PRESETTLEMENT'
    INSETTLEMENT = 'INSETTLEMENT'
    POSTSETTLEMENT = 'POSTSETTLEMENT'

class User(AbstractUser):
    role = models.CharField(max_length=255, choices=Role.choices, default=Role.PRESETTLEMENT)


class Trade(models.Model):

    buy_sell_choice = (
        ('Buy', 'Buy'),
        ('Sell', 'Sell'),
    )

    trade_status_choices = (
        ('Completed', 'Completed'),
        ('Pending', 'Pending'),
        ('Failed', 'Failed'),
    )

    trade_id=models.CharField(max_length=50, primary_key=True)
    trade_date=models.DateField()

    execution_time = models.DateTimeField()

    counterparty_1_name = models.CharField(max_length=255)
    counterparty_1_account_id = models.CharField(max_length=50,null=True, blank=True)
    counterparty_1_country = models.CharField(max_length=50)
    counterparty_2_name = models.CharField(max_length=255)
    counterparty_2_account_id = models.CharField(max_length=50,null=True, blank=True)
    counterparty_2_country = models.CharField(max_length=50)

    instrument_type = models.CharField(max_length=50)
    instrument_CUSIP = models.CharField(max_length=50)

    trade_quantity = models.PositiveBigIntegerField()
    trade_price = models.DecimalField(max_digits=10, decimal_places=2)
    trade_currency = models.CharField(max_length=10)
    trade_notional_value = models.DecimalField(max_digits=15, decimal_places=2)

    settlement_date = models.DateField()
    settlement_currency = models.CharField(max_length=10)
    settlement_status = models.CharField(max_length=20, choices=trade_status_choices, default='Pending')
    clearing_house_source = models.CharField(max_length=255)
    settlement_account_number = models.CharField(max_length=50)

    trade_reference_id = models.CharField(max_length=50)
    source_system = models.CharField(max_length=255)
    last_updated = models.DateTimeField(auto_now=True)
    risk_score = models.DecimalField(max_digits=4, decimal_places=2)

    buy_or_sell = models.CharField(max_length=4, choices=buy_sell_choice)

    def _str_(self):
        return f"Trade {self.trade_id} - {self.buy_or_sell.upper()} {self.quantity} @ {self.price}"