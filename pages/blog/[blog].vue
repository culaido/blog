<script setup lang="ts">;
    import type { BlogPost } from '@/types/blog';

    const { path } = useRoute()
    console.log('------------');
    console.log(path);

    const { data: articles, error } = await useAsyncData(`blog-post-${path}`, () => queryContent('/blog/2024-09-30').findOne())
    
    console.log(articles);
/*
    if (error.value)
        navigateTo('/404')
*/

    const data = computed<BlogPost>(() => {
      return {
        title: articles.value.title,
        description: articles.value.description,
        date: articles.value.date,
        tags: articles.value.tags,
      }
    })
/*
    useHead({
      title: data.value.title || '',
      meta: [
        { name: 'description', content: data.value.description },
        {
          name: 'description',
          content: data.value.description,
        },
      ]
    })
*/
</script>

<template>
  <div class="px-6 container max-w-5xl mx-auto sm:grid grid-cols-12 gap-x-12">
    <div class="col-span-12 lg:col-span-9">
      <BlogHeader :title="data.title" :date="data.date" :description="data.description" :tags="data.tags"/>
      <div class="prose prose-pre:max-w-xs sm:prose-pre:max-w-full prose-sm sm:prose-base md:prose-lg prose-h1:no-underline max-w-5xl mx-auto prose-zinc dark:prose-invert prose-img:rounded-lg">
        <ContentRenderer v-if="articles" :value="articles">
          <template #empty>
            <p>No content found.</p>
          </template>
        </ContentRenderer>
      </div>
    </div>
  </div>
</template>
