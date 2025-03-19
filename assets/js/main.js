/*
	Twenty by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
	breakpoints({
		wide: ['1281px', '1680px'],
		normal: ['981px', '1280px'],
		narrow: ['841px', '980px'],
		narrower: ['737px', '840px'],
		mobile: [null, '736px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Scrolly.
	$('.scrolly').scrolly({
		speed: 1000,
		offset: function () { return $header.height() + 10; }
	});

	// Dropdowns.
	$('#nav > ul').dropotron({
		mode: 'fade',
		noOpenerFade: true,
		expandMode: (browser.mobile ? 'click' : 'hover')
	});

	// Nav Panel.

	// Button.
	$(
		'<div id="navButton">' +
		'<a href="#navPanel" class="toggle"></a>' +
		'</div>'
	)
		.appendTo($body);

	// Panel.
	$('<div id="tempNav" style="display:none;"><ul>' +
		$('.side-menu ul').html() +
		'</ul></div>').appendTo($body);

	$(
		'<div id="navPanel">' +
		'<nav>' +
		$('#tempNav').navList() +
		'</nav>' +
		'</div>'
	)
		.appendTo($body)
		.panel({
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'left',
			target: $body,
			visibleClass: 'navPanel-visible'
		});

	// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
	if (browser.os == 'wp' && browser.osVersion < 10)
		$('#navButton, #navPanel, #page-wrapper')
			.css('transition', 'none');

	// Header.
	if (!browser.mobile
		&& $header.hasClass('alt')
		&& $banner.length > 0) {

		$window.on('load', function () {

			$banner.scrollex({
				bottom: $header.outerHeight(),
				terminate: function () { $header.removeClass('alt'); },
				enter: function () { $header.addClass('alt reveal'); },
				leave: function () { $header.removeClass('alt'); }
			});

		});

	}

})(jQuery);

const handleHover = (e) => {
	const element = e.currentTarget; // Mejor referencia que e.target
	const rect = element.getBoundingClientRect();
	const x = (e.clientX - rect.left) / rect.width - 0.5;
	const y = (e.clientY - rect.top) / rect.height - 0.5;

	element.style.transform = `
        perspective(1000px)
        rotateX(${y * 50}deg)
        rotateY(${x * 50}deg)
    `;
};
if (!browser.mobile) {
	document.querySelectorAll('.inner').forEach(inner => {
		inner.addEventListener('mousemove', handleHover);
		inner.addEventListener('mouseleave', () => {
			inner.style.transform = 'none';
		});
	});
}
