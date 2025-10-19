// Automated testimonial collection system
class TestimonialCollector {
  constructor() {
    this.triggers = [
      'claim_processed',
      'policy_activated',
      'premium_paid',
      'customer_service_resolved',
    ];
  }

  // Trigger testimonial request based on customer journey
  async triggerTestimonialRequest(customerId, triggerType, details) {
    const customer = await this.getCustomerData(customerId);

    // Wait appropriate time after trigger event
    const delayDays = this.getDelayForTrigger(triggerType);

    setTimeout(
      async () => {
        await this.sendTestimonialRequest(customer, triggerType, details);
      },
      delayDays * 24 * 60 * 60 * 1000
    );
  }

  getDelayForTrigger(triggerType) {
    const delays = {
      claim_processed: 7, // 1 week after claim
      policy_activated: 30, // 1 month after activation
      premium_paid: 14, // 2 weeks after payment
      customer_service_resolved: 3, // 3 days after resolution
    };
    return delays[triggerType] || 7;
  }

  async sendTestimonialRequest(customer, triggerType, details) {
    const templates = {
      claim_processed: {
        subject: '🎉 خسارت شما پرداخت شد - نظرتان را با ما در میان بگذارید',
        body: `
          سلام ${customer.name} عزیز،
          
          خوشحالیم که توانستیم در پرداخت خسارت شما کمکتان کنیم.
          تجربه‌تان از این فرآیند چگونه بود؟
          
          [لینک فرم نظرات]
        `,
      },
      policy_activated: {
        subject: '💙 یک ماه با دامون - نظرتان را بشنویم',
        body: `
          سلام ${customer.name},
          
          یک ماه از فعال‌سازی بیمه‌تان می‌گذرد.
          از خدمات ما راضی هستید؟
          
          [لینک فرم نظرات]
        `,
      },
    };

    const template = templates[triggerType];
    if (template) {
      // Send email
      await this.sendEmail(customer.email, template.subject, template.body);

      // Send SMS if email fails or as backup
      await this.sendSMS(
        customer.phone,
        `سلام ${customer.name}، نظرتان درباره خدمات دامون مهم است: [لینک کوتاه]`
      );
    }
  }

  async sendEmail(email, subject, body) {
    // Email implementation
    console.log(`Email sent to ${email}: ${subject}`);
  }

  async sendSMS(phone, message) {
    // SMS implementation
    console.log(`SMS sent to ${phone}: ${message}`);
  }

  async getCustomerData(customerId) {
    // Get customer data from database
    return {
      id: customerId,
      name: 'نام مشتری',
      email: 'customer@example.com',
      phone: '09123456789',
    };
  }
}

// Usage example:
const collector = new TestimonialCollector();

// When claim is processed
collector.triggerTestimonialRequest('customer123', 'claim_processed', {
  claimAmount: 5000000,
  claimType: 'درمان',
});

module.exports = TestimonialCollector;
