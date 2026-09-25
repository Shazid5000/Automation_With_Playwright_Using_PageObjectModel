class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.companyInput = page.locator('#BillingNewAddress_Company');
    this.countrySelect = page.locator('#BillingNewAddress_CountryId');
    this.stateSelect = page.locator('#BillingNewAddress_StateProvinceId');
    this.cityInput = page.locator('#BillingNewAddress_City');
    this.address1Input = page.locator('#BillingNewAddress_Address1');
    this.address2Input = page.locator('#BillingNewAddress_Address2');
    this.zipInput = page.locator('#BillingNewAddress_ZipPostalCode');
    this.phoneInput = page.locator('#BillingNewAddress_PhoneNumber');
    this.faxInput = page.locator('#BillingNewAddress_FaxNumber');
    
    this.billingContinueBtn = page.locator('#billing-buttons-container input.new-address-next-step-button');
    this.shippingContinueBtn = page.locator('#shipping-buttons-container input.new-address-next-step-button');
    this.shippingMethodContinueBtn = page.locator('#shipping-method-buttons-container input.shipping-method-next-step-button');
    this.paymentMethodContinueBtn = page.locator('#payment-method-buttons-container input.payment-method-next-step-button');
    this.paymentInfoContinueBtn = page.locator('#payment-info-buttons-container input.payment-info-next-step-button');
    this.confirmOrderBtn = page.locator('#confirm-order-buttons-container input.confirm-order-next-step-button');

    this.orderDetailsLink = page.locator('a:has-text("Click here for order details.")');
  }

  async fillBillingAddress(data) {
    // Wait explicitly for the address form elements to render
    await this.countrySelect.waitFor({ state: 'visible', timeout: 10000 });

    if (data.company) await this.companyInput.fill(data.company);
    
    // Select Country by value '1' (United States) or exact label text
    await this.countrySelect.selectOption({ label: data.country });

    // Handle state selection after country change triggers potential state loading
    await this.page.waitForTimeout(500); 
    const stateOptionsCount = await this.stateSelect.locator('option').count();
    if (stateOptionsCount > 1 && data.state) {
      await this.stateSelect.selectOption({ label: data.state });
    }

    await this.cityInput.fill(data.city);
    await this.address1Input.fill(data.address1);
    if (data.address2) await this.address2Input.fill(data.address2);
    await this.zipInput.fill(data.zip);
    await this.phoneInput.fill(data.phone);
    if (data.fax) await this.faxInput.fill(data.fax);

    await this.billingContinueBtn.click();
  }

  async completeCheckoutSteps() {
    await this.shippingContinueBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.shippingContinueBtn.click();

    await this.shippingMethodContinueBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.shippingMethodContinueBtn.click();

    await this.paymentMethodContinueBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.paymentMethodContinueBtn.click();

    await this.paymentInfoContinueBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.paymentInfoContinueBtn.click();

    await this.confirmOrderBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.confirmOrderBtn.click();
  }

  async goToOrderDetails() {
    await this.orderDetailsLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.orderDetailsLink.click();
  }
}

module.exports = CheckoutPage;