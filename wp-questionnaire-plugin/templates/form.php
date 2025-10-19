

<?php
$verified = isset($_SESSION['phone_verified']) && $_SESSION['phone_verified'] === true;
$background_url = esc_url(AMROODY_PLUGIN_URL . '');
?>
<style>
body {
  background: url('<?php echo $background_url; ?>') no-repeat center center fixed !important;
  background-size: cover !important;
}
</style>




<!-- فرم اصلی — بدون تغییر -->
<div class="form-container">
    <div class="form-header">
        <img class="form-logo" src="<?php echo esc_url( AMROODY_PLUGIN_URL . 'images/' . rawurlencode('niceAftab gir-images-1new.png') ); ?>" alt="Logo">
        <div class="header-text">
            <h1>پرسشنامه نظرسنجی قرارداد بیمه تکمیلی</h1>
            <p>به منظور تصمیم‌گیری بهتر در مورد بیمه تکمیلی کارکنان...</p>
        </div>
    </div>
    <form id="surveyForm" method="POST" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
        <input type="hidden" name="action" value="amroody_save_survey">
        <?php wp_nonce_field('amroody_form_submit', 'amroody_nonce'); ?>     
        <div class="row question">
            <!-- Removed position field -->
            <div>
                <label>تعداد افراد تحت تکفل: <span style="color:red">*</span></label>
                <input type="number" name="dependents" min="0" max="20" placeholder="0" required>
            </div>
        <div class="questions-wrapper">

  <!-- سوال 1 -->
  <div class="question">
    <label>1. میزان تطابق مبلغ دریافتی خسارت با هزینه های پرداخت شده توسط شما</label>
    <div class="options">
      <label><input type="radio" name="q1" value="5" required> 5</label>
      <label><input type="radio" name="q1" value="10"> 10</label>
      <label><input type="radio" name="q1" value="15"> 15</label>
      <label><input type="radio" name="q1" value="20"> 20</label>
      <label><input type="radio" name="q1" value="25"> 25</label>
    </div>
  </div>

  <!-- سوال 2 -->
  <div class="question">
    <label>2. سرعت پرداخت خسارت ها پس از ثبت و بارگذاری مدارک</label>
    <div class="options">
      <label><input type="radio" name="q2" value="5" required> 5</label>
      <label><input type="radio" name="q2" value="10"> 10</label>
      <label><input type="radio" name="q2" value="15"> 15</label>
      <label><input type="radio" name="q2" value="20"> 20</label>
      <label><input type="radio" name="q2" value="25"> 25</label>
    </div>
  </div>

  <!-- سوال 3 -->
  <div class="question">
    <label>3. سرعت پرداخت خسارت های پرونده های بیمارستانی</label>
    <div class="options">
      <label><input type="radio" name="q3" value="5" required> 5</label>
      <label><input type="radio" name="q3" value="10"> 10</label>
      <label><input type="radio" name="q3" value="15"> 15</label>
      <label><input type="radio" name="q3" value="20"> 20</label>
      <label><input type="radio" name="q3" value="25"> 25</label>
    </div>
  </div>

  <!-- سوال 4 -->
  <div class="question">
    <label>4. سادگی و سرعت فرآیند دریافت معرفی نامه آنلاین برای خدمات بستری</label>
    <div class="options">
      <label><input type="radio" name="q4" value="5" required> 5</label>
      <label><input type="radio" name="q4" value="10"> 10</label>
      <label><input type="radio" name="q4" value="15"> 15</label>
      <label><input type="radio" name="q4" value="20"> 20</label>
      <label><input type="radio" name="q4" value="25"> 25</label>
    </div>
  </div>

  <!-- سوال 5 -->
  <div class="question">
    <label>5. کیفیت همکاری و تسهیل پذیرش در مراکز درمانی طرف قرارداد</label>
    <div class="options">
      <label><input type="radio" name="q5" value="5" required> 5</label>
      <label><input type="radio" name="q5" value="10"> 10</label>
      <label><input type="radio" name="q5" value="15"> 15</label>
      <label><input type="radio" name="q5" value="20"> 20</label>
      <label><input type="radio" name="q5" value="25"> 25</label>
    </div>
  </div>

  <!-- سوال 6 -->
  <div class="question">
    <label>6. شفافیت و اطلاع رسانی در مورد نحوه ارزیابی و محاسبه مبلغ خسارت ها</label>
    <div class="options">
      <label><input type="radio" name="q6" value="5" required> 5</label>
      <label><input type="radio" name="q6" value="10"> 10</label>
      <label><input type="radio" name="q6" value="15"> 15</label>
      <label><input type="radio" name="q6" value="20"> 20</label>
      <label><input type="radio" name="q6" value="25"> 25</label>
    </div>
  </div>

  <!-- سوال 7 -->
  <div class="question">
    <label>7. میزان کیفیت و کارایی خدمات غیر حضوری در سامانه پیگیری هزینه درمانی سیناد</label>
    <div class="options">
      <label><input type="radio" name="q7" value="5" required> 5</label>
      <label><input type="radio" name="q7" value="10"> 10</label>
      <label><input type="radio" name="q7" value="15"> 15</label>
      <label><input type="radio" name="q7" value="20"> 20</label>
      <label><input type="radio" name="q7" value="25"> 25</label>
    </div>
  </div>

  <!-- سوال 8 -->
  <div class="question">
    <label>8. نحوه برخورد کارکنان کارگزاری دامون</label>
    <div class="options">
      <label><input type="radio" name="q8" value="5" required> 5</label>
      <label><input type="radio" name="q8" value="10"> 10</label>
      <label><input type="radio" name="q8" value="15"> 15</label>
      <label><input type="radio" name="q8" value="20"> 20</label>
      <label><input type="radio" name="q8" value="25"> 25</label>
    </div>
  </div>

  <!-- سوال 9 -->
  <div class="question">
    <label>9. نحوه برخورد کارکنان شرکت بیمه البرز</label>
    <div class="options">
      <label><input type="radio" name="q9" value="5" required> 5</label>
      <label><input type="radio" name="q9" value="10"> 10</label>
      <label><input type="radio" name="q9" value="15"> 15</label>
      <label><input type="radio" name="q9" value="20"> 20</label>
      <label><input type="radio" name="q9" value="25"> 25</label>
    </div>
  </div>

  <!-- سوال 10 -->
  <div class="question">
    <label>10. اطلاع رسانی از نحوه رسیدگی به شکایات و بررسی آن (در صورت شکایت)</label>
    <div class="options">
      <label><input type="radio" name="q10" value="5" required> 5</label>
      <label><input type="radio" name="q10" value="10"> 10</label>
      <label><input type="radio" name="q10" value="15"> 15</label>
      <label><input type="radio" name="q10" value="20"> 20</label>
      <label><input type="radio" name="q10" value="25"> 25</label>
    </div>
  </div>

  <!-- سوال 11 -->
  <div class="question">
    <label>11. میزان رضایت از خدمات دندان پزشکی</label>
    <div class="options">
      <label><input type="radio" name="q11" value="5" required> 5</label>
      <label><input type="radio" name="q11" value="10"> 10</label>
      <label><input type="radio" name="q11" value="15"> 15</label>
      <label><input type="radio" name="q11" value="20"> 20</label>
      <label><input type="radio" name="q11" value="25"> 25</label>
    </div>
  </div>

  <!-- سوال 12 -->
  <div class="question">
    <label>12. میزان رضایت از پوشش های بیمه تکمیلی</label>
    <div class="options">
      <label><input type="radio" name="q12" value="5" required> 5</label>
      <label><input type="radio" name="q12" value="10"> 10</label>
      <label><input type="radio" name="q12" value="15"> 15</label>
      <label><input type="radio" name="q12" value="20"> 20</label>
      <label><input type="radio" name="q12" value="25"> 25</label>
    </div>
  </div>

  <!-- سوال 13 -->
  <div class="question">
    <label>13. عملکرد شرکت بیمه البرز چگونه بوده است</label>
    <div class="options">
      <label><input type="radio" name="q13" value="5" required> 5</label>
      <label><input type="radio" name="q13" value="10"> 10</label>
      <label><input type="radio" name="q13" value="15"> 15</label>
      <label><input type="radio" name="q13" value="20"> 20</label>
      <label><input type="radio" name="q13" value="25"> 25</label>
    </div>
  </div>

  <!-- سوال 14 -->
  <div class="question">
    <label>14. میزان رضایت شما از نحوه کارشناسی هزینه ها</label>
    <div class="options">
      <label><input type="radio" name="q14" value="5" required> 5</label>
      <label><input type="radio" name="q14" value="10"> 10</label>
      <label><input type="radio" name="q14" value="15"> 15</label>
      <label><input type="radio" name="q14" value="20"> 20</label>
      <label><input type="radio" name="q14" value="25"> 25</label>
    </div>
  </div>

  <!-- سوال 15 -->
  <div class="question">
    <label>15. میزان رضایت از نحوه بارگزاری مدارک و هزینه ها(بصورت آنلاین)</label>
    <div class="options">
      <label><input type="radio" name="q15" value="5" required> 5</label>
      <label><input type="radio" name="q15" value="10"> 10</label>
      <label><input type="radio" name="q15" value="15"> 15</label>
      <label><input type="radio" name="q15" value="20"> 20</label>
      <label><input type="radio" name="q15" value="25"> 25</label>
    </div>
  </div>

  <!-- سوال 16 -->
  <div class="question">
    <label>16. میزان رضایت در خصوص حذف فیزیکی هزینه ها</label>
    <div class="options">
      <label><input type="radio" name="q16" value="5" required> 5</label>
      <label><input type="radio" name="q16" value="10"> 10</label>
      <label><input type="radio" name="q16" value="15"> 15</label>
      <label><input type="radio" name="q16" value="20"> 20</label>
      <label><input type="radio" name="q16" value="25"> 25</label>
    </div>
  </div>

  <!-- سوال 17 -->
  <div class="question">
    <label>17. آیا تمایل به تغییر شرکت بیمه البرز دارید؟</label>
    <div class="options">
      <label><input type="radio" name="q17" value="بله" required> بله</label>
      <label><input type="radio" name="q17" value="خیر"> خیر</label>
    </div>
  </div>

  <!-- سوال 18 -->
  <div class="question">
    <label>18. از بیشترین شعبه ای که استفاده میکنید کدام است؟</label>
    <select name="q18" required>
      <option value="">انتخاب کنید...</option>
      <option value="کرمان">کرمان</option>
      <option value="تهران">تهران</option>
      <option value="تبریز">تبریز</option>
    </select>
  </div>


