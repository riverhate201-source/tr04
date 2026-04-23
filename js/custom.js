$(function () {

    lucide.createIcons();

    const main_visual_slide = new Swiper('.main_visual_slide', {
        loop: true,
        autoplay: {
            delay: 3000, // 3초마다 슬라이드
            disableOnInteraction: false, // 유저가 건드려도 계속 자동재생
        },
        speed: 800, // 슬라이드 전환 속도

        // Navigation arrows
        navigation: {

            prevEl: '.main_visual .arrows .prev',
            nextEl: '.main_visual .arrows .next',
        },



    });

    const left_slide = new Swiper('.main_product .left_slide', {
        loop: true,
        effect: 'fade', // 사진이 스르륵 바뀌게 하려면 'fade', 그냥 휙 넘어가게 하려면 이 줄을 삭제!
        fadeEffect: { crossFade: true },
        allowTouchMove: false, // 왼쪽 큰 사진은 마우스로 잡고 끌 수 없게 방어 (오른쪽 화살표로만 조작)
        speed: 500, // 넘어가는 속도 조절
        loopedSlides: 30,
    });


    const right_slide = new Swiper('.main_product .right_slide', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        loopedSlides: 30,
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4.5 }
        },
        navigation: {
            prevEl: '.main_product .arrows .prev',
            nextEl: '.main_product .arrows .next',
        },
        speed: 500,
    });


    right_slide.on('slideChange', function () {
        left_slide.slideToLoop(this.realIndex);
    });


    $('.yt-cover').on('click', function () {
        $(this).fadeOut(400);
        let iframeWindow = $(this).siblings('iframe')[0].contentWindow;
        iframeWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');


        main_visual_slide.autoplay.stop();
    });


    main_visual_slide.on('slideChangeTransitionStart', function () {
        // 오토플레이 다시 시작
        main_visual_slide.autoplay.start();

        // 켜져 있던 영상 일시정지 (소리 겹침 방지)
        $('.yt-bg iframe').each(function () {
            this.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        });

        // 지웠던 뚜껑 다시 덮기
        $('.yt-cover').show();
    });




    const main_info_slide = new Swiper('.main_default_slide', {
        loop: true,
        //slidesPerView: 2,
        spaceBetween: 100,
        centeredSlides: true,
        slidesPerView: "auto",

        pagination: {
            el: '.main_default .page',
            clickable: true,
        },

        navigation: {
            nextEl: '.main_default .arrows .next',
            prevEl: '.main_default .arrows .prev',
        },
    })



    $(window).on('scroll', function () {
        console.log($(window).scrollTop());

        let num = $(window).scrollTop();

        if (num > 0) {
            $('.header').addClass('on')

        } else {
            $('.header').removeClass('on')

        }

        if (num > 800) {
            $('.to_top').addClass('on')
        } else {
            $('.to_top').removeClass('on')
        }
    });

    $('.to_top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 1000)
    })
});


$(function () {
    $('.main_news .tab_notice .tab_menu_ink li button').on('click', function () {
        let idx = $(this).parent().index();
        console.log(idx);


        $('.main_news .tab_notice .tab_menu_ink li').removeClass('on')
        $(this).parent().addClass('on');


        $('.main_news .tab_notice .tab_content .tab_content_con').removeClass('on');
        $('.main_news .tab_notice .tab_content .tab_content_con').eq(idx).addClass('on');


    })
});

$(function () {
    $('#fl').on('change', function () {
        let lnk = $(this).val();
        if (ink) {
            window.open(lnk)
        }
    })
})