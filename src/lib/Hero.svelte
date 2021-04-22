<script lang="ts">
    export let title
</script>

<div class="hero">
    <h1 class="title">
        <img src="/white_circle.png" alt="Logo" class="icon">
        {title}
    </h1>
</div>

<style>
    .hero {
        padding: 24px;
        background-color: var(--primary-color);
    }

    .title {
        color: var(--secondary-color);
    }

    .icon {
        width: 32px;
        margin-right: 10px;
    }
</style>
