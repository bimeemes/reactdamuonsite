jQuery(document).ready(function($) {

    // Timer and resend logic
    let timerInterval = null;
    function startTimer(duration, msg) {
        let remaining = duration;
        console.log('[DEBUG] startTimer called, duration:', duration, 'msg:', msg);
        $('#timerMsg').css({'display':'block','background':'#fffbe6','border':'2px solid #f36e21','z-index':'999999'});
        $('#resendBtn').css({'display':'none','background':'#e6f7ff','border':'2px solid #09f','z-index':'999999'});
        $('#sendBtn').prop('disabled', true);
        updateTimerDisplay(remaining, msg);
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(function() {
            remaining--;
            updateTimerDisplay(remaining, msg);
            if (remaining <= 0) {
                clearInterval(timerInterval);
                $('#timerMsg').css('display','none');
                $('#resendBtn').css({'display':'inline-block','background':'#e6f7ff','border':'2px solid #09f','z-index':'999999'});
                $('#sendBtn').prop('disabled', false);
                console.log('[DEBUG] Resend button shown');
            }
        }, 1000);
    }
    function updateTimerDisplay(sec, msg) {
        let m = Math.floor(sec / 60);
        let s = sec % 60;
        let timerText = 'امکان ارسال مجدد تا ' + m + ':' + (s<10?'0':'') + s + ' دیگر فعال می‌شود';
        if (msg) timerText = msg + ' | ' + timerText;
        $('#timerMsg').text(timerText);
        console.log('[DEBUG] updateTimerDisplay called, sec:', sec, 'msg:', msg, 'timerText:', timerText);
        // Force show for troubleshooting
        $('#timerMsg').css('display','block');
        // $('#resendBtn').css('display','inline-block'); // Only show after timer ends
    }
    console.log('[DEBUG] Timer and resend logic initialized');

    // Resend code button
    $('#resendBtn').on('click', function() {
        $('#sendBtn').trigger('click');
    });

    // Prevent form submit if overlay is visible (phone not verified)
    $('#surveyForm').on('submit', function(e) {
        if ($('#phoneOverlay').is(':visible')) {
            e.preventDefault();
            $('#popupMsg').css('color', 'red').text('لطفا ابتدا شماره موبایل خود را تایید کنید.');
            // Optionally scroll to overlay
            $('html,body').animate({scrollTop: $('#phoneOverlay').offset().top}, 300);
            return false;
        }
    });

    // On page load, if overlay is visible, lock scroll
    if ($('#phoneOverlay').is(':visible')) {
        $('body').addClass('amroody-lock-scroll');
    }


    $('#sendBtn').on('click', function() {
        let phone = $('#phoneNumber').val().trim();
        $('#popupMsg').text('');
        // Disable send/resend immediately to prevent double click
        $('#sendBtn').prop('disabled', true);
        $('#resendBtn').css('display','none');
        $('#timerMsg').css('display','block');
        $('#verifySection').slideDown(); // Always show code input after first send
        let timerMsg = '';
        console.log('[DEBUG] Send button clicked, phone:', phone);
        // Ensure overlay stays visible until verification
        $('#phoneOverlay').css('display', 'flex');
        $.post(amroody_ajax.url, {
            action: 'amroody_send_code',
            nonce: amroody_ajax.nonce,
            phone: phone
        }, function(res) {
            if (res.success) {
                $('#popupMsg').css('color', 'green').text(res.data);
                timerMsg = '';
            } else {
                $('#popupMsg').css('color', 'red').text(res.data);
                timerMsg = res.data;
            }
            console.log('[DEBUG] AJAX response received, calling startTimer');
            startTimer(240, timerMsg); // Always start timer, show backend msg if any
        });
    });

    $('#verifyBtn').on('click', function() {
        let phone = $('#phoneNumber').val().trim();
        let code  = $('#verifyCode').val().trim();
        $('#popupMsg').text('');

    $.post(amroody_ajax.url, {
            action: 'amroody_verify_code',
            nonce: amroody_ajax.nonce,
            phone: phone,
            code: code
        }, function(res) {
            if (res.success) {
                $('#popupMsg').css('color', 'green').text('✅ تایید شد');
                $('#phoneOverlay').fadeOut(300, function(){
                    $(this).remove();
                    $('body').removeClass('amroody-lock-scroll');
                });
            } else {
                $('#popupMsg').css('color', 'red').text(res.data);
            }
        });
    });

});