</div> <!-- close .form-container -->

<!-- Overlay moved outside the form for correct behavior -->
<?php /* Overlay for phone verification */ ?>
<div class="overlay" id="phoneOverlay" style="<?php echo $verified ? 'display:none;' : 'display:flex;'; ?>">
  <div class="popup" id="phonePopup">
    <h2>لطفا شماره موبایل خود را وارد کنید</h2>
    <input type="text" id="phoneNumber" placeholder="مثال: 0912xxxxxxx">
    <button type="button" id="sendBtn">ارسال کد تأیید</button>
    <button type="button" id="resendBtn" style="margin-top:8px; display:none;">ارسال مجدد</button>
    <div id="timerMsg" style="margin:8px 0; color:#0077ff; font-size:0.95rem; display:none;"></div>
    <div id="verifySection" style="display:none; margin-top:10px;">
      <input type="text" id="verifyCode" placeholder="کد تأیید">
      <button type="button" id="verifyBtn">تأیید</button>
    </div>
    <p id="popupMsg" class="error" style="color:red;font-size:0.9rem;"></p>
  </div>
</div>

        </div>
        <div id="dynamicQuestions"></div>
        <div class="question">
            <label>پیشنهادها و انتقادها:</label>
            <textarea name="suggestions" rows="3" placeholder="پیشنهادات خود را بنویسید"></textarea>
        </div>
        <button type="submit" class="submit-btn">ارسال پاسخ ها</button>
    </form>
</div>
