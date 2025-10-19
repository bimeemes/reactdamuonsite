// Admin Panel Backend API for Testimonial Management
const express = require('express');
const router = express.Router();

// Mock database for demonstration
const customers = [
  {
    id: 1,
    name: 'احمد محمدی',
    email: 'ahmad@example.com',
    phone: '09121234567',
    lastClaim: '1403/03/15',
    policyNumber: 'POL-001',
    claimAmount: '5,000,000 تومان',
  },
  {
    id: 2,
    name: 'فاطمه احمدی',
    email: 'fateme@example.com',
    phone: '09121234568',
    lastClaim: '1403/04/20',
    policyNumber: 'POL-002',
    claimAmount: '12,000,000 تومان',
  },
];

const pendingTestimonials = [
  {
    id: 1,
    name: 'حسن کریمی',
    rating: 5,
    testimonial:
      'خدمات عالی و تسویه سریع خسارت. بعد از حادثه، تیم دامون خیلی سریع رسیدند و همه کارها رو انجام دادند.',
    submittedAt: '1403/06/15',
    email: 'hassan@example.com',
    phone: '09121234560',
    profession: 'مهندس',
    status: 'pending',
  },
];

// 🔐 Admin Authentication Middleware
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  // Simple admin check (in production, use proper JWT verification)
  if (!token || token !== 'Bearer admin-token-123') {
    return res.status(401).json({
      success: false,
      message: 'دسترسی غیرمجاز - لطفاً ابتدا وارد پنل مدیریت شوید',
    });
  }

  next();
};

// 📋 Get pending testimonials for admin review
router.get('/admin/testimonials/pending', authenticateAdmin, (req, res) => {
  try {
    const pending = pendingTestimonials.filter(t => t.status === 'pending');

    res.json({
      success: true,
      testimonials: pending,
      count: pending.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطا در بارگذاری نظرات در انتظار تایید',
    });
  }
});

// ✅ Approve testimonial
router.put('/admin/testimonials/:id/approve', authenticateAdmin, (req, res) => {
  try {
    const testimonialId = parseInt(req.params.id);
    const testimonial = pendingTestimonials.find(t => t.id === testimonialId);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'نظر مورد نظر یافت نشد',
      });
    }

    // Update status to approved
    testimonial.status = 'approved';
    testimonial.approvedAt = new Date().toLocaleDateString('fa-IR');

    // In a real app, you'd save to database here
    console.log(`Testimonial ${testimonialId} approved by admin`);

    // Send notification to customer (optional)
    sendApprovalNotification(testimonial);

    res.json({
      success: true,
      message: 'نظر با موفقیت تایید شد',
      testimonial: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطا در تایید نظر',
    });
  }
});

// ❌ Reject testimonial
router.put('/admin/testimonials/:id/reject', authenticateAdmin, (req, res) => {
  try {
    const testimonialId = parseInt(req.params.id);
    const { reason } = req.body;

    const testimonialIndex = pendingTestimonials.findIndex(t => t.id === testimonialId);

    if (testimonialIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'نظر مورد نظر یافت نشد',
      });
    }

    // Remove testimonial or mark as rejected
    const rejectedTestimonial = pendingTestimonials[testimonialIndex];
    rejectedTestimonial.status = 'rejected';
    rejectedTestimonial.rejectionReason = reason;
    rejectedTestimonial.rejectedAt = new Date().toLocaleDateString('fa-IR');

    console.log(`Testimonial ${testimonialId} rejected: ${reason}`);

    res.json({
      success: true,
      message: 'نظر رد شد',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطا در رد نظر',
    });
  }
});

