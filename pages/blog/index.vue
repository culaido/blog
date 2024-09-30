<script lang="ts" setup>
    const data = await queryContent('blog').find();

    useHead({
        title: 'Blog'
    });

    const elementPerPage = ref(5);
    const pageNumber = ref(1);
    const searchTest = ref('');

    const formattedData = computed(() => {
    
        return data.map((v) => {
            return {
                path    : v._path,
                title   : v.title,
                description: v.description,
                date    : v.date,
                tags    : v.tags
            }
        });
    })

    const searchData = computed(() => {
        return formattedData.value;
    })
    
    const paginatedData = computed(() => {
        return searchData.value.filter((data, idx) => {
            const startInd = ((pageNumber.value - 1) * elementPerPage.value)
            const endInd = (pageNumber.value * elementPerPage.value) - 1

            return (idx >= startInd && idx <= endInd) ? true : false;
        }) || []
    });

    function onPreviousPageClick() {
        if (pageNumber.value > 1) pageNumber.value -= 1;
    }

    const totalPage = computed(() => {
        const ttlContent = searchData.value.length || 0;
        const totalPage = Math.ceil(ttlContent / elementPerPage.value);
        return totalPage;
    })

    function onNextPageClick() {
        if (pageNumber.value < totalPage.value)
            pageNumber.value += 1;
    }

</script>

<template>
    <main class="container max-w-5xl mx-auto text-zinc-600">
        <ArchiveHero />

        <ClientOnly>
            <div v-auto-animate class="space-y-5 my-5 px-4">
                <template v-for="post in paginatedData" :key="post.title">
                    <ArchiveCard :path="post.path" :title="post.title" :date="post.date" :description="post.description" :tags="post.tags" />
                </template>

                <ArchiveCard v-if="paginatedData.length <= 0" title="No Post Found" image="/not-found.jpg" />
            </div>

            <template #fallback>
                <BlogLoader />
            </template>
        </ClientOnly>

        <div class="flex justify-center items-center space-x-6 ">
            <button :disabled="pageNumber <= 1" @click="onPreviousPageClick">
                <Icon name="mdi:code-less-than" size="30" :class="{ 'text-sky-700 dark:text-sky-400': pageNumber > 1 }" />
            </button>
            <p>{{ pageNumber }} / {{ totalPage }}</p>
            <button :disabled="pageNumber >= totalPage" @click="onNextPageClick">
                <Icon name="mdi:code-greater-than" size="30" :class="{ 'text-sky-700 dark:text-sky-400': pageNumber < totalPage }" />
            </button>
        </div>
    </main>
</template>
