<script setup>
import GenderSideBar from "components/organisms/gender/sidebar.vue";
import GenderHeader from "components/organisms/gender/header.vue";

const menuItems = [
  {
    label: "What is New",
    path: "women-new",
  },
  {
    label: "Bestsellers",
    path: "women-best-sellers",
  },
  {
    label: "Pants",
    path: "women-pants",
  },
  {
    label: "Hoodies",
    path: "women-hoodies",
  },
  {
    label: "Jackets",
    path: "women-jackets",
  },
  {
    label: "Matching Sets",
    path: "women-matching-sets",
  },
  {
    label: "Accessories",
    path: "women-accessories",
  },
];
useHead({
  title: "Women's | Lalalemon",
});
</script>

<template>
  <div class="md:container md:w-8xl mx-auto">
    <div class="flex flex-col md:flex-row gap-2 items-start">
      <div class="md:p-8">
        <GenderSideBar header="lalalemon women's" :menu-items="menuItems" />
      </div>
      <GenderHeader
        image-path="/5.webp"
        image-alt-description=""
        upper-button-label="Shop whats's new"
        upper-button-path="women-new"
        lower-button-label="Shop winter whites for her"
        lower-button-path="women-new"
        footer-description="Blanket them in the crisp warmth of the new Winter Whites Collection."
      />
    </div>
    <div class="py-20">
      <UContainer class="flex flex-col md:grid grid-cols-2 gap-4">
        <OrganismsHeroCard
          image-path="/2.webp"
          title="Warmth that won't weigh you down."
          description="Switch up your look easily this festive season in our water-repellent vests made for versatile layering."
          button-route-path="/women/jackets"
          button-text="SHOP JACKETS"
        />
        <OrganismsHeroCard
          image-path="/3.webp"
          title="Easy does it."
          description="The Softstreme™ Collection—stretchy, peach-fuzz soft, and comfortable all the ways you'll wear it.."
          button-route-path="/women/accessories"
          button-text="SHOP ACCESSORIES"
        />
        <OrganismsHeroCard
          image-path="/4.webp"
          title="Take comfort up a notch."
          description="Softly textured tops so comfortable you’ll want to layer, style, and wear on repeat through the holidays."
          button-route-path="/women/tops"
          button-text="SHOP TOPS"
        />
        <OrganismsHeroCard
          image-path="/1.webp"
          title="Expand your comfort zone."
          description="Ultra soft. Breezy silhouette. In these wide-leg pants, you can take that feeling of ease even further.."
          button-route-path="/women/pants"
          button-text="SHOP PANTS"
        />
      </UContainer>
    </div>
  </div>
</template>
