// Enhanced Customer Invitation System with Automation
const express = require('express');
const router = express.Router();

// Mock customer database with satisfaction tracking
const customerDatabase = [
  {
    id: 1,
    name: 'احمد محمدی',
    email: 'ahmad@example.com',
    phone: '09121234567',
    policyNumber: 'POL-2024-001',
    claims: [
      {
        id: 'CLM-001',
        date: '1403/03/15',
        amount: '5,000,000 تومان',
        type: 'تصادف',
        status: 'تسویه شده',
        satisfactionScore: 9, // 1-10
        processingDays: 2,
      },
    ],
    invitations: [],
    lastInteraction: '1403/03/17',
  },
  {
    id: 2,
    name: 'فاطمه احمدی',
    email: 'fateme@example.com',
    phone: '09121234568',
    policyNumber: 'POL-2024-002',
    claims: [
      {
        id: 'CLM-002',
        date: '1403/04/20',
        amount: '12,000,000 تومان',
        type: 'آتش‌سوزی',
        status: 'تسویه شده',
        satisfactionScore: 8,
        processingDays: 5,
      },
    ],
    invitations: [
      {
        id: 'INV-001',
        sentAt: '1403/05/01',
        method: 'email',
        status: 'sent',
        opened: true,
        clicked: false,
      },
    ],
    lastInteraction: '1403/05/01',
  },
];

const invitationTemplates = {
  email: {
    initial: {
      subject: '🌟 نظر شما درباره خدمات بیمه دامون',
      body: `
        <div dir="rtl" style="font-family: Tahoma, Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f66e20, #ff8a50); padding: 2rem; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 1.8rem;">🏆 بیمه دامون</h1>
            <p style="color: white; margin: 0.5rem 0 0 0; opacity: 0.9;">اعتماد شما، افتخار ما</p>
          </div>
          
          <div style="background: white; padding: 2rem; border-radius: 0 0 12px 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <h2 style="color: #f66e20; margin-bottom: 1rem;">سلام {{customerName}} عزیز 👋</h2>
            
            <p style="line-height: 1.8; color: #333;">
              امیدواریم از خدمات بیمه دامون راضی بوده‌اید. 
              با توجه به تسویه موفق خسارت شما به مبلغ <strong>{{claimAmount}}</strong> 
              در تاریخ <strong>{{claimDate}}</strong>، خوشحال می‌شویم اگر تجربه خود را با ما و سایر مشتریان به اشتراک بگذارید.
            </p>
            
            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
              <h3 style="color: #f66e20; margin: 0 0 1rem 0;">✨ چرا نظر شما مهم است؟</h3>
              <ul style="margin: 0; padding-right: 1.5rem; color: #555;">
                <li>به ما کمک می‌کند خدمات بهتری ارائه دهیم</li>
                <li>به سایر مشتریان در انتخاب کمک می‌کند</li>
                <li>تنها 2 دقیقه از وقت شما می‌گیرد</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 2rem 0;">
              <a href="{{testimonialLink}}" 
                 style="background: linear-gradient(135deg, #f66e20, #ff8a50); 
                        color: white; 
                        padding: 1rem 2rem; 
                        text-decoration: none; 
                        border-radius: 25px; 
                        display: inline-block;
                        font-weight: bold;
                        box-shadow: 0 4px 15px rgba(246, 110, 32, 0.3);
                        transition: transform 0.3s ease;">
                📝 ثبت نظر من درباره دامون
              </a>
            </div>
            
            <div style="background: #e8f5e8; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
              <p style="margin: 0; color: #2d5a2d; text-align: center;">
                🎁 <strong>پیشنهاد ویژه:</strong> با ثبت نظر، 10% تخفیف بر روی تمدید بیمه بعدی دریافت کنید!
              </p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 2rem 0;">
            
            <div style="text-align: center; color: #666; font-size: 0.9rem;">
              <p>اگر نمی‌خواهید این نوع ایمیل دریافت کنید، <a href="{{unsubscribeLink}}" style="color: #f66e20;">اینجا کلیک کنید</a></p>
              <p style="margin: 1rem 0 0 0;">
                <strong>بیمه دامون</strong><br>
                📞 تلفن: 021-1234567 | 📧 ایمیل: info@damuon.com
              </p>
            </div>
          </div>
        </div>
      `,
    },
    followUp: {
      subject: '🔔 یادآوری: نظر شما درباره خدمات دامون',
      body: `
        <div dir="rtl" style="font-family: Tahoma, Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2196F3, #42A5F5); padding: 1.5rem; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 1.5rem;">💙 بیمه دامون</h1>
          </div>
          
          <div style="background: white; padding: 2rem; border-radius: 0 0 12px 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <h2 style="color: #2196F3;">سلام مجدد {{customerName}} عزیز 😊</h2>
            
            <p style="line-height: 1.8; color: #333;">
              چند روز پیش برای ثبت نظر درباره خدمات دامون دعوتتان کردیم. 
              احتمالاً مشغله‌های زیادی دارید، اما اگر 2 دقیقه وقت دارید، خیلی خوشحال می‌شویم نظرتان را بشنویم.
            </p>
            
            <div style="text-align: center; margin: 2rem 0;">
              <a href="{{testimonialLink}}" 
                 style="background: #2196F3; 
                        color: white; 
                        padding: 1rem 2rem; 
                        text-decoration: none; 
                        border-radius: 25px; 
                        display: inline-block;
                        font-weight: bold;">
                💬 ثبت نظر (فقط 2 دقیقه)
              </a>
            </div>
            
            <p style="color: #666; font-size: 0.9rem; text-align: center;">
              اگر نمی‌خواهید یادآوری دریافت کنید، <a href="{{unsubscribeLink}}" style="color: #f66e20;">اینجا کلیک کنید</a>
            </p>
          </div>
        </div>
      `,
    },
  },
  sms: {
    initial: `سلام {{customerName}} عزیز
از خدمات دامون راضی بودید؟ 
نظرتون رو با ما به اشتراک بذارید:
{{shortLink}}
🎁 10% تخفیف تمدید بیمه
بیمه دامون`,
    followUp: `{{customerName}} عزیز، نظرتون درباره دامون مهمه
فقط 2 دقیقه:
{{shortLink}}
بیمه دامون`,
  },
};

