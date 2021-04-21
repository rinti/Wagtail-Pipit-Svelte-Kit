<nav>
	<a href="/">Home</a>
</nav>

<main>
    <slot />
</main>

<style>
nav {
    background-color: var(--primary-color)
}
a {
    color: var(--tertiary-color)
}
main {
    background-color: var(--secondary-color)
}
</style>
