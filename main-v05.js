var _iub = _iub || [];

$(function () {
  // search
  $('.search .container-fluid').on('click', (e) => {
    if (
      $(e.target).hasClass('search__input-overlay') ||
      $(e.target).hasClass('search__close') ||
      $(e.target).hasClass('search__close-ic')
    ) {
      return;
    }

    $('.search__input-overlay').click();
  });

  // hide empty youtube
  $('.w-embed-youtubevideo').each(function (i, e) {
    if ($(this).children().length === 0) {
      $(this).hide();
    }
  });

  // partner form
  document.body.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.querySelector('.partner__close')) {
      document.querySelector('.partner__close').click();
    }
    if (e.key === 'Escape' && document.querySelector('.book__close')) {
      document.querySelector('.book__close').click();
    }
    if (e.key === 'Enter' && $('.partner-modal').css('display') !== 'none') {
      $('.partner__form form').submit();
    }
    if (e.key === 'Enter' && $('.book-modal').css('display') !== 'none') {
      $('.book__form form').submit();
    }
  });

  // Prevent scrolling on click
  $('.partner__btn, .book__btn').click(function (e) {
    e.preventDefault();
    $('body').css('overflow', 'hidden');
  });

  $('.partner__close, .book__close').click(function (e) {
    e.preventDefault();
    $('body').css('overflow', 'auto');
  });

  // Reports
  const sidebarEl = $('.sidebar.sidebar__reports');
  sidebarEl.empty();
  const months = [];
  let activeMonth;
  $('.month-hidden').each(function (i) {
    const monthName = $(this).text();
    if (months.indexOf(monthName) === -1) {
      $(this).attr('id', monthName);
      months.push(monthName);
      const active = i === 0 ? 'active' : '';
      activeMonth = monthName;
      const templ = `
      <div class="sidebar__item">
        <a href="#${monthName}" class="month w-inline-block ${active}">
          <div>${monthName}</div>
        </a>
      </div>
      `;

      sidebarEl.append(templ);
    }
  });

  $('.month').on('click', function () {
    $('.month').removeClass('active');
    $(this).addClass('active');
    activeMonth = $(this).text().trim();
  });

  // cookies
  if (localStorage.getItem('isEU') === 'true') {
    showCookie();
    redirectEu();
  } else {
    $.get('https://ipapi.co/continent_code/?key=RUINiHEpbJ14vZKk3qc2HLW6GjPOeAeqe8jPSM8ANgcUotyLEn')
      .done((data) => {
        if (data === 'EU') {
          localStorage.setItem('isEU', true);
          showCookie();
          redirectEu();
        }
      })
      .fail(() => {
        showCookie();
      });
  }

  function redirectEu() {
    if (location.pathname === '/') {
      location.href = '/eu';
    }
  }

  function showCookie() {
    _iub.csConfiguration = {
      consentOnContinuedBrowsing: false,
      perPurposeConsent: true,
      whitelabel: false,
      lang: 'en',
      siteId: 1939340,
      cookiePolicyId: 56657740,
      cookiePolicyUrl: 'https://www.cogoport.com/cookie-policy',
      banner: {
        acceptButtonDisplay: true,
        customizeButtonDisplay: true,
        acceptButtonColor: '#000000',
        acceptButtonCaptionColor: 'white',
        customizeButtonColor: '#f2f2f2',
        customizeButtonCaptionColor: '#000000',
        rejectButtonDisplay: true,
        rejectButtonColor: '#f2f2f2',
        rejectButtonCaptionColor: '#000000',
        position: 'bottom',
        textColor: '#000000',
        backgroundColor: '#f9f9f9',
      },
    };

    $.ajax({
      url: '//cdn.iubenda.com/cs/iubenda_cs.js',
      dataType: 'script',
      async: true,
    });
  }

  // countries
  function initCountrySelect() {
    const countries = [
      { name: 'Afghanistan', code: 'AF' },
      { name: 'Åland Islands', code: 'AX' },
      { name: 'Albania', code: 'AL' },
      { name: 'Algeria', code: 'DZ' },
      { name: 'American Samoa', code: 'AS' },
      { name: 'AndorrA', code: 'AD' },
      { name: 'Angola', code: 'AO' },
      { name: 'Anguilla', code: 'AI' },
      { name: 'Antarctica', code: 'AQ' },
      { name: 'Antigua and Barbuda', code: 'AG' },
      { name: 'Argentina', code: 'AR' },
      { name: 'Armenia', code: 'AM' },
      { name: 'Aruba', code: 'AW' },
      { name: 'Australia', code: 'AU' },
      { name: 'Austria', code: 'AT' },
      { name: 'Azerbaijan', code: 'AZ' },
      { name: 'Bahamas', code: 'BS' },
      { name: 'Bahrain', code: 'BH' },
      { name: 'Bangladesh', code: 'BD' },
      { name: 'Barbados', code: 'BB' },
      { name: 'Belarus', code: 'BY' },
      { name: 'Belgium', code: 'BE' },
      { name: 'Belize', code: 'BZ' },
      { name: 'Benin', code: 'BJ' },
      { name: 'Bermuda', code: 'BM' },
      { name: 'Bhutan', code: 'BT' },
      { name: 'Bolivia', code: 'BO' },
      { name: 'Bosnia and Herzegovina', code: 'BA' },
      { name: 'Botswana', code: 'BW' },
      { name: 'Bouvet Island', code: 'BV' },
      { name: 'Brazil', code: 'BR' },
      { name: 'British Indian Ocean Territory', code: 'IO' },
      { name: 'Brunei Darussalam', code: 'BN' },
      { name: 'Bulgaria', code: 'BG' },
      { name: 'Burkina Faso', code: 'BF' },
      { name: 'Burundi', code: 'BI' },
      { name: 'Cambodia', code: 'KH' },
      { name: 'Cameroon', code: 'CM' },
      { name: 'Canada', code: 'CA' },
      { name: 'Cape Verde', code: 'CV' },
      { name: 'Cayman Islands', code: 'KY' },
      { name: 'Central African Republic', code: 'CF' },
      { name: 'Chad', code: 'TD' },
      { name: 'Chile', code: 'CL' },
      { name: 'China', code: 'CN' },
      { name: 'Christmas Island', code: 'CX' },
      { name: 'Cocos (Keeling) Islands', code: 'CC' },
      { name: 'Colombia', code: 'CO' },
      { name: 'Comoros', code: 'KM' },
      { name: 'Congo', code: 'CG' },
      { name: 'Congo, The Democratic Republic of the', code: 'CD' },
      { name: 'Cook Islands', code: 'CK' },
      { name: 'Costa Rica', code: 'CR' },
      { name: "Cote D'Ivoire", code: 'CI' },
      { name: 'Croatia', code: 'HR' },
      { name: 'Cuba', code: 'CU' },
      { name: 'Cyprus', code: 'CY' },
      { name: 'Czech Republic', code: 'CZ' },
      { name: 'Denmark', code: 'DK' },
      { name: 'Djibouti', code: 'DJ' },
      { name: 'Dominica', code: 'DM' },
      { name: 'Dominican Republic', code: 'DO' },
      { name: 'Ecuador', code: 'EC' },
      { name: 'Egypt', code: 'EG' },
      { name: 'El Salvador', code: 'SV' },
      { name: 'Equatorial Guinea', code: 'GQ' },
      { name: 'Eritrea', code: 'ER' },
      { name: 'Estonia', code: 'EE' },
      { name: 'Ethiopia', code: 'ET' },
      { name: 'Falkland Islands (Malvinas)', code: 'FK' },
      { name: 'Faroe Islands', code: 'FO' },
      { name: 'Fiji', code: 'FJ' },
      { name: 'Finland', code: 'FI' },
      { name: 'France', code: 'FR' },
      { name: 'French Guiana', code: 'GF' },
      { name: 'French Polynesia', code: 'PF' },
      { name: 'French Southern Territories', code: 'TF' },
      { name: 'Gabon', code: 'GA' },
      { name: 'Gambia', code: 'GM' },
      { name: 'Georgia', code: 'GE' },
      { name: 'Germany', code: 'DE' },
      { name: 'Ghana', code: 'GH' },
      { name: 'Gibraltar', code: 'GI' },
      { name: 'Greece', code: 'GR' },
      { name: 'Greenland', code: 'GL' },
      { name: 'Grenada', code: 'GD' },
      { name: 'Guadeloupe', code: 'GP' },
      { name: 'Guam', code: 'GU' },
      { name: 'Guatemala', code: 'GT' },
      { name: 'Guernsey', code: 'GG' },
      { name: 'Guinea', code: 'GN' },
      { name: 'Guinea-Bissau', code: 'GW' },
      { name: 'Guyana', code: 'GY' },
      { name: 'Haiti', code: 'HT' },
      { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
      { name: 'Holy See (Vatican City State)', code: 'VA' },
      { name: 'Honduras', code: 'HN' },
      { name: 'Hong Kong', code: 'HK' },
      { name: 'Hungary', code: 'HU' },
      { name: 'Iceland', code: 'IS' },
      { name: 'India', code: 'IN' },
      { name: 'Indonesia', code: 'ID' },
      { name: 'Iran, Islamic Republic Of', code: 'IR' },
      { name: 'Iraq', code: 'IQ' },
      { name: 'Ireland', code: 'IE' },
      { name: 'Isle of Man', code: 'IM' },
      { name: 'Israel', code: 'IL' },
      { name: 'Italy', code: 'IT' },
      { name: 'Jamaica', code: 'JM' },
      { name: 'Japan', code: 'JP' },
      { name: 'Jersey', code: 'JE' },
      { name: 'Jordan', code: 'JO' },
      { name: 'Kazakhstan', code: 'KZ' },
      { name: 'Kenya', code: 'KE' },
      { name: 'Kiribati', code: 'KI' },
      { name: "Korea, Democratic People'S Republic of", code: 'KP' },
      { name: 'Korea, Republic of', code: 'KR' },
      { name: 'Kuwait', code: 'KW' },
      { name: 'Kyrgyzstan', code: 'KG' },
      { name: "Lao People'S Democratic Republic", code: 'LA' },
      { name: 'Latvia', code: 'LV' },
      { name: 'Lebanon', code: 'LB' },
      { name: 'Lesotho', code: 'LS' },
      { name: 'Liberia', code: 'LR' },
      { name: 'Libyan Arab Jamahiriya', code: 'LY' },
      { name: 'Liechtenstein', code: 'LI' },
      { name: 'Lithuania', code: 'LT' },
      { name: 'Luxembourg', code: 'LU' },
      { name: 'Macao', code: 'MO' },
      { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
      { name: 'Madagascar', code: 'MG' },
      { name: 'Malawi', code: 'MW' },
      { name: 'Malaysia', code: 'MY' },
      { name: 'Maldives', code: 'MV' },
      { name: 'Mali', code: 'ML' },
      { name: 'Malta', code: 'MT' },
      { name: 'Marshall Islands', code: 'MH' },
      { name: 'Martinique', code: 'MQ' },
      { name: 'Mauritania', code: 'MR' },
      { name: 'Mauritius', code: 'MU' },
      { name: 'Mayotte', code: 'YT' },
      { name: 'Mexico', code: 'MX' },
      { name: 'Micronesia, Federated States of', code: 'FM' },
      { name: 'Moldova, Republic of', code: 'MD' },
      { name: 'Monaco', code: 'MC' },
      { name: 'Mongolia', code: 'MN' },
      { name: 'Montserrat', code: 'MS' },
      { name: 'Morocco', code: 'MA' },
      { name: 'Mozambique', code: 'MZ' },
      { name: 'Myanmar', code: 'MM' },
      { name: 'Namibia', code: 'NA' },
      { name: 'Nauru', code: 'NR' },
      { name: 'Nepal', code: 'NP' },
      { name: 'Netherlands', code: 'NL' },
      { name: 'Netherlands Antilles', code: 'AN' },
      { name: 'New Caledonia', code: 'NC' },
      { name: 'New Zealand', code: 'NZ' },
      { name: 'Nicaragua', code: 'NI' },
      { name: 'Niger', code: 'NE' },
      { name: 'Nigeria', code: 'NG' },
      { name: 'Niue', code: 'NU' },
      { name: 'Norfolk Island', code: 'NF' },
      { name: 'Northern Mariana Islands', code: 'MP' },
      { name: 'Norway', code: 'NO' },
      { name: 'Oman', code: 'OM' },
      { name: 'Pakistan', code: 'PK' },
      { name: 'Palau', code: 'PW' },
      { name: 'Palestinian Territory, Occupied', code: 'PS' },
      { name: 'Panama', code: 'PA' },
      { name: 'Papua New Guinea', code: 'PG' },
      { name: 'Paraguay', code: 'PY' },
      { name: 'Peru', code: 'PE' },
      { name: 'Philippines', code: 'PH' },
      { name: 'Pitcairn', code: 'PN' },
      { name: 'Poland', code: 'PL' },
      { name: 'Portugal', code: 'PT' },
      { name: 'Puerto Rico', code: 'PR' },
      { name: 'Qatar', code: 'QA' },
      { name: 'Reunion', code: 'RE' },
      { name: 'Romania', code: 'RO' },
      { name: 'Russian Federation', code: 'RU' },
      { name: 'RWANDA', code: 'RW' },
      { name: 'Saint Helena', code: 'SH' },
      { name: 'Saint Kitts and Nevis', code: 'KN' },
      { name: 'Saint Lucia', code: 'LC' },
      { name: 'Saint Pierre and Miquelon', code: 'PM' },
      { name: 'Saint Vincent and the Grenadines', code: 'VC' },
      { name: 'Samoa', code: 'WS' },
      { name: 'San Marino', code: 'SM' },
      { name: 'Sao Tome and Principe', code: 'ST' },
      { name: 'Saudi Arabia', code: 'SA' },
      { name: 'Senegal', code: 'SN' },
      { name: 'Serbia and Montenegro', code: 'CS' },
      { name: 'Seychelles', code: 'SC' },
      { name: 'Sierra Leone', code: 'SL' },
      { name: 'Singapore', code: 'SG' },
      { name: 'Slovakia', code: 'SK' },
      { name: 'Slovenia', code: 'SI' },
      { name: 'Solomon Islands', code: 'SB' },
      { name: 'Somalia', code: 'SO' },
      { name: 'South Africa', code: 'ZA' },
      { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
      { name: 'Spain', code: 'ES' },
      { name: 'Sri Lanka', code: 'LK' },
      { name: 'Sudan', code: 'SD' },
      { name: 'Suriname', code: 'SR' },
      { name: 'Svalbard and Jan Mayen', code: 'SJ' },
      { name: 'Swaziland', code: 'SZ' },
      { name: 'Sweden', code: 'SE' },
      { name: 'Switzerland', code: 'CH' },
      { name: 'Syrian Arab Republic', code: 'SY' },
      { name: 'Taiwan, Province of China', code: 'TW' },
      { name: 'Tajikistan', code: 'TJ' },
      { name: 'Tanzania, United Republic of', code: 'TZ' },
      { name: 'Thailand', code: 'TH' },
      { name: 'Timor-Leste', code: 'TL' },
      { name: 'Togo', code: 'TG' },
      { name: 'Tokelau', code: 'TK' },
      { name: 'Tonga', code: 'TO' },
      { name: 'Trinidad and Tobago', code: 'TT' },
      { name: 'Tunisia', code: 'TN' },
      { name: 'Turkey', code: 'TR' },
      { name: 'Turkmenistan', code: 'TM' },
      { name: 'Turks and Caicos Islands', code: 'TC' },
      { name: 'Tuvalu', code: 'TV' },
      { name: 'Uganda', code: 'UG' },
      { name: 'Ukraine', code: 'UA' },
      { name: 'United Arab Emirates', code: 'AE' },
      { name: 'United Kingdom', code: 'GB' },
      { name: 'United States', code: 'US' },
      { name: 'United States Minor Outlying Islands', code: 'UM' },
      { name: 'Uruguay', code: 'UY' },
      { name: 'Uzbekistan', code: 'UZ' },
      { name: 'Vanuatu', code: 'VU' },
      { name: 'Venezuela', code: 'VE' },
      { name: 'Viet Nam', code: 'VN' },
      { name: 'Virgin Islands, British', code: 'VG' },
      { name: 'Virgin Islands, U.S.', code: 'VI' },
      { name: 'Wallis and Futuna', code: 'WF' },
      { name: 'Western Sahara', code: 'EH' },
      { name: 'Yemen', code: 'YE' },
      { name: 'Zambia', code: 'ZM' },
      { name: 'Zimbabwe', code: 'ZW' },
    ];

    if ($('.book-modal .input.input-select').length) {
      $('.book-modal .input.input-select').append(`<option disabled selected value="">Select country</option>`);
      for (const country of countries) {
        $('.book-modal .input.input-select').append(`<option value="${country.name}">${country.name}</option>`);
      }
    }
  }
  initCountrySelect();
});

// webinar and event
$(function () {
  if (location.pathname.indexOf('events') === -1) {
    return;
  }
  const date = new Date($('.countdown-date').text()).getTime() / 1000;
  const today = new Date().getTime() / 1000;
  var seconds = Math.round(date - today);

  // countdown
  function timer() {
    var days = Math.floor(seconds / 24 / 60 / 60);
    var hoursLeft = Math.floor(seconds - days * 86400);
    var hours = Math.floor(hoursLeft / 3600);
    var minutesLeft = Math.floor(hoursLeft - hours * 3600);
    var minutes = Math.floor(minutesLeft / 60);
    var remainingSeconds = seconds % 60;
    function pad(n) {
      return n < 10 ? '0' + n : n;
    }
    const nums = document.querySelectorAll('.countdown__num div');
    nums[0].innerHTML = pad(days);
    nums[1].innerHTML = pad(hours);
    nums[2].innerHTML = pad(minutes);
    nums[3].innerHTML = pad(remainingSeconds);

    if (seconds == 0) {
      clearInterval(countdownTimer);
    } else {
      seconds--;
    }
  }
  if ($('.countdown__num').length && seconds > 0) {
    timer();
    var countdownTimer = setInterval(timer, 1000);
  }

  // slider
  $('.ew-slider-data .w-dyn-item').each(function () {
    const sliderTemplate = $('.slide.slide-orig').clone();
    const iSrc = $(this).find('.ew-slider-data__img').attr('src');
    sliderTemplate.find('.ew-slide__img img').attr('src', iSrc);
    const name = $(this).find('.ew-slider-data__name').text();
    sliderTemplate.find('.slider__h').text(name);
    const title = $(this).find('.ew-slider-data__title').text();
    sliderTemplate.find('.slider__sub').text(title);
    const about = $(this).find('.ew-slider-data__about').text();
    sliderTemplate.find('.slider__p').text(about);
    $('.mask').append(sliderTemplate.removeClass('slide-orig'));
  });
  $('.slide-orig').remove();
  Webflow.require('slider').redraw();
  if ($('.mask .slide').length === 1) {
    $('.slider__left-arrow, .slider__right-arrow, .slide-nav').hide();
  }

  //tabs
  let activeTab = 'upcoming';
  $('.ew-category__link').on('click', function () {
    $('.ew-category__link').removeClass('ew-category__link--active');
    $(this).addClass('ew-category__link--active');
    activeTab = $(this).text().toLowerCase();
    $('.reports__col').hide();
    $('.sidebar__ew').hide();
    $(`.reports__col-${activeTab}`).show();
    if (activeTab === 'past') {
      $('.sidebar__ew').show();
    }
  });

  if ($(`.reports__col-upcoming .report__card-wrap-ew`).length === 0 && $('.ew-category__link')[1]) {
    $('.ew-category__link')[1].click();
  }

  // years sidebar
  const years = [];
  $(`.reports__col-past .report__card-wrap-ew`).each(function () {
    $(this).hide();
    const year = $(this).find('.report__card-hidden-year').text();
    if (years.indexOf(year) === -1) {
      years.push(year);
      $('.sidebar__item').append(`
        <a href="#" class="year w-inline-block"><div>${year}</div></a>
      `);
    }
  });

  $('.year').on('click', function () {
    const yearLink = $(this);
    $('.year').removeClass('active');
    yearLink.addClass('active');
    $(`.reports__col-past .report__card-wrap-ew`).each(function () {
      const year = $(this).find('.report__card-hidden-year').text();
      $(this).hide();
      if (year === yearLink.text()) {
        $(this).show();
      }
    });
  });
  if ($('.sidebar__item a') && $('.sidebar__item a')[0]) {
    $('.sidebar__item a')[0].click();
  }

  // hero
  const pName = $('.ew-hero__cont-person .ew-hero__cont-person-name').text();
  $('.ew-hero__name-name').text(pName);

  const pTitle = $('.ew-hero__cont-person .ew-hero__cont-person-title').text();
  $('.ew-hero__name-position').text(pTitle);

  const pImg = $('.ew-hero__cont-person img').attr('src');
  $('.ew-hero__img-bg img').attr('src', pImg);

  // schedule
  const days = [];
  const dayTemplate = $('.sidebar__item-days').clone();
  $('.sidebar__item-days').remove();
  dayTemplate.find('.day').removeClass('active');
  let activeDay = '1';

  $('.schedule__record').each(function () {
    const day = $(this).find('.schedule__record-day-hidden').text().trim();
    if (day !== activeDay) {
      $(this).parent().hide();
    }
    if (days.indexOf(day) === -1) {
      const _day = dayTemplate.clone();
      _day
        .find('.day__text')
        .text('Day ' + day)
        .parent()
        .attr('data-day', day);
      $('.sidebar__ew-days').append(_day);
      days.push(day);
    }
  });

  $('.day').on('click', function () {
    $('.day').removeClass('active');
    $(this).addClass('active');
    activeDay = $(this).attr('data-day');
    if (activeDay !== '1') {
      $('.schedule__start-block').hide();
    } else {
      $('.schedule__start-block').css('display', 'flex');
    }
    $('.schedule__record').each(function () {
      const day = $(this).find('.schedule__record-day-hidden').text().trim();
      if (day === activeDay) {
        $(this).parent().show();
        $(this).addClass('rec-is-visible');
      } else {
        $(this).parent().hide();
      }
    });
    const last = $('.rec-is-visible').last();
    const isLast = days[days.length - 1] === activeDay;
    last
      .find('.schedule__end')
      .css('margin-bottom', 0)
      .prepend(`<h3 class="schedule__header">${isLast ? 'EVENT' : 'DAY ' + activeDay} ENDS</h3>`);
    last.find('.schedule__end div').last().remove();
  });

  $('.sidebar__item-days a').first().addClass('active').click();

  // form
  let pageId = '';
  try {
    pageId = location.pathname.split('/')[2];
  } catch (error) {}
  $('#registration-form').prepend(
    `<input id="form-id" type="hidden" name="${pageId}-${new Date($('.countdown-date').text()).getTime()}" />`
  );
  $('#registration-form').submit(function (e) {
    $('.ew-form-success__p--link').text($('#registration-form #email').val());
  });

  // event/webinar internal page
  if (location.pathname.indexOf('events/') > -1) {
    const eStart =
      new Date($('.countdown-date').text()).toISOString().replace(/-/gi, '').replace(/:/gi, '').slice(0, -5) + 'Z';
    const eEnd = $('.countdown-date-end').text()
      ? new Date($('.countdown-date-end').text()).toISOString().replace(/-/gi, '').replace(/:/gi, '').slice(0, -5) + 'Z'
      : '';
    const eTitle = $('.ew-hero__h').text();
    const eLocation = $('.ew-form__city').text();
    const eAbout = $('.ew-rich p').text();

    const calendar = `https://www.google.com/calendar/event?action=TEMPLATE&dates=${eStart}/${eEnd}&text=${eTitle}&location=${eLocation}&details=${eAbout}`;
    $('.add-to-cal').attr('href', calendar);

    // general conditions
    if ($('.ew-hero__col-img').css('display') === 'none') {
      $('.ew-hero-int__col').css('width', 'auto');
      $('.ew-hero-int__cont-wrap').css('max-width', 'none');
    }

    // social share
    $('.soc__item.twitter').on('click', () => {
      const url = window.location.href;
      const twitLink = `http://twitter.com/share?url=${url}&text=${eTitle}`;
      window.open(twitLink, 'twitter-share', 'width=580,height=296');
    });

    $('.soc__item.facebook').on('click', () => {
      const url = window.location.href;
      const fbLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      window.open(fbLink, 'facebook-share', 'width=580,height=296');
    });

    $('.soc__item.linkedin').on('click', () => {
      const url = window.location.href;
      const liLink = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${eTitle}&summary=${eAbout}&source=`;
      window.open(liLink, 'linkedin-share', 'width=580,height=296');
    });
  }
});

// port page
$(function () {
  if (!$('.portdata').length) {
    return;
  }

  (function () {
    function urlify(text) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      return text.replace(urlRegex, function (url) {
        return '<a target="_blank" class="d-port-info__text" href="' + url + '">' + url + '</a>';
      });
    }

    const site = $('.website').text();
    if (site) {
      $('.website').replaceWith(urlify(site));
    }
  })();

  // build image gallery
  const imagesData = $('.imagesdata').text();
  if (imagesData) {
    try {
      let images = JSON.parse(imagesData.replace(/'/g, '"'));
      if (images.length > 2) {
        $('.d-port-image:eq(1)').attr('src', images[1]);
        $('.d-port-image:eq(2)').attr('src', images[2]);
      }
      images = images.map((i) => ({ url: i, type: 'image' }));
      const allImages = {
        items: images,
      };
      $('.w-json').text(JSON.stringify(allImages));
      Webflow.require('lightbox').ready();
    } catch (error) {
      console.log('error', error);
    }
  }

  // build port data-tables
  const portData = $('.portdata').text();
  if (portData) {
    try {
      let data = JSON.parse(portData);

      function generateCols(table, tableData) {
        for (let line of tableData) {
          for (let cont of line.data) {
            for (let col of cont.data) {
              table.append(`
              <div class="d-table__row">
                <div class="d-table__cell d-table__cell--sm d-table__cell--grey">${line.title}</div>
                <div class="d-table__cell">${cont.title}</div>
                <div class="d-table__cell">${cont.freeDays}</div>
                <div class="d-table__cell">${col.title}</div>
                <div class="d-table__cell">${col.data}</div>
              </div>
              `);
            }
          }
        }
      }

      if (data.detention) {
        if (data.detention.import) {
          generateCols($('.free-days-import .detention-tab .d-table'), data.detention.import);
        }
        if (data.detention.export) {
          generateCols($('.free-days-export .detention-tab .d-table'), data.detention.export);
        }
      }
      if (data.demurrage) {
        if (data.demurrage.import) {
          generateCols($('.free-days-import .demurrage-tab .d-table'), data.demurrage.import);
        }
        if (data.demurrage.export) {
          generateCols($('.free-days-export .demurrage-tab .d-table'), data.demurrage.export);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  // port sidebar
  (function () {
    function id(text) {
      return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    }

    $('.d-port__sidebar__item-wrap').remove();

    $('.d-port__section')
      .not('.w-condition-invisible')
      .find('.d-port-section__h')
      .each((h2i, h2el) => {
        const h2id = id($(h2el).text().trim());
        $(h2el).after(`<div id="${h2id}" style="visibility:hidden; position: relative; top: -170px"></div>`);
        $('.d-port__sidebar').append(`
        <div class="d-port__sidebar__item-wrap">
          <a class="d-port__sidebar__item w-inline-block" href="#${h2id}">
            ${$(h2el).text()}
          </a>
        </div>
      `);
      });

    $('.d-port__sidebar').show();

    if (window.location.hash) {
      $(`a[href="${window.location.hash}"]`).addClass('active');
      $([document.documentElement, document.body]).animate({ scrollTop: $(window.location.hash).offset().top }, 1000);
    } else {
      $('.d-port__sidebar__item').first().addClass('active');
    }

    $('.d-port__sidebar__item').on('click', (e) => {
      $('.d-port__sidebar__item').removeClass('active');
      $(e.target).addClass('active');
    });
  })();
});