// 🎯 Smart Customer Identification for Testimonial Invitations
router.get('/admin/customers/testimonial-candidates', async (req, res) => {
  try {
    const candidates = customerDatabase.filter(customer => {
      // Find customers with recent successful claims
      const recentClaims = customer.claims.filter(claim => {
        const claimDate = new Date(claim.date.replace(/\//g, '-'));
        const daysSinceClaim = (Date.now() - claimDate.getTime()) / (1000 * 60 * 60 * 24);

        return (
          claim.status === 'تسویه شده' &&
          claim.satisfactionScore >= 7 && // High satisfaction
          daysSinceClaim >= 7 && // At least a week ago
          daysSinceClaim <= 60 // Within 2 months
        );
      });

      // Check if not already invited recently
      const recentInvitations = customer.invitations.filter(inv => {
        const invDate = new Date(inv.sentAt.replace(/\//g, '-'));
        const daysSinceInv = (Date.now() - invDate.getTime()) / (1000 * 60 * 60 * 24);
        return daysSinceInv <= 30; // Not invited in last 30 days
      });

      return recentClaims.length > 0 && recentInvitations.length === 0;
    });

    // Score and rank candidates
    const rankedCandidates = candidates
      .map(customer => {
        const bestClaim = customer.claims
          .filter(c => c.status === 'تسویه شده')
          .sort((a, b) => b.satisfactionScore - a.satisfactionScore)[0];

        return {
          ...customer,
          score: calculateInvitationScore(customer, bestClaim),
          bestClaim,
        };
      })
      .sort((a, b) => b.score - a.score);

    res.json({
      success: true,
      candidates: rankedCandidates,
      count: rankedCandidates.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطا در شناسایی کاندیداهای مناسب',
    });
  }
});

// 📊 Calculate invitation score based on multiple factors
function calculateInvitationScore(customer, claim) {
  let score = 0;

  // Satisfaction score (40% weight)
  score += (claim.satisfactionScore / 10) * 40;

  // Processing speed (30% weight)
  const speedScore = Math.max(0, (10 - claim.processingDays) / 10);
  score += speedScore * 30;

  // Claim amount (20% weight) - higher amounts = more impact
  const amountValue = parseInt(claim.amount.replace(/[^\d]/g, ''));
  const amountScore = Math.min(1, amountValue / 10000000); // Normalize to 10M
  score += amountScore * 20;

  // Customer engagement (10% weight)
  const daysSinceInteraction =
    (Date.now() - new Date(customer.lastInteraction.replace(/\//g, '-')).getTime()) /
    (1000 * 60 * 60 * 24);
  const engagementScore = Math.max(0, (30 - daysSinceInteraction) / 30);
  score += engagementScore * 10;

  return Math.round(score);
}

// 📤 Send Smart Invitations
router.post('/admin/invitations/send', async (req, res) => {
  try {
    const { customerIds, method, template, scheduleFollowUp } = req.body;

    const results = [];

    for (const customerId of customerIds) {
      const customer = customerDatabase.find(c => c.id === customerId);
      if (!customer) {
        continue;
      }

      const bestClaim = customer.claims
        .filter(c => c.status === 'تسویه شده')
        .sort((a, b) => b.satisfactionScore - a.satisfactionScore)[0];

      // Generate unique testimonial link
      const invitationId = generateInvitationId();
      const testimonialLink = `https://damuon.com/testimonial/${invitationId}`;

      // Send invitation
      let success = false;
      if (method === 'email' || method === 'both') {
        success = await sendEmailInvitation(customer, bestClaim, testimonialLink, template);
      }

      if (method === 'sms' || method === 'both') {
        const shortLink = await generateShortLink(testimonialLink);
        success = (await sendSMSInvitation(customer, shortLink, template)) || success;
      }

      if (success) {
        // Record invitation
        const invitation = {
          id: invitationId,
          sentAt: new Date().toLocaleDateString('fa-IR'),
          method: method,
          template: template,
          status: 'sent',
          testimonialLink: testimonialLink,
          followUpScheduled: scheduleFollowUp,
        };

        customer.invitations.push(invitation);

        // Schedule follow-up if requested
        if (scheduleFollowUp) {
          setTimeout(
            () => {
              sendFollowUpInvitation(customer, invitation);
            },
            7 * 24 * 60 * 60 * 1000
          ); // 7 days later
        }

        results.push({
          customerId: customerId,
          customerName: customer.name,
          status: 'success',
          invitationId: invitationId,
        });
      } else {
        results.push({
          customerId: customerId,
          customerName: customer.name,
          status: 'failed',
          error: 'ارسال ناموفق',
        });
      }
    }

    res.json({
      success: true,
      message: `دعوت‌نامه برای ${results.filter(r => r.status === 'success').length} مشتری ارسال شد`,
      results: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطا در ارسال دعوت‌نامه‌ها',
    });
  }
});

// 🔄 Auto Follow-up System
async function sendFollowUpInvitation(customer, originalInvitation) {
  try {
    // Check if customer has already submitted testimonial
    const hasSubmittedTestimonial = await checkTestimonialSubmission(originalInvitation.id);
    if (hasSubmittedTestimonial) {
      console.log(`Customer ${customer.name} already submitted testimonial, skipping follow-up`);
      return;
    }

    // Send follow-up
    if (originalInvitation.method === 'email' || originalInvitation.method === 'both') {
      await sendEmailInvitation(customer, null, originalInvitation.testimonialLink, 'followUp');
    }

    if (originalInvitation.method === 'sms' || originalInvitation.method === 'both') {
      const shortLink = await generateShortLink(originalInvitation.testimonialLink);
      await sendSMSInvitation(customer, shortLink, 'followUp');
    }

    // Record follow-up
    originalInvitation.followUpSent = new Date().toLocaleDateString('fa-IR');

    console.log(`Follow-up sent to ${customer.name}`);
  } catch (error) {
    console.error('Error sending follow-up invitation:', error);
  }
}

// 📧 Enhanced Email Sending
async function sendEmailInvitation(customer, claim, testimonialLink, templateType = 'initial') {
  try {
    const template = invitationTemplates.email[templateType];
    const unsubscribeLink = `https://damuon.com/unsubscribe/${customer.id}`;

    const personalizedBody = template.body
      .replace(/{{customerName}}/g, customer.name)
      .replace(/{{claimAmount}}/g, claim ? claim.amount : '')
      .replace(/{{claimDate}}/g, claim ? claim.date : '')
      .replace(/{{testimonialLink}}/g, testimonialLink)
      .replace(/{{unsubscribeLink}}/g, unsubscribeLink);

    // In production, use email service like SendGrid, AWS SES, etc.
    console.log(`📧 Email sent to ${customer.email}:`);
    console.log(`Subject: ${template.subject}`);
    console.log(`Body preview: ${personalizedBody.substring(0, 200)}...`);

    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}

// 📱 Enhanced SMS Sending
async function sendSMSInvitation(customer, shortLink, templateType = 'initial') {
  try {
    const template = invitationTemplates.sms[templateType];

    const personalizedMessage = template
      .replace(/{{customerName}}/g, customer.name)
      .replace(/{{shortLink}}/g, shortLink);

    // In production, integrate with SMS service
    console.log(`📱 SMS sent to ${customer.phone}:`);
    console.log(personalizedMessage);

    return true;
  } catch (error) {
    console.error('SMS sending failed:', error);
    return false;
  }
}

// 🆔 Generate unique invitation ID
function generateInvitationId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return `inv_${timestamp}_${random}`;
}

// 🔗 Generate short link (integrate with URL shortening service)
async function generateShortLink(fullLink) {
  // In production, use bit.ly, tinyurl, or your own shortening service
  const shortCode = Math.random().toString(36).substring(2, 8);
  return `https://dmn.ir/${shortCode}`;
}

// ✅ Check if testimonial was submitted
async function checkTestimonialSubmission(invitationId) {
  // In production, query your testimonial database
  // For now, randomly return false (no submission)
  return Math.random() < 0.3; // 30% chance of having submitted
}

// 📈 Invitation Analytics
router.get('/admin/invitations/analytics', async (req, res) => {
  try {
    const allInvitations = customerDatabase.flatMap(c =>
      c.invitations.map(inv => ({ ...inv, customerName: c.name, customerId: c.id }))
    );

    const analytics = {
      totalInvitations: allInvitations.length,
      emailInvitations: allInvitations.filter(i => i.method === 'email' || i.method === 'both')
        .length,
      smsInvitations: allInvitations.filter(i => i.method === 'sms' || i.method === 'both').length,
      responseRate: 0, // Calculate based on actual testimonial submissions
      averageResponseTime: 0, // Calculate average time to respond
      topPerformingTemplate: 'initial', // Calculate based on response rates
      recentInvitations: allInvitations.slice(-10).reverse(),
    };

    res.json({
      success: true,
      analytics: analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطا در بارگذاری آمار',
    });
  }
});

module.exports = router;