// 📤 Send testimonial invitation to specific customer
router.post('/admin/testimonials/invite', authenticateAdmin, async (req, res) => {
  try {
    const { customerId, email, phone, name } = req.body;

    if (!customerId || (!email && !phone)) {
      return res.status(400).json({
        success: false,
        message: 'اطلاعات مشتری ناقص است',
      });
    }

    const customer = customers.find(c => c.id === customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'مشتری یافت نشد',
      });
    }

    // Generate unique testimonial link
    const testimonialToken = generateTestimonialToken(customerId);
    const testimonialLink = `https://damuon.com/testimonial/${testimonialToken}`;

    // Send email invitation
    if (email) {
      await sendEmailInvitation({
        to: email,
        customerName: name,
        testimonialLink: testimonialLink,
        claimDetails: customer,
      });
    }

    // Send SMS invitation
    if (phone) {
      await sendSMSInvitation({
        to: phone,
        customerName: name,
        shortLink: generateShortLink(testimonialLink),
      });
    }

    // Log invitation
    console.log(`Testimonial invitation sent to ${name} (${email || phone})`);

    res.json({
      success: true,
      message: `دعوت‌نامه برای ${name} ارسال شد`,
      testimonialLink: testimonialLink,
    });
  } catch (error) {
    console.error('Error sending testimonial invitation:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در ارسال دعوت‌نامه',
    });
  }
});

// 📊 Get customer list for invitations
router.get('/admin/customers', authenticateAdmin, (req, res) => {
  try {
    // Filter customers who had successful claims in last 6 months
    const recentCustomers = customers.filter(customer => {
      // In real app, calculate based on actual claim date
      return customer.lastClaim; // Simple check
    });

    res.json({
      success: true,
      customers: recentCustomers,
      count: recentCustomers.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطا در بارگذاری لیست مشتریان',
    });
  }
});

// 🔗 Generate unique testimonial token
function generateTestimonialToken(customerId) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return `${customerId}_${timestamp}_${random}`;
}

// 🔗 Generate short link (you can use bit.ly API)
function generateShortLink(fullLink) {
  // In production, integrate with URL shortening service
  return fullLink.substring(0, 30) + '...';
}

// 📧 Send email invitation
async function sendEmailInvitation({ to, customerName, testimonialLink, claimDetails }) {
  // Email template
  const emailContent = `
    <div dir="rtl" style="font-family: Tahoma, Arial, sans-serif;">
      <h2 style="color: #f66e20;">سلام ${customerName} عزیز</h2>
      
      <p>امیدواریم از خدمات بیمه دامون راضی بوده‌اید.</p>
      
      <p>با توجه به تسویه موفق خسارت شما به مبلغ <strong>${claimDetails.claimAmount}</strong> 
      در تاریخ <strong>${claimDetails.lastClaim}</strong>، خوشحال می‌شویم اگر تجربه خود را با ما و سایر مشتریان به اشتراک بگذارید.</p>
      
      <div style="text-align: center; margin: 2rem 0;">
        <a href="${testimonialLink}" 
           style="background: #f66e20; color: white; padding: 1rem 2rem; 
                  text-decoration: none; border-radius: 8px; display: inline-block;">
          📝 ثبت نظر من درباره دامون
        </a>
      </div>
      
      <p>ثبت نظر شما تنها 2 دقیقه زمان می‌برد و به ما کمک می‌کند خدمات بهتری ارائه دهیم.</p>
      
      <p>با تشکر<br/>تیم بیمه دامون</p>
    </div>
  `;

  // In production, use a proper email service like SendGrid, AWS SES, etc.
  console.log(`Email sent to ${to}:`, emailContent);

  // Mock email sending
  return Promise.resolve({ success: true });
}

// 📱 Send SMS invitation
async function sendSMSInvitation({ to, customerName, shortLink }) {
  const smsText = `
سلام ${customerName} عزیز
از خدمات دامون راضی بودید؟ 
نظرتون رو با ما به اشتراک بذارید:
${shortLink}
بیمه دامون
  `.trim();

  // In production, integrate with SMS service
  console.log(`SMS sent to ${to}:`, smsText);

  return Promise.resolve({ success: true });
}

// 📧 Send approval notification
function sendApprovalNotification(testimonial) {
  if (testimonial.email) {
    const emailContent = `
      <div dir="rtl" style="font-family: Tahoma, Arial, sans-serif;">
        <h2 style="color: #f66e20;">متشکریم ${testimonial.name} عزیز!</h2>
        <p>نظر شما درباره خدمات بیمه دامون با موفقیت منتشر شد.</p>
        <p>از اینکه وقت خود را برای به اشتراک‌گذاری تجربه‌تان صرف کردید، صمیمانه تشکر می‌کنیم.</p>
        <p>تیم بیمه دامون</p>
      </div>
    `;

    console.log(`Approval notification sent to ${testimonial.email}`);
  }
}

module.exports = router;
