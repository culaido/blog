<script setup lang="ts">
    import { navbarData } from '../../data';

    const colorMode = useColorMode();
    function onClick(val: string) {
        colorMode.preference = val;
    }
</script>

<template>
    <div class="py-3 border-b dark:border-gray-800 font-semibold">
        <div class="flex px-6 container max-w-5xl justify-between mx-auto items-baseline">
            <ul class="flex items-baseline">
                <li class="text-base sm:text-2xl font-bold">
                    <NuxtLink to="/">{{ navbarData.homeTitle }}</NuxtLink>
                </li>
            </ul>
            <ul class="flex items-center space-x-3 sm:space-x-6 text-sm sm:text-lg">
                <li>
                    <NuxtLink to="/blog">Blog</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/category">Categories</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/about">About Me</NuxtLink>
                </li>
                <li>
                    <ClientOnly>
                        <button v-if="colorMode.value === 'light'" name="light-mode" class="hover:scale-110 transition-all ease-out hover:cursor-pointer" @click="onClick('dark')">
                            <Icon name="icon-park:moon" size="20" />
                        </button>
                        <button v-if="colorMode.value === 'dark'" name="dark-mode" class="hover:scale-110 transition-all ease-out hover:cursor-pointer" @click="onClick('light')">
                            <Icon name="noto:sun" size="20" />
                        </button>
                        <template #fallback>
                            <Icon name="svg-spinners:180-ring" size="20" />
                        </template>
                    </ClientOnly>
                </li>
            </ul>
        </div>
    </div>
</template>

<style>
    .router-link-active .router-link-exact-active  {
        @apply underline
    }
</style>
