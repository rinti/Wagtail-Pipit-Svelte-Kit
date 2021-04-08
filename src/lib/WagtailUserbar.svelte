<script lang="ts">
	import { onMount } from 'svelte';
	export let html;

	onMount(() => {
        let userbar = document.querySelector('[data-wagtail-userbar]');
        let trigger = userbar.querySelector('[data-wagtail-userbar-trigger]');
        let list = userbar.querySelector('.wagtail-userbar-items');
        let className = 'is-active';
        let hasTouch = 'ontouchstart' in window;
        let clickEvent = 'click';

		if (hasTouch) {
			userbar.classList.add('touch');

			// Bind to touchend event, preventDefault to prevent DELAY and CLICK
			// in accordance with: https://hacks.mozilla.org/2013/04/detecting-touch-its-the-why-not-the-how/
			trigger.addEventListener('touchend', function preventSimulatedClick(e) {
				e.preventDefault();
				toggleUserbar(e);
			});
		} else {
			userbar.classList.add('no-touch');
		}

		trigger.addEventListener(clickEvent, toggleUserbar, false);

		// make sure userbar is hidden when navigating back
		window.addEventListener('pageshow', hideUserbar, false);

		function showUserbar(e) {
			userbar.classList.add(className);
			list.addEventListener(clickEvent, sandboxClick, false);
			window.addEventListener(clickEvent, clickOutside, false);
		}

		function hideUserbar(e) {
			userbar.classList.remove(className);
			list.addEventListener(clickEvent, sandboxClick, false);
			window.removeEventListener(clickEvent, clickOutside, false);
		}

		function toggleUserbar(e) {
			e.stopPropagation();
			if (userbar.classList.contains(className)) {
				hideUserbar();
			} else {
				showUserbar();
			}
		}

		function sandboxClick(e) {
			e.stopPropagation();
		}

		function clickOutside(e) {
			hideUserbar();
		}
	});
</script>

<div>{@html html}</div>
