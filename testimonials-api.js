// Backend API endpoint for testimonials
const express = require('express');
const router = express.Router();

// Store testimonials (you can use database like MongoDB, PostgreSQL, etc.)
const testimonials = [
  {
    id: 1,
    name: 'حسن کریمی',
    profession: 'بازنشسته',
    rating: 5,
    testimonial: 'از زمانی که عضو دامون شدم، خیالم از بابت درمان راحت شده. خدمات عالی!',
    submittedAt: '1403/05/20',
    approved: true,
    email: 'hasan.karimi@example.com',
    phone: '09123456789',
  },
];

// Submit new testimonial
router.post('/testimonials', async (req, res) => {
  try {
    const { name, profession, rating, testimonial, email, phone, consent } = req.body;

    // Validation
    if (!name || !testimonial || !consent) {
      return res.status(400).json({
        success: false,
        message: 'لطفاً تمام فیلدهای ضروری را پر کنید',
      });
    }

    // Create new testimonial
    const newTestimonial = {
      id: testimonials.length + 1,
      name,
      profession: profession || '',
      rating: parseInt(rating) || 5,
      testimonial,
      email: email || '',
      phone: phone || '',
      submittedAt: new Date().toLocaleDateString('fa-IR'),
      approved: false, // Requires admin approval
      consent: true,
    };

    testimonials.push(newTestimonial);

    // Send notification to admin
    await sendAdminNotification(newTestimonial);

    // Send thank you email to customer
    if (email) {
      await sendThankYouEmail(email, name);
    }

    res.json({
      success: true,
      message: 'نظر شما با موفقیت ثبت شد و پس از بررسی منتشر خواهد شد',
    });
  } catch (error) {
    console.error('Error saving testimonial:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در ثبت نظر',
    });
  }
});

// Get approved testimonials for display
router.get('/testimonials', (req, res) => {
  const approvedTestimonials = testimonials
    .filter(t => t.approved)
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

  res.json({
    success: true,
    testimonials: approvedTestimonials,
  });
});

// Admin: Get pending testimonials
router.get('/admin/testimonials/pending', (req, res) => {
  const pendingTestimonials = testimonials
    .filter(t => !t.approved)
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

  res.json({
    success: true,
    testimonials: pendingTestimonials,
  });
});

// Admin: Approve testimonial
router.put('/admin/testimonials/:id/approve', (req, res) => {
  const { id } = req.params;
  const testimonial = testimonials.find(t => t.id === parseInt(id));

  if (!testimonial) {
    return res.status(404).json({
      success: false,
      message: 'نظر یافت نشد',
    });
  }

  testimonial.approved = true;

  res.json({
    success: true,
    message: 'نظر تایید شد',
  });
});

// Helper functions
async function sendAdminNotification(testimonial) {
  // Send email/SMS to admin about new testimonial
  console.log('New testimonial received:', testimonial.name);
}

async function sendThankYouEmail(email, name) {
  // Send thank you email to customer
  console.log(`Thank you email sent to ${email}`);
}

module.exports = router;
